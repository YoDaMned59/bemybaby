import {
  startTransition,
  useCallback,
  useState,
  useSyncExternalStore,
} from "react";
import {
  consumeDeferredInstallPrompt,
  getDeferredInstallPrompt,
  getDeferredInstallPromptSnapshot,
  subscribeDeferredInstallPrompt,
} from "../../utils/pwaDeferredInstall";
import {
  isCooldownActive,
  isPermanentlySuppressed,
  isStandaloneDisplayMode,
  persistInstallCompletedSuppression,
  setCooldown3DaysFromNow,
  shouldShowIosManualInstallInstructions,
} from "../../utils/pwaInstallPersistence";
import "./PwaInstallPrompt.scss";

const ENGAGEMENT_SHOW_AT = 2;

function useHasChromiumDeferredPromptAvailable() {
  return useSyncExternalStore(
    subscribeDeferredInstallPrompt,
    getDeferredInstallPromptSnapshot,
    () => false
  );
}

/**
 * @param {{
 *   engagementCount: number;
 * }} props
 */
export default function PwaInstallPrompt({ engagementCount }) {
  const hasDeferred = useHasChromiumDeferredPromptAvailable();
  const [iosHelpOpen, setIosHelpOpen] = useState(false);
  const [desktopHelpOpen, setDesktopHelpOpen] = useState(false);

  const canOfferChromium =
    typeof window !== "undefined" && hasDeferred;

  const canOfferIosHelp =
    typeof window !== "undefined" &&
    shouldShowIosManualInstallInstructions() &&
    !isStandaloneDisplayMode();

  const visible =
    typeof window !== "undefined" &&
    engagementCount >= ENGAGEMENT_SHOW_AT &&
    !isStandaloneDisplayMode() &&
    !isPermanentlySuppressed() &&
    !isCooldownActive();

  const onLater = useCallback(() => {
    setCooldown3DaysFromNow();
    setIosHelpOpen(false);
    setDesktopHelpOpen(false);
  }, []);

  const onPrimary = useCallback(async () => {
    if (canOfferChromium) {
      const ev = getDeferredInstallPrompt();
      if (ev && typeof ev.prompt === "function") {
        try {
          await ev.prompt();
          const choice = await ev.userChoice;
          if (choice?.outcome === "accepted") {
            persistInstallCompletedSuppression();
          }
        } catch {
          // Annulation ou erreur du prompt natif
        } finally {
          consumeDeferredInstallPrompt();
        }
        return;
      }
    }

    if (canOfferIosHelp) {
      startTransition(() => setIosHelpOpen(true));
      return;
    }

    startTransition(() => setDesktopHelpOpen(true));
  }, [canOfferChromium, canOfferIosHelp]);

  const onCloseIosHelp = useCallback(() => {
    setIosHelpOpen(false);
  }, []);

  const onCloseDesktopHelp = useCallback(() => {
    setDesktopHelpOpen(false);
  }, []);

  if (!visible) {
    return iosHelpOpen ? (
      <IosInstallModal onClose={onCloseIosHelp} />
    ) : desktopHelpOpen ? (
      <DesktopInstallHintModal onClose={onCloseDesktopHelp} />
    ) : null;
  }

  return (
    <>
      <div className="pwa-install-card" role="status">
        <h2 className="pwa-install-card-title">📱 Astuce</h2>
        <p className="pwa-install-card-text">
          Ajoute BeMyBaby à ton écran d&apos;accueil pour retrouver facilement
          tes listes et continuer ta préparation.
        </p>
        <div className="pwa-install-card-actions">
          <button type="button" className="pwa-install-btn-primary" onClick={onPrimary}>
            Ajouter à l&apos;écran d&apos;accueil
          </button>
          <button type="button" className="pwa-install-btn-secondary" onClick={onLater}>
            Plus tard
          </button>
        </div>
      </div>

      {iosHelpOpen ? <IosInstallModal onClose={onCloseIosHelp} /> : null}
      {desktopHelpOpen ? (
        <DesktopInstallHintModal onClose={onCloseDesktopHelp} />
      ) : null}
    </>
  );
}

function IosInstallModal({ onClose }) {
  return (
    <div
      className="pwa-install-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pwa-ios-install-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="pwa-install-modal">
        <h2 id="pwa-ios-install-title" className="pwa-install-modal-title">
          Sur iPhone / iPad
        </h2>
        <p className="pwa-install-modal-text">
          Appuie sur l&apos;icône <strong>Partager</strong> (carré avec flèche
          dans Safari), puis sur <strong>Ajouter à l&apos;écran d&apos;accueil</strong> pour
          enregistrer BeMyBaby.
        </p>
        <button type="button" className="pwa-install-modal-ok" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}

function DesktopInstallHintModal({ onClose }) {
  return (
    <div
      className="pwa-install-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pwa-desktop-install-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="pwa-install-modal">
        <h2 id="pwa-desktop-install-title" className="pwa-install-modal-title">
          Sur ordinateur
        </h2>
        <p className="pwa-install-modal-text">
          Dans <strong>Chrome</strong> ou <strong>Edge</strong>, cherche une icône
          d&apos;<strong>installation</strong> dans la barre d&apos;adresse, ou ouvre le
          menu ⋮ puis <strong>Installer l&apos;application</strong>. Pour un raccourci
          téléphone comme une app, ouvre BeMyBaby sur ton mobile et ajoute-le à
          l&apos;écran d&apos;accueil depuis Safari ou Chrome.
        </p>
        <button type="button" className="pwa-install-modal-ok" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}

