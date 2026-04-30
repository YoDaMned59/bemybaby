/**
 * Logique légère d’activation : profil → première liste → RDV → poursuite listes.
 * @param {object} opts
 * @param {boolean} opts.isProfileComplete
 * @param {number} opts.babyProgress
 * @param {number} opts.appointmentsCount
 */
export function getDashboardGuidance({
  isProfileComplete,
  babyProgress,
  appointmentsCount,
}) {
  const hasAppointments = appointmentsCount > 0;

  let primary = {
    to: "/lists",
    primaryLabel: "Continuer mes listes",
    secondaryHint: "Rendez-vous",
    secondaryTo: "/rdv",
  };

  if (!isProfileComplete) {
    primary = {
      to: "/profile",
      primaryLabel: "Compléter mon profil",
      secondaryHint: "Voir les listes",
      secondaryTo: "/lists",
    };
  } else if (babyProgress === 0) {
    primary = {
      to: "/lists/baby",
      primaryLabel: "Ouvrir ma liste bébé",
      secondaryHint: "Mon profil",
      secondaryTo: "/profile",
    };
  } else if (!hasAppointments) {
    primary = {
      to: "/rdv",
      primaryLabel: "Noter mon premier rendez-vous",
      secondaryHint: "Mes listes",
      secondaryTo: "/lists",
    };
  }

  let nextHint = "";
  let nextTo = "";
  let nextLabel = "";
  if (!isProfileComplete) {
    nextHint =
      "Ensuite, tu pourras cocher ta liste bébé et suivre ta progression.";
    nextTo = "/lists/baby";
    nextLabel = "Voir la liste bébé";
  } else if (babyProgress === 0) {
    nextHint =
      "Une fois quelques cases cochées, note tes visites dans Rendez-vous.";
    nextTo = "/rdv";
    nextLabel = "Onglet Rendez-vous";
  } else if (!hasAppointments) {
    nextHint = "Tes listes avancent : garde tout au même endroit.";
    nextTo = "/lists";
    nextLabel = "Parcourir mes listes";
  } else {
    nextHint = "Pense à la valise maternité et aux démarches administratives.";
    nextTo = "/lists/maternity-bag";
    nextLabel = "Valise maternité";
  }

  return { primary, nextHint, nextTo, nextLabel };
}

/**
 * @param {number} overallProgress
 */
export function getProgressHeadline(overallProgress) {
  const p = Math.min(100, Math.max(0, Math.round(overallProgress)));
  if (p < 25) {
    return "Tu es au début de ta préparation.";
  }
  if (p < 75) {
    return `Tu es à ${p} % de préparation — continue comme ça.`;
  }
  if (p < 100) {
    return `Tu es à ${p} % : la dernière ligne droite.`;
  }
  return "Bravo, ta préparation est complète côté listes.";
}
