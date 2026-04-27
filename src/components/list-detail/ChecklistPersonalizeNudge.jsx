import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { readStorage, writeStorage } from "../../utils/storage";
import "./ChecklistPersonalizeNudge.scss";

const STORAGE_KEY = "bemybaby_personalize_nudge_dismissed";

function isDismissed() {
  return readStorage(STORAGE_KEY, false) === true;
}

export default function ChecklistPersonalizeNudge({ visible }) {
  const [dismissed, setDismissed] = useState(() => isDismissed());

  const onDismiss = useCallback(() => {
    writeStorage(STORAGE_KEY, true);
    setDismissed(true);
  }, []);

  if (!visible || dismissed) {
    return null;
  }

  return (
    <div
      className="checklist-personalize-nudge"
      role="status"
    >
      <p className="checklist-personalize-nudge-text">
        <span>Veux-tu personnaliser ton suivi ?</span>{" "}
        <Link to="/profile" className="checklist-personalize-nudge-link">
          Ajouter prénom et date
        </Link>
      </p>
      <button
        type="button"
        className="checklist-personalize-nudge-close"
        onClick={onDismiss}
        aria-label="Fermer ce message"
      >
        <X size={16} strokeWidth={2.5} aria-hidden />
      </button>
    </div>
  );
}
