import { readStorage, writeStorage } from "./storage";

export const PWA_CHECKS_KEY = "bemybaby_pwa_check_engagement_total";
export const PWA_LATER_UNTIL_KEY = "bemybaby_pwa_install_later_until";
/** Succes navigateur dans le standalone ou accept sur le prompt Chromium. */
export const PWA_NO_MORE_KEY = "bemybaby_pwa_install_completed";

/** @returns {boolean} */
export function isStandaloneDisplayMode() {
  if (typeof window === "undefined") {
    return false;
  }
  const mqStandalone = window.matchMedia?.("(display-mode: standalone)")?.matches;
  if (mqStandalone) {
    return true;
  }
  // iOS Safari PWA en plein écran
  if (window.navigator.standalone === true) {
    return true;
  }
  return false;
}

/** @returns {boolean} */
export function isIosLike() {
  if (typeof navigator === "undefined") {
    return false;
  }
  const ua = navigator.userAgent ?? "";
  if (/iPad|iPhone|iPod/i.test(ua)) {
    return true;
  }
  // iPadOS 13+ mode "desktop" Safari
  if (
    ua.includes("Mac") &&
    typeof navigator.maxTouchPoints === "number" &&
    navigator.maxTouchPoints > 1
  ) {
    return true;
  }
  return false;
}

/**
 * Navigateur où expliquer le flux Partager (principalement iOS).
 */
export function shouldShowIosManualInstallInstructions() {
  return isIosLike();
}

/** @returns {boolean} */
export function isCooldownActive() {
  const until = readStorage(PWA_LATER_UNTIL_KEY, null);
  if (typeof until !== "number" || Number.isNaN(until)) {
    return false;
  }
  return Date.now() < until;
}

export function setCooldown3DaysFromNow() {
  const ms = 3 * 24 * 60 * 60 * 1000;
  writeStorage(PWA_LATER_UNTIL_KEY, Date.now() + ms);
}

/** @returns {boolean} */
export function isPermanentlySuppressed() {
  return readStorage(PWA_NO_MORE_KEY, false) === true;
}

export function persistInstallCompletedSuppression() {
  writeStorage(PWA_NO_MORE_KEY, true);
}

export function bumpChecklistCheckboxEngagements() {
  const cur = typeof readStorage(PWA_CHECKS_KEY, 0) === "number"
    ? readStorage(PWA_CHECKS_KEY, 0)
    : 0;
  const next = cur + 1;
  writeStorage(PWA_CHECKS_KEY, next);
  return next;
}

export function bumpSignificantChecklistEngagementAlternative() {
  const cur = typeof readStorage(PWA_CHECKS_KEY, 0) === "number"
    ? readStorage(PWA_CHECKS_KEY, 0)
    : 0;
  const next = cur + 2;
  writeStorage(PWA_CHECKS_KEY, next);
  return next;
}
