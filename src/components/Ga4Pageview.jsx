import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getGaMeasurementId, isGa4Enabled } from "../utils/ga4Bootstrap";

/**
 * Vues de page GA4 à chaque navigation (SPA).
 */
export default function Ga4Pageview() {
  const location = useLocation();

  useEffect(() => {
    if (!isGa4Enabled() || typeof window.gtag !== "function") {
      return;
    }
    const id = getGaMeasurementId();
    if (!id) {
      return;
    }
    const pagePath = location.pathname + location.search;
    try {
      window.gtag("config", id, { page_path: pagePath });
    } catch {
      // ne pas bloquer la navigation
    }
  }, [location]);

  return null;
}
