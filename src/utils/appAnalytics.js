import { track } from "@vercel/analytics";
import { isGa4Enabled } from "./ga4Bootstrap";

export function isAppAnalyticsEnabled() {
  return (
    import.meta.env.PROD && import.meta.env.VITE_DISABLE_ANALYTICS !== "true"
  );
}

/**
 * Paramètres compatibles GA4 (pas d’objets imbriqués, pas de PII).
 * @param {Record<string, string | number | boolean | null | undefined>} [properties]
 * @returns {Record<string, string | number | boolean> | undefined}
 */
function sanitizeForGa4(properties) {
  if (!properties) {
    return undefined;
  }
  const out = {};
  for (const [key, value] of Object.entries(properties)) {
    if (value === null || value === undefined) {
      continue;
    }
    if (
      typeof value === "boolean" ||
      typeof value === "number" ||
      typeof value === "string"
    ) {
      out[key] = value;
    }
  }
  return Object.keys(out).length ? out : undefined;
}

function sendGa4Event(name, properties) {
  if (!isGa4Enabled() || typeof window.gtag !== "function") {
    return;
  }
  const params = sanitizeForGa4(properties);
  try {
    if (params && Object.keys(params).length > 0) {
      window.gtag("event", name, params);
    } else {
      window.gtag("event", name);
    }
  } catch {
    // idem Vercel : ne pas bloquer l’app
  }
}

function isUmamiTrackingEnabled() {
  const id = import.meta.env.VITE_UMAMI_WEBSITE_ID;
  if (!id || import.meta.env.VITE_DISABLE_UMAMI === "true") {
    return false;
  }
  if (import.meta.env.PROD) {
    return true;
  }
  return import.meta.env.VITE_UMAMI_DEV === "true";
}

function sendUmamiEvent(name, properties) {
  if (!isUmamiTrackingEnabled()) {
    return;
  }

  const run = () => {
    const umami = typeof window !== "undefined" ? window.umami : null;
    if (!umami || typeof umami.track !== "function") {
      return false;
    }
    try {
      if (properties && Object.keys(properties).length > 0) {
        umami.track(name, properties);
      } else {
        umami.track(name);
      }
    } catch {
      return false;
    }
    return true;
  };

  if (run()) {
    return;
  }
  window.setTimeout(run, 1000);
}

/**
 * Événements agrégés (Vercel, Umami, GA4 si `VITE_GA_MEASUREMENT_ID`). Aucun prénom, date ni contenu de liste.
 *
 * **Suivi hebdo (suggestion)** — dans GA4 : Rapports → Engagement → Événements, filtre 7 jours.
 * Marquer comme « événement clé » (Admin → Événements) pour le tunnel : `profile_saved` (complete),
 * `list_checklist_open`, `checklist_milestone` (milestone 100), `rdv_added`.
 *
 * | name | rôle |
 * |------|------|
 * | `profile_saved` | Profil enregistré (`complete` : prénom + date) |
 * | `list_checklist_open` | Ouverture d’une liste (checklist) |
 * | `checklist_milestone` | Palier 25 / 50 / 75 / 100 % (`list_id`, `milestone`) |
 * | `checklist_custom_item_added` | Item personnalisé ajouté |
 * | `rdv_added` | RDV ajouté (`from_template`) |
 * | `rdv_removed` | RDV retiré |
 *
 * @param {string} name
 * @param {Record<string, string | number | boolean | null | undefined>} [properties]
 */
export function trackAppEvent(name, properties) {
  sendGa4Event(name, properties);

  if (isAppAnalyticsEnabled()) {
    try {
      track(name, properties);
    } catch {
      // Ne pas bloquer l’app si le script analytics n’est pas prêt.
    }
  }

  sendUmamiEvent(name, properties);
}
