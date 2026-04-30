import { useEffect } from "react";
import { isSupabaseConfigured } from "../lib/supabase";
import { scheduleSupabasePushAfterLocalWrite } from "../services/supabasePersist";
import { isSyncedStorageKey } from "../utils/syncedStorageKeys";

/** Écoute les écritures locale et pousse debounce vers Supabase. */
export default function SupabaseStorageSyncListen() {
  useEffect(() => {
    if (!isSupabaseConfigured()) {
      return undefined;
    }
    /** @param {Event} ev */
    function onWrite(ev) {
      const e = /** @type {CustomEvent<{ key?: string }>} */ (ev);
      const key = e.detail?.key;
      if (typeof key !== "string" || !isSyncedStorageKey(key)) {
        return;
      }
      scheduleSupabasePushAfterLocalWrite();
    }
    window.addEventListener("bemybaby-storage-write", onWrite);
    return () => window.removeEventListener("bemybaby-storage-write", onWrite);
  }, []);
  return null;
}
