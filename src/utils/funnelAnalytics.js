import { trackAppEvent } from "./appAnalytics";

/** Première fois qu’une liste template reçoit un cochet (événement funnel `list_created`). */
export const ENGAGED_MARKER_PREFIX = "bemybaby_list_engaged_";

/** Marque une session navigateur déjà « initialisée » (évite double comptage au refresh). */
const SESSION_INIT_KEY = "bemybaby_session_init";

/** Visites distinctes (nouvelle « session navigateur » = sessionStorage vierge). */
const VISIT_COUNTER_KEY = "bemybaby_visit_count";

/** landing : une fois par session sur le dashboard `/`. */
export function trackLandingViewIfFirstThisSession() {
  try {
    if (typeof sessionStorage === "undefined") {
      return;
    }
    if (sessionStorage.getItem("bemybaby_landing_view_sent") === "1") {
      return;
    }
    sessionStorage.setItem("bemybaby_landing_view_sent", "1");
    trackAppEvent("landing_view", {});
  } catch {
    // idem autres analytics
  }
}

/** Incrémenter visites distinctes navigateur-session et émettre `returning_user` à partir du 2e épisode (même fenêtre fermée puis rouverte). */
export function trackReturningUserSession() {
  try {
    if (typeof sessionStorage === "undefined" || typeof localStorage === "undefined") {
      return;
    }
    if (sessionStorage.getItem(SESSION_INIT_KEY) === "1") {
      return;
    }
    sessionStorage.setItem(SESSION_INIT_KEY, "1");

    const raw = Number(localStorage.getItem(VISIT_COUNTER_KEY) || "0") || 0;
    const next = raw + 1;
    localStorage.setItem(VISIT_COUNTER_KEY, String(next));

    if (next >= 2) {
      trackAppEvent("returning_user", {
        visit_count: Math.min(next, 999),
      });
    }
  } catch {
    //
  }
}
