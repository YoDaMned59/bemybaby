import { Link } from "react-router-dom";

function listActionHint(progress) {
  if (progress <= 0) {
    return "Par ici pour commencer";
  }
  if (progress < 100) {
    return "Continuer";
  }
  return null;
}

export default function ChecklistSummaryGrid({ lists, featuredListId }) {
  return (
    <section className="lists-grid">
      {lists.map((list) => {
        const isFeatured = featuredListId && list.id === featuredListId;
        const actionHint =
          isFeatured && list.progress < 100 ? listActionHint(list.progress) : null;

        return (
          <Link
            key={list.id}
            to={list.path}
            className={`lists-card${isFeatured ? " lists-card--featured" : ""}`}
          >
            <div className="lists-card-top">
              <h2>{list.title}</h2>
              <span className="lists-pill">{list.progress}%</span>
            </div>

            {actionHint ? (
              <p className="lists-card-action-hint">{actionHint}</p>
            ) : null}

            <p>{list.description}</p>

            <div className="lists-progress">
              <div
                className="lists-progress-bar"
                style={{ width: `${list.progress}%` }}
              />
            </div>
          </Link>
        );
      })}
    </section>
  );
}
