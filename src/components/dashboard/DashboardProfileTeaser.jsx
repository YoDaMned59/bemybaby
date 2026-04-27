import { Link } from "react-router-dom";

/**
 * Optionnel : incite à compléter le profil pour la personnalisation (semaine, rappels).
 */
export default function DashboardProfileTeaser() {
  return (
    <section
      className="dashboard-section dashboard-profile-teaser"
      aria-labelledby="dashboard-profile-teaser-title"
    >
      <h2 id="dashboard-profile-teaser-title">Personnalise ton suivi 💛</h2>
      <p className="dashboard-profile-teaser-text">
        Ajoute ta date prévue pour afficher ta semaine de grossesse, tes rappels
        et ton prochain rendez-vous.
      </p>
      <Link
        to="/profile"
        className="dashboard-profile-teaser-button"
      >
        Compléter mon profil
      </Link>
    </section>
  );
}
