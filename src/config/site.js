/**
 * Liens de retour bêta (Vite : préfixe VITE_).
 * Sur Vercel : Project → Settings → Environment Variables.
 *
 * - VITE_FEEDBACK_URL : formulaire (Google Forms, Tally, Typeform…)
 * - sinon VITE_FEEDBACK_EMAIL : ouvre le client mail avec sujet prérempli
 * - sinon : URL du formulaire bêta par défaut (évite un build sans variable = pas de lien)
 */

/** Formulaire public ; remplace-le ou vide-le si tu ne veux plus de lien par défaut. */
const DEFAULT_BETA_FEEDBACK_FORM_URL =
  "https://forms.gle/WpRd2d5diUUAVuqp8";

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
  const urlFromEnv = trimEnv(import.meta.env.VITE_FEEDBACK_URL);
  if (urlFromEnv) {
    return {
      type: "url",
      href: urlFromEnv,
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

  const urlFallback = trimEnv(DEFAULT_BETA_FEEDBACK_FORM_URL);
  if (urlFallback) {
    return {
      type: "url",
      href: urlFallback,
      label: "Donner mon avis sur la bêta",
    };
  }

  return null;
}
