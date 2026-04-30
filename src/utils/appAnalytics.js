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

/**
 * Événements agrégés (Vercel + GA4 si `VITE_GA_MEASUREMENT_ID`). Aucun prénom, date ni contenu de liste.
 *
 * **Tunnel produit (GA4 Exploration ou BigQuery)** — ordre conseillé :
 * `landing_view` → `profile_started` → `profile_saved` → `lists_viewed` → `checklist_opened` →
 * `list_created` (premier cochet sur une liste template) → `rdv_viewed` → `rdv_created`, plus `returning_user`.
 *
 * **Événements d’activation / qualité**
 * — `profile_saved` (`complete` : prénom + date prévue).
 * — `checklist_opened` : ouverture d’une liste ; remplace historiquement `list_checklist_open`.
 * — `checklist_milestone` : palier 25 / 50 / 75 / 100 % (`list_id`, `milestone`).
 * — `checklist_custom_item_added` — `rdv_created` (`from_template`) — `rdv_removed`.
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
}
