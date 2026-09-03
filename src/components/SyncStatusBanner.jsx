import { useEffect, useState } from "react";
import "./SyncStatusBanner.scss";

/**
 * Affiche un bandeau discret si la synchro cloud échoue plusieurs fois de suite.
 */
export default function SyncStatusBanner() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    /** @param {Event} ev */
    function onErr(ev) {
      const detail = /** @type {CustomEvent<{ message?: string }>} */ (ev).detail;
      setMessage(
        detail?.message
          ? `Sauvegarde cloud temporairement indisponible (${detail.message}). Tes données restent sur cet appareil.`
          : "Sauvegarde cloud temporairement indisponible. Tes données restent sur cet appareil."
      );
    }
    window.addEventListener("bemybaby:sync-error", onErr);
    return () => window.removeEventListener("bemybaby:sync-error", onErr);
  }, []);

  if (!message) {
    return null;
  }

  return (
    <div className="sync-status-banner" role="status">
      <p>{message}</p>
      <button
        type="button"
        className="sync-status-banner-dismiss"
        onClick={() => setMessage("")}
      >
        Fermer
      </button>
    </div>
  );
}
