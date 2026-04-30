import { useProfile } from "../../hooks/useProfile";

/**
 * Rappelle l’intérêt immédiat du profil : semaine ou ce qu’il reste à renseigner.
 */
export default function ProfileValueBanner() {
  const { firstName, formattedDueDate, currentWeek, hasDueDate } = useProfile();

  const name =
    typeof firstName === "string" &&
    firstName.trim() &&
    firstName.trim() !== "toi"
      ? firstName.trim()
      : null;

  return (
    <section
      className="profile-value-banner"
      aria-label="Valeur du profil pour ton suivi"
    >
      {hasDueDate ? (
        <>
          <p className="profile-value-banner-lead">
            {name ? `${name}, ` : null}
            tu es en semaine{" "}
            <strong className="profile-value-banner-num">{currentWeek}</strong>{" "}
            — terme prévu le {formattedDueDate}.
          </p>
          <p className="profile-value-banner-hint">
            Ces infos alimentent l’accueil et les rappels utiles partout dans l’app.
          </p>
        </>
      ) : (
        <p className="profile-value-banner-lead">
          <strong>Deux infos</strong> (prénom + date prévue) débloquent ton suivi
          personnalisé sur l’accueil.
        </p>
      )}
    </section>
  );
}
