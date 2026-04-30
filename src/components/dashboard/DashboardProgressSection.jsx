import { Link } from "react-router-dom";
import ProgressBar from "../ProgressBar";

export default function DashboardProgressSection({
  overallProgress,
  babyProgress,
  maternityBagProgress,
  adminProgress,
  progressHeadline,
}) {
  return (
    <section className="dashboard-section">
      <div className="dashboard-section-header">
        <h2>Progression globale</h2>
        <span className="dashboard-pill">{overallProgress}%</span>
      </div>

      <ProgressBar progress={overallProgress} />

      <div className="dashboard-subtitle">{progressHeadline}</div>

      <div className="dashboard-summary-list">
        <Link to="/lists/baby" className="dashboard-summary-item">
          <span>Liste bébé</span>
          <strong>{babyProgress}%</strong>
        </Link>

        <Link to="/lists/maternity-bag" className="dashboard-summary-item">
          <span>Valise maternité</span>
          <strong>{maternityBagProgress}%</strong>
        </Link>

        <Link to="/lists/admin" className="dashboard-summary-item">
          <span>Démarches</span>
          <strong>{adminProgress}%</strong>
        </Link>
      </div>
    </section>
  );
}
