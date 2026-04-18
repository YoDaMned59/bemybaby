import { Link } from "react-router-dom";
import "./ProfileListsGate.scss";

export default function ProfileListsGate({ listTitle }) {
  return (
    <section
      className="profile-lists-gate"
      aria-labelledby="profile-lists-gate-title"
    >
      <h2 id="profile-lists-gate-title">Complète ton profil</h2>

      <p className="profile-lists-gate-lead">
        {listTitle ? (
          <>
            Pour utiliser « <strong>{listTitle}</strong> » et cocher tes éléments, indique
            ton <strong>prénom</strong> et ta <strong>date prévue</strong> dans l’onglet
            Profil. Cela permet aussi d’aligner les rappels avec ton calendrier.
          </>
        ) : (
          <>
            Indique ton <strong>prénom</strong> et ta <strong>date prévue</strong> pour
            accéder aux listes (achats bébé, valise maternité, démarches) et les faire
            évoluer avec ta grossesse.
          </>
        )}
      </p>

      <Link to="/profile" className="profile-lists-gate-button">
        Compléter mon profil
      </Link>
    </section>
  );
}
