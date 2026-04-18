export default function ProfileDocumentNotice() {
  return (
    <section className="profile-info-card" aria-labelledby="profile-data-title">
      <h2 id="profile-data-title" className="profile-info-card-title">
        Tes données sur cet appareil
      </h2>

      <ul className="profile-info-list">
        <li>
          Tout est enregistré <strong>localement dans ton navigateur</strong> sur
          cet appareil (pas de compte cloud BeMyBaby pour l’instant).
        </li>
        <li>
          Si tu <strong>effaces les données du site</strong>, si tu changes de
          navigateur ou de téléphone, tu peux <strong>perdre</strong> ton profil et
          tes coches.
        </li>
        <li>
          Pour les démarches officielles (Ameli, CAF, maternité…), utilise les{" "}
          <strong>sites et professionnels habilités</strong> : BeMyBaby ne les
          remplace pas.
        </li>
      </ul>

      <p className="profile-info-disclaimer">
        BeMyBaby propose des <strong>listes et rappels à titre informatif</strong>{" "}
        pour t’aider à t’organiser. En cas de doute ou urgence médicale, contacte{" "}
        <strong>un professionnel de santé</strong> ou le <strong>15</strong> (SAMU)
        / <strong>114</strong> (santé mentale) selon la situation.
      </p>
    </section>
  );
}
