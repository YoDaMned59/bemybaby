import { useCallback, useEffect, useState } from "react";

function isStandaloneDisplay() {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.matchMedia("(display-mode: fullscreen)").matches ||
    Boolean(window.navigator.standalone)
  );
}

function isLikelyIOS() {
  if (typeof navigator === "undefined") {
    return false;
  }

  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

export default function DashboardPwaInstall() {
  const [standalone] = useState(() => isStandaloneDisplay());
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const ios = isLikelyIOS();

  useEffect(() => {
    if (standalone) {
      return undefined;
    }

    function onBeforeInstallPrompt(event) {
      event.preventDefault();
      setDeferredPrompt(event);
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    return () =>
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
  }, [standalone]);

  const handleInstallClick = useCallback(async () => {
    if (!deferredPrompt) {
      return;
    }

    await deferredPrompt.prompt();
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  if (standalone) {
    return null;
  }

  return (
    <section
      className="dashboard-section dashboard-pwa-install"
      aria-label="Installation sur l’écran d’accueil"
    >
      <div className="dashboard-section-header">
        <h2>Installer BeMyBaby</h2>
      </div>

      <p className="dashboard-pwa-install-lead">
        Ajoute l’app sur ton écran d’accueil pour un accès plus rapide (comme une
        application classique).
      </p>

      {deferredPrompt ? (
        <div className="dashboard-pwa-install-actions">
          <button
            type="button"
            className="dashboard-pwa-install-button"
            onClick={handleInstallClick}
          >
            Installer sur l’écran d’accueil
          </button>
        </div>
      ) : null}

      {ios ? (
        <div className="dashboard-pwa-install-hint">
          <strong>iPhone / iPad (Safari)</strong>
          <p>
            Touche l’icône <span className="dashboard-pwa-share">Partager</span>{" "}
            (carré avec flèche vers le haut), puis{" "}
            <strong>« Sur l’écran d’accueil »</strong>.
          </p>
        </div>
      ) : (
        <div className="dashboard-pwa-install-hint">
          <strong>Android (Chrome)</strong>
          <p>
            Ouvre le menu <strong>⋮</strong> en haut à droite, puis cherche{" "}
            <strong>« Installer l’application »</strong> ou{" "}
            <strong>« Ajouter à l’écran d’accueil »</strong>.
          </p>
          {!deferredPrompt ? (
            <p className="dashboard-pwa-install-note">
              Si le bouton d’installation n’apparaît pas, Chrome peut proposer l’installation
              seulement après une courte utilisation : navigue un peu dans l’app puis
              réessaie.
            </p>
          ) : null}
        </div>
      )}
    </section>
  );
}
