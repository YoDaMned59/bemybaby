import { Link } from "react-router-dom";

export default function ChecklistSummaryGrid({ lists, featuredListId }) {
  return (
    <section className="lists-grid">
      {lists.map((list) => {
        const isFeatured = featuredListId && list.id === featuredListId;
        let actionHint = null;
        if (list.progress > 0 && list.progress < 100) {
          actionHint = "Continuer";
        } else if (isFeatured && list.progress === 0) {
          actionHint = "Par ici pour commencer";
        }

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
