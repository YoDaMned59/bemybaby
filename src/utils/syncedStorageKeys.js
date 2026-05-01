import { CHECKLIST_IDS, CHECKLISTS } from "../data/checklistsConfig";

/** À garder identique à `RDV_STORAGE_KEY` dans `appointmentsModel.js`. */
const RDV_CLOUD_KEY = "beMyBabyRdvV1";

export const PROFILE_STORAGE_KEY = "profile";

/** Aligné avec `useCompletedTasks` */
export const COMPLETED_PREGNANCY_TASKS_KEY = "completedPregnancyTasks";

/** Identifiant du dernier compte dont l’état cloud a été fusionné avec le local (évite de mélanger deux comptes sur le même navigateur). */
export const BEMYBABY_LAST_CLOUD_USER_ID_KEY = "bemybabyLastCloudUserId";

/** Toutes les clés métier envoyées dans Supabase (le reste reste uniquement locale). */
export const SYNCED_STORAGE_KEYS = Object.freeze([
  PROFILE_STORAGE_KEY,
  RDV_CLOUD_KEY,
  COMPLETED_PREGNANCY_TASKS_KEY,
  ...CHECKLIST_IDS.map((id) => CHECKLISTS[id].storageKey),
]);

const syncedSet = new Set(SYNCED_STORAGE_KEYS);

/** @param {string} key */
export function isSyncedStorageKey(key) {
  return syncedSet.has(key);
}
