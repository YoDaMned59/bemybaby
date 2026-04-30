import { Link } from "react-router-dom";
import { getDashboardGuidance } from "./dashboardGuidance";

export default function DashboardHero({
  firstName,
  isProfileComplete,
  babyProgress,
  appointmentsCount,
}) {
  const name =
    typeof firstName === "string" &&
    firstName.trim() &&
    firstName.trim() !== "toi"
      ? firstName.trim()
      : "";

  const { primary } = getDashboardGuidance({
    isProfileComplete,
    babyProgress,
    appointmentsCount,
  });

  return (
    <section className="dashboard-hero" aria-labelledby="dashboard-hero-title">
      <span className="dashboard-brand">BEMYBABY</span>
      <h1 id="dashboard-hero-title">
        {name
          ? `${name}, prépare l’arrivée de bébé sans rien oublier `
          : "Prépare l’arrivée de bébé sans rien oublier "}
        <span className="dashboard-hero-emoji" aria-hidden>
          👶
        </span>
      </h1>
      <p className="dashboard-hero-subtitle">
        Une action à la fois : listes, valise et rendez-vous au même endroit.
      </p>
      <div className="dashboard-hero-cta">
        <Link
          to={primary.to}
          className="dashboard-hero-button dashboard-hero-button--primary"
        >
          {primary.primaryLabel}
        </Link>
        <Link
          to={primary.secondaryTo}
          className="dashboard-hero-button dashboard-hero-button--primary"
        >
          {primary.secondaryHint}
        </Link>
      </div>
    </section>
  );
}
