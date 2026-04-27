import { Link } from "react-router-dom";
import { CalendarClock } from "lucide-react";
import { useAppointments } from "../../hooks/useAppointments";
import { getNextRdv } from "../../utils/appointmentsModel";
import { formatRdvCountdown } from "../../utils/rdvCountdown";

export default function DashboardRdvTeaser() {
  const { appointments } = useAppointments();
  const next = getNextRdv(appointments);

  if (!next) {
    return (
      <section className="dashboard-section dashboard-rdv-teaser">
        <div className="dashboard-rdv-teaser-inner">
          <CalendarClock className="dashboard-rdv-icon" aria-hidden />
          <div>
            <h2>Rendez-vous</h2>
            <p className="dashboard-rdv-lead">
              Note les visites (pédiatre, vaccins…) et vois un rappel en compte à rebours.
            </p>
            <Link to="/rdv" className="dashboard-rdv-link">
              Gérer mes rendez-vous
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="dashboard-section dashboard-rdv-teaser dashboard-rdv-teaser--has-next">
      <div className="dashboard-rdv-teaser-inner">
        <CalendarClock className="dashboard-rdv-icon" aria-hidden />
        <div>
          <h2>Prochain rendez-vous</h2>
          <p className="dashboard-rdv-next-title">{next.title}</p>
          <p className="dashboard-rdv-countdown">{formatRdvCountdown(next.date)}</p>
          <Link to="/rdv" className="dashboard-rdv-link">
            Voir tout
          </Link>
        </div>
      </div>
    </section>
  );
}
