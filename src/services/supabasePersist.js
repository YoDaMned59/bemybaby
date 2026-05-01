import { getSupabase } from "../lib/supabase";
import { userHasRegisteredEmail } from "../utils/authIdentity";
import {
  allowsAnonymousBrowsing,
  requiresEmailAuthGate,
} from "../utils/supabaseEnv";
import { readStorage, writeStorage, removeStorage } from "../utils/storage";
import {
  BEMYBABY_LAST_CLOUD_USER_ID_KEY,
  SYNCED_STORAGE_KEYS,
} from "../utils/syncedStorageKeys";

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

/** Efface l’état app synchronisé (local + marqueur de compte) avant déconnexion ou après inscription. */
export function clearLocalSyncedAppState() {
  for (const k of SYNCED_STORAGE_KEYS) {
    removeStorage(k);
  }
  try {
    localStorage.removeItem(BEMYBABY_LAST_CLOUD_USER_ID_KEY);
  } catch {
    //
  }
}

function readLastCloudUserId() {
  try {
    return localStorage.getItem(BEMYBABY_LAST_CLOUD_USER_ID_KEY);
  } catch {
    return null;
  }
}

function writeLastCloudUserId(userId) {
  try {
    localStorage.setItem(BEMYBABY_LAST_CLOUD_USER_ID_KEY, userId);
  } catch {
    //
  }
}

/**
 * Déconnexion : purge des données « par compte » en local puis signOut Supabase.
 */
export async function signOutBeMyBaby() {
  clearLocalSyncedAppState();
  const supabase = getSupabase();
  if (supabase) {
    await supabase.auth.signOut();
  }
}

/**
 * Supprime le compte Supabase courant (ligne `user_app_state` en cascade) puis efface l’état local.
 * Requiert la fonction SQL `public.delete_own_account` (voir migrations Supabase).
 */
export async function deleteOwnAccount() {
  const supabase = getSupabase();
  if (!supabase) {
    throw new Error("Supabase non configuré.");
  }
  const { error } = await supabase.rpc("delete_own_account", {});
  if (error) {
    throw error;
  }
  clearLocalSyncedAppState();
  try {
    await supabase.auth.signOut();
  } catch {
    // La session peut déjà être invalide après suppression auth.
  }
}

function wipeSyncedKeysLocalOnly() {
  for (const k of SYNCED_STORAGE_KEYS) {
    removeStorage(k);
  }
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
    clearLocalSyncedAppState();
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

  const prevCloudUserId = readLastCloudUserId();
  const local = collectPayload();
  const userSwitched =
    Boolean(prevCloudUserId) && prevCloudUserId !== user.id;
  const noCloudRowYet = row == null && !fetchErr;
  const localSyncedNonempty = Object.keys(local).length > 0;
  const orphanLocalOnNewAccount =
    requiresEmailAuthGate() &&
    noCloudRowYet &&
    localSyncedNonempty;

  let merged;
  if (userSwitched || orphanLocalOnNewAccount) {
    wipeSyncedKeysLocalOnly();
    merged = { ...remote };
  } else {
    merged = mergeRemoteThenLocal(remote, local);
  }

  for (const key of SYNCED_STORAGE_KEYS) {
    if (!(key in merged)) {
      continue;
    }
    writeStorage(key, merged[key], { silent: true });
  }

  await upsertPayload(supabase, user.id, merged);
  writeLastCloudUserId(user.id);
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
