import { readStorage } from "../utils/storage";
import { CHECKLIST_IDS, CHECKLISTS } from "../data/checklistsConfig";
import {
  getChecklistProgressPercent,
  getSafeChecklistItems,
} from "../utils/checklistProgress";

export function useProgress() {
  const allItems = [];

  const byId = Object.fromEntries(
    CHECKLIST_IDS.map((id) => {
      const items = getSafeChecklistItems(
        readStorage(CHECKLISTS[id].storageKey, [])
      );
      allItems.push(...items);
      return [id, getChecklistProgressPercent(items)];
    })
  );

  return {
    progressById: byId,
    babyProgress: byId.baby,
    maternityBagProgress: byId["maternity-bag"],
    adminProgress: byId.admin,
    overallProgress: getChecklistProgressPercent(allItems),
  };
}
