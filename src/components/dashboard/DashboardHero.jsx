import { Link } from "react-router-dom";

export default function DashboardHero() {
  return (
    <section className="dashboard-hero" aria-labelledby="dashboard-hero-title">
      <span className="dashboard-brand">BEMYBABY</span>
      <h1 id="dashboard-hero-title">
        Prépare l’arrivée de bébé sans rien oublier{" "}
        <span className="dashboard-hero-emoji" aria-hidden>
          👶
        </span>
      </h1>
      <p className="dashboard-hero-subtitle">
        Checklists simples, valise maternité, démarches et rendez-vous au même
        endroit.
      </p>
      <div className="dashboard-hero-cta">
        <Link to="/lists" className="dashboard-hero-button dashboard-hero-button--primary">
          Commencer mes listes
        </Link>
        <Link
          to="/profile"
          className="dashboard-hero-button dashboard-hero-button--secondary"
        >
          Personnaliser ma grossesse
        </Link>
      </div>
    </section>
  );
}
