import { getSupabase } from "../lib/supabase";
import { readStorage, writeStorage } from "../utils/storage";
import { SYNCED_STORAGE_KEYS } from "../utils/syncedStorageKeys";

/** @returns {Record<string, unknown>} */
function collectPayload() {
  /** @type {Record<string, unknown>} */
  const out = {};
  for (const k of SYNCED_STORAGE_KEYS) {
    const v = readStorage(k, undefined);
    if (v !== undefined) {
      out[k] = v;
    }
  }
  return out;
}

/**
 * Nouvelles données locales écrasant le remote pour les clés présentes deux côtés
 * (l’utilisateur qui vient d’éditer sur cet appareil gagne).
 * @param {Record<string, unknown>} remotePayload
 * @param {Record<string, unknown>} localPayload
 */
function mergeRemoteThenLocal(remotePayload, localPayload) {
  const remote =
    remotePayload && typeof remotePayload === "object" ? remotePayload : {};
  return { ...remote, ...localPayload };
}

/**
 * @param {import("@supabase/supabase-js").SupabaseClient} supabase
 * @param {string} userId
 * @param {Record<string, unknown>} payload
 */
async function upsertPayload(supabase, userId, payload) {
  const { error } = await supabase.from("user_app_state").upsert(
    {
      user_id: userId,
      payload,
    },
    { onConflict: "user_id" }
  );
  if (error) {
    throw error;
  }
}

/** Au démarrage : session anonyme si besoin, fusion cloud / local puis sauvegarde. */
export async function bootstrapSupabase() {
  const supabase = getSupabase();
  if (!supabase) {
    return;
  }

  const { data: sessionData } = await supabase.auth.getSession();
  let user = sessionData?.session?.user ?? null;

  if (!user) {
    const { data: anonData, error: anonErr } =
      await supabase.auth.signInAnonymously();
    if (anonErr) {
      throw anonErr;
    }
    user = anonData.user;
  }

  if (!user) {
    return;
  }

  const { data: row, error: fetchErr } = await supabase
    .from("user_app_state")
    .select("payload")
    .eq("user_id", user.id)
    .maybeSingle();

  if (fetchErr) {
    throw fetchErr;
  }

  const remote =
    row?.payload &&
    typeof row.payload === "object" &&
    !Array.isArray(row.payload)
      ? row.payload
      : {};

  const local = collectPayload();
  const merged = mergeRemoteThenLocal(remote, local);

  for (const key of SYNCED_STORAGE_KEYS) {
    if (!(key in merged)) {
      continue;
    }
    writeStorage(key, merged[key], { silent: true });
  }

  await upsertPayload(supabase, user.id, merged);
}

let flushTimer;

export function scheduleSupabasePushAfterLocalWrite() {
  clearTimeout(flushTimer);
  flushTimer = setTimeout(async () => {
    const supabase = getSupabase();
    if (!supabase) {
      return;
    }
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      if (!userId) {
        return;
      }
      await upsertPayload(supabase, userId, collectPayload());
    } catch {
      //
    }
  }, 1200);
}
