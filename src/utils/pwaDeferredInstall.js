/** @type {BeforeInstallPromptEvent | null} */
let deferredPrompt = null;
let listenersNext = new Set();

function notifyDeferredSubscribers() {
  for (const l of listenersNext) {
    l();
  }
}

/**
 * Réagissent aux changements (prompt Chromium disponible / consommé).
 * @param {() => void} onStoreChange
 */
export function subscribeDeferredInstallPrompt(onStoreChange) {
  listenersNext.add(onStoreChange);
  return () => listenersNext.delete(onStoreChange);
}

export function getDeferredInstallPromptSnapshot() {
  return deferredPrompt;
}

/** @returns {BeforeInstallPromptEvent | null} */
export function getDeferredInstallPrompt() {
  return deferredPrompt;
}

/**
 * @param {BeforeInstallPromptEvent | null} e
 */
export function setDeferredInstallPrompt(e) {
  deferredPrompt = e;
  notifyDeferredSubscribers();
}

export function consumeDeferredInstallPrompt() {
  const p = deferredPrompt;
  deferredPrompt = null;
  notifyDeferredSubscribers();
  return p;
}
