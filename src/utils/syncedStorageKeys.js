import { CHECKLIST_IDS, CHECKLISTS } from "../data/checklistsConfig";

/** À garder identique à `RDV_STORAGE_KEY` dans `appointmentsModel.js`. */
const RDV_CLOUD_KEY = "beMyBabyRdvV1";

export const PROFILE_STORAGE_KEY = "profile";

/** Aligné avec `useCompletedTasks` */
export const COMPLETED_PREGNANCY_TASKS_KEY = "completedPregnancyTasks";

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
