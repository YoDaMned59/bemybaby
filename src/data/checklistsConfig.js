import { babyChecklist } from "./babyChecklist";
import { maternityBagChecklist } from "./maternityBagChecklist";
import { adminChecklist } from "./adminChecklist";

export const CHECKLISTS = {
  baby: {
    id: "baby",
    title: "Liste bébé",
    description: "Les essentiels pour accueillir bébé.",
    storageKey: "babyChecklist",
    data: babyChecklist,
  },
  "maternity-bag": {
    id: "maternity-bag",
    title: "Valise maternité",
    description: "Tout préparer pour le séjour à la maternité.",
    storageKey: "maternityBagChecklist",
    data: maternityBagChecklist,
  },
  admin: {
    id: "admin",
    title: "Démarches administratives",
    description: "Les étapes importantes à ne pas oublier.",
    storageKey: "adminChecklist",
    data: adminChecklist,
  },
};

export const CHECKLIST_IDS = Object.keys(CHECKLISTS);

export function getChecklistById(listId) {
  return CHECKLISTS[listId] ?? null;
}
