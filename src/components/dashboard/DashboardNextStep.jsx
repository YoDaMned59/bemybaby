import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { getDashboardGuidance } from "./dashboardGuidance";

export default function DashboardNextStep({
  isProfileComplete,
  babyProgress,
  appointmentsCount,
}) {
  const { nextHint, nextTo, nextLabel, primary } = getDashboardGuidance({
    isProfileComplete,
    babyProgress,
    appointmentsCount,
  });

  // Ne pas dupliquer si le lien "ensuite" est le même que le CTA principal du hero
  if (nextTo === primary.to) {
    return null;
  }

  return (
    <section
      className="dashboard-next-step"
      aria-labelledby="dashboard-next-step-title"
    >
      <div className="dashboard-next-step-inner">
        <Sparkles
          className="dashboard-next-step-icon"
          aria-hidden
          strokeWidth={2}
        />
        <div>
          <h2 id="dashboard-next-step-title">Prochain pas</h2>
          <p className="dashboard-next-step-text">{nextHint}</p>
          <Link to={nextTo} className="dashboard-next-step-link">
            {nextLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
