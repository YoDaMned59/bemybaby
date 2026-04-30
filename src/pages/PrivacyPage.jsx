import { useNavigate } from "react-router-dom";
import AppPage from "../components/page/AppPage";
import StackedPageHeader from "../components/page/StackedPageHeader";
import ProfileDocumentNotice from "../components/profile/ProfileDocumentNotice";
import "./PrivacyPage.scss";

const VERCEL_PRIVACY = "https://vercel.com/legal/privacy-policy";

export default function PrivacyPage() {
  const navigate = useNavigate();

  return (
    <AppPage pageClassName="privacy-page" containerClassName="privacy-container">
      <StackedPageHeader
        sectionClassName="privacy-header"
        onBack={() => navigate(-1)}
        title="Confidentialité"
        subtitle="Comment BeMyBaby traite tes informations et la mesure d’audience."
      />

      <ProfileDocumentNotice showPrivacyLink={false} />

      <section className="privacy-block" aria-labelledby="privacy-local-title">
        <h2 id="privacy-local-title">Données dans l’application</h2>
        <p>
          Les <strong>rendez-vous</strong> que tu notes, les <strong>idées de
          prénoms</strong> cochées et les autres <strong>listes</strong> (valise, etc.)
          sont stockés comme le reste : <strong>localement</strong>, sans synchronisation
          vers un compte BeMyBaby dans cette version.
        </p>
      </section>

      <section className="privacy-block" aria-labelledby="privacy-analytics-title">
        <h2 id="privacy-analytics-title">Mesure d’audience</h2>
        <p>
          Si l’application est hébergée sur <strong>Vercel</strong> et que{" "}
          <strong>Web Analytics</strong> est activé dans le projet, des indicateurs{" "}
          <strong>agrégés</strong> peuvent être collectés (par exemple pages consultées,
          pays ou type d’appareil, de façon anonymisée). Cela sert à estimer l’usage global
          de l’app.
        </p>
        <p>
          Quelques <strong>événements techniques agrégés</strong> peuvent aussi être
          envoyés (par exemple enregistrement du profil côté navigateur, ouverture d’une
          liste, paliers d’avancement très grossiers), toujours{" "}
          <strong>sans</strong> transmettre le contenu des champs ni le détail des coches.
        </p>
        <p>
          Ces statistiques <strong>ne contiennent pas</strong> ton prénom, ta date prévue
          ni le détail de tes listes, car ces éléments ne quittent pas ton appareil.
        </p>
        <p>
          <a href={VERCEL_PRIVACY} target="_blank" rel="noopener noreferrer">
            Politique de confidentialité de Vercel (en anglais)
          </a>
        </p>
      </section>

      <section className="privacy-block" aria-labelledby="privacy-rights-title">
        <h2 id="privacy-rights-title">Tes droits (rappel)</h2>
        <p>
          Pour toute question sur les données traitées par l’hébergeur ou l’outil
          d’analyse, tu peux t’adresser à l’éditeur du site ou consulter la documentation
          de Vercel. Pour les données locales de l’app, tu restes maître du stockage sur
          ton téléphone ou ton ordinateur.
        </p>
      </section>
    </AppPage>
  );
}
