import { Link } from "react-router-dom";

export default function DashboardOnboarding() {
  return (
    <section className="dashboard-section dashboard-onboarding">
      <div className="dashboard-section-header">
        <h2>Bienvenue 👋</h2>
      </div>

      <p className="dashboard-onboarding-text">
        Renseigne ton profil pour activer la <strong>semaine de grossesse</strong>, les{" "}
        <strong>rappels</strong> et les <strong>listes</strong> (bébé, valise,
        démarches) au même endroit.
      </p>

      <div className="dashboard-onboarding-points">
        <div className="dashboard-onboarding-point">
          <span className="dashboard-onboarding-dot">•</span>
          <span>Semaine de grossesse et date prévue pour cadrer les prochaines étapes</span>
        </div>

        <div className="dashboard-onboarding-point">
          <span className="dashboard-onboarding-dot">•</span>
          <span>Checklists à cocher : achats, valise, administratif — consultables quand tu veux</span>
        </div>

        <div className="dashboard-onboarding-point">
          <span className="dashboard-onboarding-dot">•</span>
          <span>Pas de fil d’actus : l’app reste centrée sur l’organisation</span>
        </div>
      </div>

      <Link to="/profile" className="dashboard-onboarding-button">
        Compléter mon profil
      </Link>
    </section>
  );
}
