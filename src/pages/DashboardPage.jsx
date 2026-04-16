import useLocalStorage from "../hooks/useLocalStorage";
import { getPregnancyWeek } from "../utils/pregnancy";
import { getTodayTasks } from "../utils/todayTasks";
import { getProgress } from "../utils/checklist";
import { babyChecklist } from "../data/babyChecklist";
import { maternityBagChecklist } from "../data/maternityBagChecklist";
import { adminChecklist } from "../data/adminChecklist";
import "./DashboardPage.css";

export default function DashboardPage() {
  const [profile] = useLocalStorage("bmb-profile", { name: "", dueDate: "" });
  const [baby] = useLocalStorage("bmb-list-baby", babyChecklist);
  const [bag] = useLocalStorage("bmb-list-bag", maternityBagChecklist);
  const [admin] = useLocalStorage("bmb-list-admin", adminChecklist);

  const week = getPregnancyWeek(profile.dueDate);
  const tasks = getTodayTasks(week);

  const babyProgress = getProgress(baby);
  const bagProgress = getProgress(bag);
  const adminProgress = getProgress(admin);

  const overallPercent = Math.round(
    (babyProgress.percent + bagProgress.percent + adminProgress.percent) / 3
  );

  function getStatusLabel(percent) {
    if (percent < 25) return "Tu démarres";
    if (percent < 60) return "Tu avances bien";
    if (percent < 90) return "Tu es presque prête";
    return "Tu es très bien préparée";
  }

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero card">
        <p className="dashboard-hero__eyebrow">BeMyBaby</p>
        <h1 className="dashboard-hero__title">
          Bonjour {profile.name || "toi"} 👋
        </h1>
        <p className="dashboard-hero__subtitle">
          Ton assistant simple pour préparer l’arrivée de bébé sans rien oublier.
        </p>
      </section>

      <section className="dashboard-info-grid">
        <article className="card dashboard-info-card">
          <p className="dashboard-info-card__label">Semaine de grossesse</p>
          <p className="dashboard-info-card__value">{week ?? "-"}</p>
        </article>

        <article className="card dashboard-info-card">
          <p className="dashboard-info-card__label">Date prévue</p>
          <p className="dashboard-info-card__value">
            {profile.dueDate || "-"}
          </p>
        </article>
      </section>

      <section className="card dashboard-progress-card">
        <div className="dashboard-section-header">
          <h2>Progression globale</h2>
          <span className="dashboard-badge">{overallPercent}%</span>
        </div>

        <div className="progress-wrap">
          <div
            className="progress-fill"
            style={{ width: `${overallPercent}%` }}
          />
        </div>

        <p className="dashboard-progress-card__status">
          {getStatusLabel(overallPercent)}
        </p>

        <div className="dashboard-progress-list">
          <div className="dashboard-progress-row">
            <span>Liste bébé</span>
            <span>{babyProgress.percent}%</span>
          </div>
          <div className="dashboard-progress-row">
            <span>Valise maternité</span>
            <span>{bagProgress.percent}%</span>
          </div>
          <div className="dashboard-progress-row">
            <span>Démarches</span>
            <span>{adminProgress.percent}%</span>
          </div>
        </div>
      </section>

      <section className="card dashboard-tasks-card">
        <div className="dashboard-section-header">
          <h2>À faire maintenant</h2>
          <span className="dashboard-badge">{tasks.length} actions</span>
        </div>

        <ul className="dashboard-task-list">
          {tasks.map((task) => (
            <li key={task} className="dashboard-task-item">
              <span className="dashboard-task-item__dot">✓</span>
              <span>{task}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="card dashboard-tip-card">
        <h2>Conseil du jour</h2>
        <p>
          Pense à noter quelque part les documents importants pour la maternité
          et les premières démarches après la naissance.
        </p>
      </section>
    </div>
  );
}