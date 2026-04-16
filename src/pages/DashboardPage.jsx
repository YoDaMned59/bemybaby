import useLocalStorage from "../hooks/useLocalStorage";
import { getPregnancyWeek } from "../utils/pregnancy";
import "./DashboardPage.css";

export default function DashboardPage() {
  const [profile] = useLocalStorage("bmb-profile", { name: "", dueDate: "" });

  const week = getPregnancyWeek(profile.dueDate);

  const tasks = [
    "Préparer la valise maternité",
    "Faire la liste bébé",
    "Vérifier les papiers",
  ];

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