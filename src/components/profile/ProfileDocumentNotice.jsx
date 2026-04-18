import { Link } from "react-router-dom";

export default function ProfileDocumentNotice() {
  return (
    <section className="profile-info-card" aria-labelledby="profile-data-title">
      <h2 id="profile-data-title" className="profile-info-card-title">
        Tes données sur cet appareil
      </h2>

      <ul className="profile-info-list">
        <li>
          Tout est enregistré <strong>localement dans ton navigateur</strong> sur cet
          appareil. Il n’y a pas encore de compte cloud BeMyBaby.
        </li>
        <li>
          Si tu <strong>effaces les données du site</strong>, si tu changes de
          navigateur ou de téléphone, tu risques de <strong>perdre</strong> ton profil
          et l’état de tes cases à cocher.
        </li>
        <li>
          Pour les démarches officielles (Assurance maladie, CAF, maternité, etc.),
          passe par les <strong>sites et interlocuteurs prévus</strong> : BeMyBaby ne
          remplace pas ces démarches.
        </li>
      </ul>

      <p className="profile-info-disclaimer">
        BeMyBaby propose des <strong>listes et des rappels à titre informatif</strong>{" "}
        pour t’aider à t’organiser. En cas de doute sur ta santé ou celle de ton
        bébé, ou en cas d’urgence, contacte <strong>un professionnel de santé</strong>{" "}
        ou le <strong>15</strong> (SAMU — urgence vitale immédiate).
      </p>

      <p className="profile-info-privacy-link">
        <Link to="/confidentialite">Confidentialité et mesure d’audience</Link>
      </p>
    </section>
  );
}
