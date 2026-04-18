import { Link } from "react-router-dom";
import { getUrgencyText } from "../../utils/todayTasks";
import { getDashboardTaskLink } from "../../utils/dashboardLinks";

export default function DashboardTasksSection({
  hasDueDate,
  currentWeek,
  todayTasks,
  onCompleteTask,
}) {
  return (
    <section className="dashboard-section">
      <div className="dashboard-section-header">
        <h2>À faire maintenant</h2>
        <span className="dashboard-pill">{todayTasks.length} actions</span>
      </div>

      <div className="dashboard-task-list">
        {hasDueDate && todayTasks.length > 0 ? (
          todayTasks.map((task) => {
            const taskLink = getDashboardTaskLink(task);

            return (
              <div key={task.id} className="dashboard-task-item">
                <div className="dashboard-task-icon">✓</div>

                <div className="dashboard-task-content">
                  <span className="dashboard-task-urgency">
                    {getUrgencyText(task, currentWeek)}
                  </span>

                  {taskLink ? (
                    <Link to={taskLink} className="dashboard-task-link">
                      {task.title}
                    </Link>
                  ) : (
                    <p>{task.title}</p>
                  )}
                </div>

                <div className="dashboard-task-actions">
                  {taskLink ? (
                    <Link to={taskLink} className="dashboard-task-open">
                      Ouvrir
                    </Link>
                  ) : null}

                  <button
                    type="button"
                    className="dashboard-task-button"
                    onClick={() => onCompleteTask(task.id)}
                  >
                    Fait
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="dashboard-empty-state">
            <p>
              {hasDueDate
                ? "Aucune action prioritaire pour le moment 🎉"
                : "Ajoute ta date prévue pour afficher les prochaines actions."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
