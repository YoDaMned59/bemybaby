import { Link } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { babyChecklist } from "../data/babyChecklist";
import { maternityBagChecklist } from "../data/maternityBagChecklist";
import { adminChecklist } from "../data/adminChecklist";
import { getProgress } from "../utils/checklist";
import "./ListsPage.css";

export default function ListsPage() {
  const [baby] = useLocalStorage("bmb-list-baby", babyChecklist);
  const [bag] = useLocalStorage("bmb-list-bag", maternityBagChecklist);
  const [admin] = useLocalStorage("bmb-list-admin", adminChecklist);

  const lists = [
    {
      id: "baby",
      title: "Liste bébé",
      description: "Tout ce qu’il faut pour l’arrivée de bébé",
      data: baby,
    },
    {
      id: "bag",
      title: "Valise maternité",
      description: "Préparer ton séjour à la maternité",
      data: bag,
    },
    {
      id: "admin",
      title: "Démarches",
      description: "Ne rien oublier côté administratif",
      data: admin,
    },
  ];

  return (
    <div className="lists-page">
      <h1>Mes listes</h1>

      <div className="lists-grid">
        {lists.map((list) => {
          const progress = getProgress(list.data);

          return (
            <Link
              to={`/listes/${list.id}`}
              key={list.id}
              className="list-card"
            >
              <div className="list-card-header">
                <h2>{list.title}</h2>
                <span>{progress.percent}%</span>
              </div>

              <p className="list-card-desc">{list.description}</p>

              <div className="progress-wrap">
                <div
                  className="progress-fill"
                  style={{ width: `${progress.percent}%` }}
                />
              </div>

              <p className="list-card-footer">
                {progress.checked} / {progress.total} éléments
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}