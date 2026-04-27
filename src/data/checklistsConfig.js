import { babyChecklist } from "./babyChecklist";
import { maternityBagChecklist } from "./maternityBagChecklist";
import { adminChecklist } from "./adminChecklist";
import { prenomsFilleChecklist } from "./prenomsFilleChecklist";
import { prenomsGarconChecklist } from "./prenomsGarconChecklist";
import { prenomsMixteChecklist } from "./prenomsMixteChecklist";

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
  "prenoms-fille": {
    id: "prenoms-fille",
    title: "Idées de prénoms fille",
    description: "Repères classiques : coche ceux que tu aimes pour t’aider à choisir.",
    storageKey: "prenomsFilleChecklist",
    data: prenomsFilleChecklist,
  },
  "prenoms-garcon": {
    id: "prenoms-garcon",
    title: "Idées de prénoms garçon",
    description: "Repères classiques : coche ceux que tu aimes pour t’aider à choisir.",
    storageKey: "prenomsGarconChecklist",
    data: prenomsGarconChecklist,
  },
  "prenoms-mixte": {
    id: "prenoms-mixte",
    title: "Fille & garçon côte à côte",
    description:
      "Dix prénoms côté fille et dix côté garçon pour comparer rapidement (repères, à titre indicatif).",
    storageKey: "prenomsMixteChecklist",
    data: prenomsMixteChecklist,
  },
};

export const CHECKLIST_IDS = Object.keys(CHECKLISTS);

export function getChecklistById(listId) {
  return CHECKLISTS[listId] ?? null;
}
