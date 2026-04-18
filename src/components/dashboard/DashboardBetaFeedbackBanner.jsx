import { getBetaFeedbackAction } from "../../config/site";

/**
 * Accès rapide au formulaire / mail de retour bêta depuis l’accueil
 * (sans passer par l’onglet Profil).
 */
export default function DashboardBetaFeedbackBanner() {
  const action = getBetaFeedbackAction();

  if (!action) {
    return null;
  }

  return (
    <section
      className="dashboard-section dashboard-beta-feedback"
      aria-labelledby="dashboard-beta-feedback-title"
    >
      <div className="dashboard-beta-feedback-inner">
        <div className="dashboard-beta-feedback-texts">
          <h2 id="dashboard-beta-feedback-title">Tu testes la bêta ?</h2>
          <p className="dashboard-beta-feedback-lead">
            Un court questionnaire pour dire ce qui t’a plu, ce qui bloque ou ce qui
            manque — directement depuis l’app.
          </p>
        </div>
        <a
          href={action.href}
          className="dashboard-beta-feedback-button"
          {...(action.type === "url"
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {action.label}
        </a>
      </div>
    </section>
  );
}
