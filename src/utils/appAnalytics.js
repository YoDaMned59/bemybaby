import { track } from "@vercel/analytics";

export function isAppAnalyticsEnabled() {
  return (
    import.meta.env.PROD && import.meta.env.VITE_DISABLE_ANALYTICS !== "true"
  );
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
 * Événements agrégés (Vercel et/ou Umami). Aucun prénom, date ni contenu de liste.
 * @param {string} name
 * @param {Record<string, string | number | boolean | null | undefined>} [properties]
 */
export function trackAppEvent(name, properties) {
  if (isAppAnalyticsEnabled()) {
    try {
      track(name, properties);
    } catch {
      // Ne pas bloquer l’app si le script analytics n’est pas prêt.
    }
  }

  sendUmamiEvent(name, properties);
}
