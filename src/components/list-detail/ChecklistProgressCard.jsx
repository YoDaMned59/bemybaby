export default function ChecklistProgressCard({ progress }) {
  return (
    <section className="list-detail-card">
      <div className="list-detail-card-top">
        <span>Progression</span>
        <strong>{progress}%</strong>
      </div>

      <div className="list-detail-progress">
        <div
          className="list-detail-progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>
    </section>
  );
}
