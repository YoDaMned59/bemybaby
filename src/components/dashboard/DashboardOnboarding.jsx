import { Link } from "react-router-dom";

export default function DashboardOnboarding() {
  return (
    <section className="dashboard-section dashboard-onboarding">
      <div className="dashboard-section-header">
        <h2>Bienvenue 👋</h2>
      </div>

      <p className="dashboard-onboarding-text">
        Complète ton profil pour afficher ta <strong>semaine de grossesse</strong>, tes{" "}
        <strong>rappels</strong> et tes <strong>listes</strong> (bébé, valise, démarches)
        au même endroit.
      </p>

      <div className="dashboard-onboarding-points">
        <div className="dashboard-onboarding-point">
          <span className="dashboard-onboarding-dot">•</span>
          <span>
            Ta date prévue sert à estimer ta semaine et à te proposer des actions
            cohérentes avec ton calendrier
          </span>
        </div>

        <div className="dashboard-onboarding-point">
          <span className="dashboard-onboarding-dot">•</span>
          <span>
            Des listes à cocher (achats, valise, administratif) : elles se débloquent une
            fois le profil complété
          </span>
        </div>

        <div className="dashboard-onboarding-point">
          <span className="dashboard-onboarding-dot">•</span>
          <span>Pas de fil d’actualités : l’application reste centrée sur l’organisation</span>
        </div>
      </div>

      <Link to="/profile" className="dashboard-onboarding-button">
        Compléter mon profil
      </Link>
    </section>
  );
}
