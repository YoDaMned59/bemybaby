import { getSupabase } from "../lib/supabase";
import { userHasRegisteredEmail } from "../utils/authIdentity";
import { allowsAnonymousBrowsing } from "../utils/supabaseEnv";
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

/** Anonymous désactivé côté Supabase → pas d’erreur envoyée à AppRoot. */
function isAnonymousSignInDisabledError(error) {
  const msg = String(error?.message ?? "").toLowerCase();
  return (
    msg.includes("anonymous sign-ins are disabled") ||
    msg.includes("anonymous sign-in disabled") ||
    (msg.includes("anonymous") && msg.includes("disabled"))
  );
}

/**
 * Au démarrage : fusion cloud / local puis sauvegarde.
 * Session anonyme seulement si `VITE_ALLOW_ANONYMOUS_BROWSING=true`.
 */
export async function bootstrapSupabase() {
  const supabase = getSupabase();
  if (!supabase) {
    return;
  }

  const allowAnon = allowsAnonymousBrowsing();

  const { data: sessionData } = await supabase.auth.getSession();
  let user = sessionData?.session?.user ?? null;

  if (!user) {
    if (!allowAnon) {
      return;
    }
    const { data: anonData, error: anonErr } =
      await supabase.auth.signInAnonymously();
    if (anonErr) {
      if (isAnonymousSignInDisabledError(anonErr)) {
        if (import.meta.env.DEV) {
          console.info(
            "[BeMyBaby] Provider Anonymous désactivé dans Supabase. Retire VITE_ALLOW_ANONYMOUS_BROWSING en prod ou active Authentication → Anonymous."
          );
        }
        return;
      }
      throw anonErr;
    }
    user = anonData?.user ?? null;
  }

  if (!user) {
    return;
  }

  if (!allowAnon && !userHasRegisteredEmail(user)) {
    await supabase.auth.signOut();
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
      const user = session?.user ?? null;
      if (!allowsAnonymousBrowsing() && !userHasRegisteredEmail(user)) {
        return;
      }
      const userId = user?.id;
      if (!userId) {
        return;
      }
      await upsertPayload(supabase, userId, collectPayload());
    } catch {
      //
    }
  }, 1200);
}
