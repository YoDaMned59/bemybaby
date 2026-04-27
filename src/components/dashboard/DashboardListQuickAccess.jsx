import { Link } from "react-router-dom";
import { Baby, CalendarClock, FileText, Luggage, Sparkles } from "lucide-react";

const ENTRIES = [
  {
    to: "/lists/baby",
    label: "Liste bébé",
    icon: Baby,
  },
  {
    to: "/lists/maternity-bag",
    label: "Valise maternité",
    icon: Luggage,
  },
  {
    to: "/lists/admin",
    label: "Démarches",
    icon: FileText,
  },
  {
    to: "/rdv",
    label: "Rendez-vous",
    icon: CalendarClock,
  },
  {
    to: "/lists/prenoms-mixte",
    label: "Idées prénoms",
    icon: Sparkles,
  },
];

export default function DashboardListQuickAccess() {
  return (
    <section
      className="dashboard-quick-access"
      aria-labelledby="dashboard-quick-access-title"
    >
      <h2 id="dashboard-quick-access-title" className="dashboard-quick-access-title">
        Tout de suite
      </h2>
      <ul className="dashboard-quick-access-grid" role="list">
        {ENTRIES.map((item) => {
          const { to, label } = item;
          const ItemIcon = item.icon;
          return (
            <li key={to}>
              <Link to={to} className="dashboard-quick-access-card">
                <span className="dashboard-quick-access-icon" aria-hidden>
                  <ItemIcon strokeWidth={2} />
                </span>
                <span className="dashboard-quick-access-label">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
