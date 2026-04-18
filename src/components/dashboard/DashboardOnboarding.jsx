import { Link } from "react-router-dom";

export default function DashboardOnboarding() {
  return (
    <section className="dashboard-section dashboard-onboarding">
      <div className="dashboard-section-header">
        <h2>Bienvenue 👋</h2>
      </div>

      <p className="dashboard-onboarding-text">
        Commence par renseigner ton profil pour recevoir des recommandations
        adaptées à ta grossesse.
      </p>

      <div className="dashboard-onboarding-points">
        <div className="dashboard-onboarding-point">
          <span className="dashboard-onboarding-dot">•</span>
          <span>Calcule automatiquement ta semaine de grossesse</span>
        </div>

        <div className="dashboard-onboarding-point">
          <span className="dashboard-onboarding-dot">•</span>
          <span>Affiche les actions les plus utiles au bon moment</span>
        </div>

        <div className="dashboard-onboarding-point">
          <span className="dashboard-onboarding-dot">•</span>
          <span>Personnalise ton suivi et tes listes</span>
        </div>
      </div>

      <Link to="/profile" className="dashboard-onboarding-button">
        Compléter mon profil
      </Link>
    </section>
  );
}
