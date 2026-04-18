/**
 * Liens de retour bêta (Vite : préfixe VITE_).
 * Sur Vercel : Project → Settings → Environment Variables.
 *
 * - VITE_FEEDBACK_URL : formulaire (Google Forms, Tally, Typeform…)
 * - sinon VITE_FEEDBACK_EMAIL : ouvre le client mail avec sujet prérempli
 */

function trimEnv(value) {
  if (value === undefined || value === null) {
    return "";
  }

  return String(value).trim();
}

/**
 * @returns {{ type: "url", href: string, label: string } | { type: "mailto", href: string, label: string } | null}
 */
export function getBetaFeedbackAction() {
  const url = trimEnv(import.meta.env.VITE_FEEDBACK_URL);
  if (url) {
    return {
      type: "url",
      href: url,
      label: "Donner mon avis sur la bêta",
    };
  }

  const email = trimEnv(import.meta.env.VITE_FEEDBACK_EMAIL);
  if (email) {
    const subject = encodeURIComponent("Retour bêta BeMyBaby");
    const body = encodeURIComponent(
      [
        "Bonjour,",
        "",
        "Voici mon retour :",
        "",
        "",
        "—",
        "Semaine de grossesse (si concerné·e) :",
        "Appareil / navigateur :",
      ].join("\n")
    );

    return {
      type: "mailto",
      href: `mailto:${email}?subject=${subject}&body=${body}`,
      label: "Envoyer un retour par e-mail",
    };
  }

  return null;
}
