export default function DashboardInfoCards({
  hasDueDate,
  currentWeek,
  formattedDueDate,
}) {
  return (
    <section className="dashboard-top-cards">
      <div className="dashboard-info-card">
        <span className="dashboard-info-label">Semaine de grossesse</span>
        <strong>{hasDueDate ? currentWeek : "-"}</strong>
      </div>

      <div className="dashboard-info-card">
        <span className="dashboard-info-label">Date prévue</span>
        <strong>{formattedDueDate}</strong>
      </div>
    </section>
  );
}
