/**
 * Repères de rendez-vous alignés sur les calendres publics français
 * (à confirmer avec le carnet de santé, la PMI, le médecin ou le pédiatre).
 *
 * Sources :
 * - Calendrier des vaccinations (Ministère de la Santé) :
 *   https://sante.gouv.fr/prevention-en-sante/preserver-sa-sante/vaccination/calendrier-vaccinal
 * - Examens de suivi 3 – 18 mois (7 examens) — ameli :
 *   https://www.ameli.fr/assure/sante/themes/suivi-medical-de-l-enfant-et-de-l-adolescent/suivi-medical-du-nourrisson-entre-3-mois-et-18-mois
 * - Certificats de santé de l’enfant (8 j. / 9e / 24e mois) — Ministère de la Santé :
 *   https://sante.gouv.fr/prevention-en-sante/sante-des-populations/enfants/article/les-certificats-de-sante-de-l-enfant
 */
export const RDV_OFFICIAL_SOURCES = [
  {
    label: "Ministère de la Santé — calendrier vaccinal",
    url: "https://sante.gouv.fr/prevention-en-sante/preserver-sa-sante/vaccination/calendrier-vaccinal",
  },
  {
    label: "Ameli — suivi du nourrisson 3 – 18 mois",
    url: "https://www.ameli.fr/assure/sante/themes/suivi-medical-de-l-enfant-et-de-l-adolescent/suivi-medical-du-nourrisson-entre-3-mois-et-18-mois",
  },
  {
    label: "Ministère de la Santé — certificats de santé de l’enfant",
    url: "https://sante.gouv.fr/prevention-en-sante/sante-des-populations/enfants/article/les-certificats-de-sante-de-l-enfant",
  },
  {
    label: "Vaccination Info Service (questions vaccins, grand public)",
    url: "https://vaccination-info-service.fr/",
  },
];

/**
 * Rappels types : âges = repères indiqués sur le calendrier vaccinal et les textes
 * institutionnels (à noter en fonction des dates reçues sur ton carnet).
 */
export const APPOINTMENT_TEMPLATES = [
  {
    id: "tmpl-cse-8j",
    title: "1er certificat de santé (dans les 8 premiers jours de vie)",
    category: "Certificats de santé",
    hint: "Échéance légale — voir sante.gouv (certificats de santé de l’enfant).",
  },
  {
    id: "tmpl-ex-3m",
    title: "Examen de suivi à 3 mois (1 des 7 examens 3 – 18 mois)",
    category: "Suivi médical — nourrisson",
    hint: "Ameli : 7 examens entre 3 et 18 mois, pris en charge à 100 % selon le parcours de soins.",
  },
  {
    id: "tmpl-ex-4m",
    title: "Examen de suivi à 4 mois",
    category: "Suivi médical — nourrisson",
    hint: "Même dispositif des 7 examens (pédiatre, médecin traitant, PMI, etc.).",
  },
  {
    id: "tmpl-ex-5m",
    title: "Examen de suivi à 5 mois",
    category: "Suivi médical — nourrisson",
    hint: "Même dispositif des 7 examens (ameli, suivi du nourrisson 3 – 18 mois).",
  },
  {
    id: "tmpl-ex-8m",
    title: "Examen de suivi vers 8 mois (2e certificat de santé, mois 9e)",
    category: "Certificats de santé",
    hint: "2e CSE : au cours du 9e mois de vie (arrêté, Ministère de la Santé).",
  },
  {
    id: "tmpl-ex-11-12m",
    title: "Examens de suivi à 11 et 12 mois",
    category: "Suivi médical — nourrisson",
    hint: "Fait partie des 7 examens entre 3 et 18 mois (fréquences exactes sur ton courrier d’appel / carnet).",
  },
  {
    id: "tmpl-ex-16-18m",
    title: "Examen de suivi entre 16 et 18 mois",
    category: "Suivi médical — nourrisson",
    hint: "7e examen du dispositif 3 – 18 mois (source ameli).",
  },
  {
    id: "tmpl-cse-24m",
    title: "3e certificat de santé (autour de 2 ans, 24e mois)",
    category: "Certificats de santé",
    hint: "3e CSE : au cours du 24e mois (ministère de la Santé).",
  },
  {
    id: "tmpl-v-2m",
    title: "Vaccination — rendez-vous vers 2 mois (1re injection du calendrier)",
    category: "Vaccinations (calendrier national)",
    hint: "Entrée dans le calendrier (multivalent enfant, pneumocoque, etc.) — sante.gouv, carte « calendrier vaccinal ».",
  },
  {
    id: "tmpl-v-4m",
    title: "Vaccination — rendez-vous vers 4 mois (2e injection)",
    category: "Vaccinations (calendrier national)",
    hint: "Poursuite du calendrier : voir le PDF / carte postale sur le site du Ministère de la Santé.",
  },
  {
    id: "tmpl-menB-3-5m",
    title: "Méningocoque B — doses vers 3 et 5 mois (selon calendrier en vigueur)",
    category: "Vaccinations (calendrier national)",
    hint: "Inclus au calendrier vaccinal (schéma en plusieurs doses) — sante.gouv.",
  },
  {
    id: "tmpl-v-6m",
    title: "Méningocoque ACWY — 1re dose (vers 6 mois, selon calendrier en vigueur)",
    category: "Vaccinations (calendrier national)",
    hint: "Calendrier vaccinal officiel (mise à jour sur sante.gouv).",
  },
  {
    id: "tmpl-v-11-12m",
    title: "Rappel vaccinal vers 11 – 12 mois (DTP, coqueluche, etc.) + ROR / méningocoques (selon calendrier)",
    category: "Vaccinations (calendrier national)",
    hint: "Regrouper sur ton carnet les dates proposées par le professionnel de santé.",
  },
  {
    id: "tmpl-rot-2m",
    title: "Rotavirus (recommandé) — 1re dose dès 2 mois, avant 6 mois en général",
    category: "Vaccinations (calendrier national)",
    hint: "Vaccin recommandé, nombre de dépend de la période d’éligibilité — voir fiche de vaccination-info-service / médecin.",
  },
  {
    id: "tmpl-ortho-choix",
    title: "Soins de ville au choix (ex. ORL, dentiste, libéral non obligatoire)",
    category: "Hors calendre obligatoire",
    hint: "Aucun calendre national imposé de la même façon que le vaccinal — noter quand c’est d’actualité pour vous.",
  },
];
