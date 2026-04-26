import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { isPostHogTrackingEnabled, posthog } from "../utils/posthogBootstrap";

/**
 * Vues de page PostHog pour SPA (init avec capture_pageview: false).
 */
export default function PostHogPageview() {
  const location = useLocation();

  useEffect(() => {
    if (!isPostHogTrackingEnabled()) {
      return;
    }
    try {
      posthog.capture("$pageview");
    } catch {
      // idem appAnalytics : ne pas bloquer la navigation
    }
  }, [location]);

  return null;
}
