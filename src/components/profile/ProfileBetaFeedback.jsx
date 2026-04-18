import { getBetaFeedbackAction } from "../../config/site";

export default function ProfileBetaFeedback() {
  const action = getBetaFeedbackAction();

  return (
    <section className="profile-info-card" aria-labelledby="profile-feedback-title">
      <h2 id="profile-feedback-title" className="profile-info-card-title">
        Aide-nous à améliorer BeMyBaby
      </h2>

      {action ? (
        <>
          <p className="profile-info-lead">
            Cette version est en test : un retour, même court, nous aide à prioriser
            la suite (listes, clarté, bugs…).
          </p>
          <a
            href={action.href}
            className="profile-feedback-button"
            {...(action.type === "url"
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {action.label}
          </a>
        </>
      ) : (
        <>
          <p className="profile-info-lead">
            Cette version est en test : utilise le <strong>lien ou l’adresse</strong>{" "}
            communiqué·e avec ton invitation à la bêta pour nous envoyer un retour.
          </p>
          {import.meta.env.DEV ? (
            <p className="profile-info-lead profile-info-lead--muted">
              En local : définis <strong>VITE_FEEDBACK_URL</strong> (formulaire) ou{" "}
              <strong>VITE_FEEDBACK_EMAIL</strong> dans un fichier{" "}
              <code className="profile-info-code">.env</code> (voir{" "}
              <code className="profile-info-code">.env.example</code>).
            </p>
          ) : null}
        </>
      )}
    </section>
  );
}
