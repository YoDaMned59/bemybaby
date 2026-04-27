const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
const disabled = import.meta.env.VITE_DISABLE_GA === "true";
const allowDev = import.meta.env.VITE_GA_DEV === "true";

/**
 * Google Analytics 4 (gtag). Activé en prod si VITE_GA_MEASUREMENT_ID est défini.
 * @see https://developers.google.com/analytics/devguides/collection/gtagjs
 */
export function isGa4Enabled() {
  if (!measurementId || disabled) {
    return false;
  }
  if (import.meta.env.DEV && !allowDev) {
    return false;
  }
  return true;
}

export function getGaMeasurementId() {
  return measurementId || "";
}

if (typeof document !== "undefined" && isGa4Enabled()) {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag("js", new Date());

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}
