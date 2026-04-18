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
            Cette version est en phase de test. Un retour, même court, nous aide à
            corriger les bugs et à décider quoi améliorer en priorité.
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
            Cette version est en phase de test. Pour nous écrire, utilise le{" "}
            <strong>lien ou l’adresse e-mail</strong> indiqués dans le message ou
            l’invitation qui t’ont donné accès à la bêta.
          </p>
          {import.meta.env.DEV ? (
            <p className="profile-info-lead profile-info-lead--muted">
              En développement : ajoute <strong>VITE_FEEDBACK_URL</strong> (lien vers
              un formulaire) ou <strong>VITE_FEEDBACK_EMAIL</strong> dans un fichier{" "}
              <code className="profile-info-code">.env</code> — voir{" "}
              <code className="profile-info-code">.env.example</code>.
            </p>
          ) : null}
        </>
      )}
    </section>
  );
}
