/**
 * Chrome / Edge : l’événement `beforeinstallprompt` part parfois avant le montage React.
 * On l’écoute dès l’import du module pour ne pas le rater au rafraîchissement.
 */

let captured = null;
const listeners = new Set();

function notify() {
  listeners.forEach((cb) => {
    try {
      cb(captured);
    } catch {
      /* ignore subscriber errors */
    }
  });
}

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    captured = event;
    notify();
  });
}

export function getDeferredInstallPrompt() {
  return captured;
}

export function clearDeferredInstallPrompt() {
  captured = null;
  notify();
}

/**
 * @param {(event: Event | null) => void} callback — reçoit l’événement ou null après consommation
 * @returns {() => void} désinscription
 */
export function subscribeDeferredInstallPrompt(callback) {
  listeners.add(callback);
  if (captured) {
    callback(captured);
  }
  return () => {
    listeners.delete(callback);
  };
}
