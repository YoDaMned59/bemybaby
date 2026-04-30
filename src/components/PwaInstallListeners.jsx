import { useEffect } from "react";
import {
  consumeDeferredInstallPrompt,
  setDeferredInstallPrompt,
} from "../utils/pwaDeferredInstall";
import { persistInstallCompletedSuppression } from "../utils/pwaInstallPersistence";

/**
 * Capture `beforeinstallprompt`, écoute `appinstalled`.
 */
export default function PwaInstallListeners() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    /** @param {Event} raw */
    function onBeforeInstallPrompt(raw) {
      const ev = raw;
      ev.preventDefault();
      setDeferredInstallPrompt(ev);
    }

    function onAppInstalled() {
      persistInstallCompletedSuppression();
      consumeDeferredInstallPrompt();
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  return null;
}
