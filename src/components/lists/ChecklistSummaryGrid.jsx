import { Link } from "react-router-dom";

export default function ChecklistSummaryGrid({ lists }) {
  return (
    <section className="lists-grid">
      {lists.map((list) => (
        <Link key={list.id} to={list.path} className="lists-card">
          <div className="lists-card-top">
            <h2>{list.title}</h2>
            <span className="lists-pill">{list.progress}%</span>
          </div>

          <p>{list.description}</p>

          <div className="lists-progress">
            <div
              className="lists-progress-bar"
              style={{ width: `${list.progress}%` }}
            />
          </div>
        </Link>
      ))}
    </section>
  );
}
