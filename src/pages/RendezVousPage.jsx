import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppPage from "../components/page/AppPage";
import StackedPageHeader from "../components/page/StackedPageHeader";
import {
  APPOINTMENT_TEMPLATES,
  RDV_OFFICIAL_SOURCES,
} from "../data/appointmentsTemplates";
import { useAppointments } from "../hooks/useAppointments";
import { formatRdvCountdown } from "../utils/rdvCountdown";
import "./RendezVousPage.scss";

function formatLongDate(iso) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) {
    return iso;
  }
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function RendezVousPage() {
  const navigate = useNavigate();
  const {
    appointments,
    addFromTemplate,
    addCustom,
    updateDate,
    toggleCompleted,
    removeOne,
  } = useAppointments();

  const [titleDraft, setTitleDraft] = useState("");
  const [dateDraft, setDateDraft] = useState(() => {
    const t = new Date();
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
  });
  const [planningId, setPlanningId] = useState(null);
  const [templateDate, setTemplateDate] = useState("");

  function onPlanTemplate(tmpl) {
    setPlanningId(tmpl.id);
    const t = new Date();
    setTemplateDate(
      `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`
    );
  }

  function onConfirmTemplate(tmpl) {
    addFromTemplate(tmpl.id, tmpl.title, templateDate);
    setPlanningId(null);
  }

  function onAddCustom(e) {
    e.preventDefault();
    addCustom(titleDraft, dateDraft);
    setTitleDraft("");
  }

  return (
    <AppPage pageClassName="rdv-page" containerClassName="rdv-container">
      <StackedPageHeader
        sectionClassName="rdv-header"
        onBack={() => navigate(-1)}
        title="Rendez-vous"
        subtitle="Rappels par date (local). Repères d’après le calendrier vaccinal, ameli (suivi) et le ministère (certificats) — vérifier toujours avec un professionnel de santé."
      />

      <form className="rdv-form" onSubmit={onAddCustom}>
        <h2 className="rdv-h2">Ajouter un rendez-vous</h2>
        <label className="rdv-label">
          <span>Intitulé</span>
          <input
            type="text"
            className="rdv-input"
            value={titleDraft}
            onChange={(e) => setTitleDraft(e.target.value)}
            placeholder="ex. Pédiatre, PMI…"
            autoComplete="off"
          />
        </label>
        <label className="rdv-label">
          <span>Date</span>
          <input
            type="date"
            className="rdv-input"
            value={dateDraft}
            onChange={(e) => setDateDraft(e.target.value)}
          />
        </label>
        <button type="submit" className="rdv-btn" disabled={!titleDraft.trim()}>
          Ajouter
        </button>
      </form>

      <section className="rdv-section" aria-labelledby="rdv-tpl-title">
        <h2 className="rdv-h2" id="rdv-tpl-title">
          Suggestions (repères)
        </h2>
        <p className="rdv-hint">
          Rédigé à partir des calendres publics (dates exactes = celles inscrites sur ton
          carnet de santé, ton courrier d’appel, ou conseillées par le médecin / la PMI).
        </p>
        <ul className="rdv-template-list">
          {APPOINTMENT_TEMPLATES.map((tmpl) => (
            <li key={tmpl.id} className="rdv-template-card">
              <div>
                <span className="rdv-tpl-cat">{tmpl.category}</span>
                <h3 className="rdv-tpl-title">{tmpl.title}</h3>
                {tmpl.hint ? <p className="rdv-tpl-hint">{tmpl.hint}</p> : null}
              </div>
              {planningId === tmpl.id ? (
                <div className="rdv-tpl-confirm">
                  <input
                    type="date"
                    className="rdv-input"
                    value={templateDate}
                    onChange={(e) => setTemplateDate(e.target.value)}
                  />
                  <div className="rdv-tpl-btns">
                    <button
                      type="button"
                      className="rdv-btn"
                      onClick={() => onConfirmTemplate(tmpl)}
                    >
                      Valider
                    </button>
                    <button
                      type="button"
                      className="rdv-btn rdv-btn--ghost"
                      onClick={() => setPlanningId(null)}
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  className="rdv-btn rdv-btn--sm"
                  onClick={() => onPlanTemplate(tmpl)}
                >
                  Choisir la date
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="rdv-section" aria-labelledby="rdv-list-title">
        <h2 className="rdv-h2" id="rdv-list-title">
          Mes rendez-vous
        </h2>
        {appointments.length === 0 ? (
          <p className="rdv-empty">Aucun rendez-vous noté pour l’instant.</p>
        ) : (
          <ul className="rdv-appointments">
            {appointments.map((a) => (
              <li
                key={a.id}
                className={`rdv-appt ${a.completed ? "rdv-appt--done" : ""}`}
              >
                <div className="rdv-appt-main">
                  <label className="rdv-check">
                    <input
                      type="checkbox"
                      checked={a.completed}
                      onChange={() => toggleCompleted(a.id)}
                    />
                    <span className="rdv-check-text">{a.title}</span>
                  </label>
                  <p className="rdv-date-line">{formatLongDate(a.date)}</p>
                  <p className="rdv-countdown" aria-live="polite">
                    {a.completed
                      ? "Fait"
                      : `Rappel : ${formatRdvCountdown(a.date)}`}
                  </p>
                </div>
                <div className="rdv-appt-aside">
                  <input
                    type="date"
                    className="rdv-input rdv-input--date"
                    value={a.date}
                    onChange={(e) => updateDate(a.id, e.target.value)}
                    aria-label="Modifier la date"
                  />
                  <button
                    type="button"
                    className="rdv-btn rdv-btn--ghost rdv-btn--sm"
                    onClick={() => removeOne(a.id)}
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer className="rdv-sources" aria-label="Sources officielles">
        <h2 className="rdv-h2">Sources (France)</h2>
        <ul className="rdv-sources-list">
          {RDV_OFFICIAL_SOURCES.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="rdv-hint">
          Le calendrier vaccinal est mis à jour : consulte le PDF le plus récent sur le site
          du ministère de la Santé avant de noter un rendez-vous.
        </p>
      </footer>
    </AppPage>
  );
}
