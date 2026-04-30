import { isSyncedStorageKey } from "./syncedStorageKeys";

export function readStorage(key, fallback) {
  try {
    const rawValue = localStorage.getItem(key);

    if (!rawValue) {
      return fallback;
    }

    const parsedValue = JSON.parse(rawValue);

    if (parsedValue === null || parsedValue === undefined) {
      return fallback;
    }

    return parsedValue;
  } catch {
    return fallback;
  }
}

/**
 * @param {string} key
 * @param {unknown} value
 * @param {{ silent?: boolean }} [opts] — `silent`: ne déclenche pas la synchro cloud (writes internes pendant la fusion Supabase).
 */
export function writeStorage(key, value, opts = {}) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    if (
      !opts.silent &&
      typeof window !== "undefined" &&
      isSyncedStorageKey(key)
    ) {
      window.dispatchEvent(
        new CustomEvent("bemybaby-storage-write", { detail: { key } })
      );
    }
    return true;
  } catch {
    return false;
  }
}

export function removeStorage(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}
