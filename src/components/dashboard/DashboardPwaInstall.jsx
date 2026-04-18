import { useCallback, useEffect, useState } from "react";
import { readStorage, writeStorage } from "../../utils/storage";

const PWA_INSTALLED_KEY = "pwaInstalled";

function isStandaloneDisplay() {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.matchMedia("(display-mode: fullscreen)").matches ||
    window.matchMedia("(display-mode: minimal-ui)").matches ||
    Boolean(window.navigator.standalone)
  );
}

function isInstallBannerDismissed() {
  return readStorage(PWA_INSTALLED_KEY, false) === true;
}

function markInstallBannerDismissed() {
  writeStorage(PWA_INSTALLED_KEY, true);
}

/**
 * iPhone / iPod / iPad classique (UA explicite), ou appareil tactile « type Mac » :
 * iPadOS en mode bureau et iPhone « version bureau du site » annoncent souvent
 * Macintosh + maxTouchPoints > 1 sans chaîne « iPad » / « iPhone » dans l’UA.
 */
function isLikelyAppleTouchDevice() {
  if (typeof navigator === "undefined") {
    return false;
  }

  const ua = navigator.userAgent || "";
  if (/iPhone|iPad|iPod/i.test(ua)) {
    return true;
  }

  const platform = navigator.platform || "";
  const touchPoints =
    typeof navigator.maxTouchPoints === "number" ? navigator.maxTouchPoints : 0;

  return platform === "MacIntel" && touchPoints > 1;
}

function computeBannerHidden() {
  if (typeof window === "undefined") {
    return false;
  }

  return isStandaloneDisplay() || isInstallBannerDismissed();
}

export default function DashboardPwaInstall() {
  const [bannerHidden, setBannerHidden] = useState(computeBannerHidden);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [iosHelpOpen, setIosHelpOpen] = useState(false);

  const isAppleTouch = isLikelyAppleTouchDevice();
  const showChromeInstall = Boolean(deferredPrompt);
  const showIosSteps = isAppleTouch && !deferredPrompt;

  useEffect(() => {
    function refreshHidden() {
      if (isStandaloneDisplay() || isInstallBannerDismissed()) {
        setBannerHidden(true);
        return true;
      }

      return false;
    }

    if (refreshHidden()) {
      return undefined;
    }

    const mqs = [
      window.matchMedia("(display-mode: standalone)"),
      window.matchMedia("(display-mode: fullscreen)"),
      window.matchMedia("(display-mode: minimal-ui)"),
    ];

    function onDisplayModeChange() {
      if (isStandaloneDisplay()) {
        setBannerHidden(true);
      }
    }

    mqs.forEach((mq) => mq.addEventListener("change", onDisplayModeChange));

    function onAppInstalled() {
      markInstallBannerDismissed();
      setBannerHidden(true);
    }

    window.addEventListener("appinstalled", onAppInstalled);

    function onVisibility() {
      if (document.visibilityState === "visible") {
        refreshHidden();
      }
    }

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      mqs.forEach((mq) => mq.removeEventListener("change", onDisplayModeChange));
      window.removeEventListener("appinstalled", onAppInstalled);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    if (bannerHidden) {
      return undefined;
    }

    function onBeforeInstallPrompt(event) {
      event.preventDefault();
      setDeferredPrompt(event);
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    return () =>
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
  }, [bannerHidden]);

  const handleInstallClick = useCallback(async () => {
    if (!deferredPrompt) {
      return;
    }

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);

    if (outcome === "accepted") {
      markInstallBannerDismissed();
      setBannerHidden(true);
    }
  }, [deferredPrompt]);

  if (bannerHidden) {
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
        {showIosSteps ? (
          <>
            Sous <strong>Safari</strong>, il n’y a pas de bouton d’installation automatique :
            Apple impose de passer par le menu Partage. Utilise le bouton ci-dessous pour
            afficher les étapes.
          </>
        ) : (
          <>
            Ajoute l’app sur ton écran d’accueil pour un accès plus rapide (comme une
            application classique).
          </>
        )}
      </p>

      {showChromeInstall ? (
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

      {showIosSteps ? (
        <div className="dashboard-pwa-install-actions">
          <button
            type="button"
            className="dashboard-pwa-install-button"
            onClick={() => setIosHelpOpen((open) => !open)}
            aria-expanded={iosHelpOpen}
            aria-controls="pwa-ios-steps"
          >
            {iosHelpOpen
              ? "Masquer les étapes Safari"
              : "Voir les étapes pour l’écran d’accueil"}
          </button>

          {iosHelpOpen ? (
            <div
              id="pwa-ios-steps"
              className="dashboard-pwa-install-ios-panel"
              role="region"
              aria-label="Étapes Safari"
            >
              <ol>
                <li>
                  Touche l’icône <strong>Partager</strong> (carré avec une flèche vers le
                  haut) : en bas sur la plupart des iPhone, dans la barre d’outils sur
                  iPad.
                </li>
                <li>
                  Fais défiler la ligne d’actions puis touche{" "}
                  <strong>« Sur l’écran d’accueil »</strong>.
                </li>
                <li>
                  Valide le nom « BeMyBaby » puis <strong>Ajouter</strong>.
                </li>
              </ol>
              <p className="dashboard-pwa-install-ios-note">
                Si tu ne vois pas « Sur l’écran d’accueil », ouvre bien le site dans{" "}
                <strong>Safari</strong> (pas uniquement dans un aperçu intégré d’une autre
                app).
              </p>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
