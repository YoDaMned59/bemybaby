import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function ChecklistSummaryGrid({ lists, featuredListId }) {
  return (
    <section className="lists-grid">
      {lists.map((list) => {
        const isFeatured = featuredListId && list.id === featuredListId;
        let actionHint = null;
        if (list.progress > 0 && list.progress < 100) {
          actionHint = "Continuer la liste";
        } else if (isFeatured && list.progress === 0) {
          actionHint = "Par ici pour commencer";
        }

        return (
          <Link
            key={list.id}
            to={list.path}
            className={`lists-card${isFeatured ? " lists-card--featured" : ""}${actionHint ? " lists-card--has-callout" : ""}`}
          >
            <div className="lists-card-top">
              <h2>{list.title}</h2>
              <span className="lists-pill">{list.progress}%</span>
            </div>

            <p className="lists-card-desc">{list.description}</p>

            <div className="lists-progress">
              <div
                className="lists-progress-bar"
                style={{ width: `${list.progress}%` }}
              />
            </div>

            {actionHint ? (
              <div className="lists-card-callout">
                <span className="lists-card-callout-text">{actionHint}</span>
                <ChevronRight
                  className="lists-card-callout-icon"
                  strokeWidth={2.25}
                  aria-hidden
                />
              </div>
            ) : null}
          </Link>
        );
      })}
    </section>
  );
}
