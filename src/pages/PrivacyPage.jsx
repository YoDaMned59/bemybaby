import { useNavigate } from "react-router-dom";
import AppPage from "../components/page/AppPage";
import StackedPageHeader from "../components/page/StackedPageHeader";
import "./PrivacyPage.scss";

const VERCEL_PRIVACY = "https://vercel.com/legal/privacy-policy";
const UMAMI_PRIVACY = "https://umami.is/privacy";
const GOOGLE_PRIVACY = "https://policies.google.com/privacy";

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

      <section className="privacy-block" aria-labelledby="privacy-local-title">
        <h2 id="privacy-local-title">Données dans l’application</h2>
        <p>
          Le profil, les coches des listes et les préférences sont stockés{" "}
          <strong>uniquement dans ton navigateur</strong> (stockage local de l’appareil).
          BeMyBaby ne les envoie pas à un serveur « compte BeMyBaby » : il n’y a pas de
          synchronisation cloud dans cette version.
        </p>
        <p>
          Tu peux effacer ces données à tout moment via les réglages du navigateur
          (suppression des données du site / du stockage local).
        </p>
        <p>
          Les <strong>rendez-vous</strong> que tu notes, les <strong>idées de
          prénoms</strong> cochées et les autres <strong>listes</strong> (valise, etc.)
          restent elles aussi stockées <strong>localement</strong> : rien n’est
          synchronisé vers un compte BeMyBaby dans cette version.
        </p>
      </section>

      <section className="privacy-block" aria-labelledby="privacy-analytics-title">
        <h2 id="privacy-analytics-title">Mesure d’audience</h2>
        <p>
          Si l’application est hébergée sur <strong>Vercel</strong> et que{" "}
          <strong>Web Analytics</strong> est activé dans le projet, des indicateurs{" "}
          <strong>agrégés</strong> peuvent être collectés (par exemple pages consultées,
          pays ou type d’appareil, de façon anonymisée). Cela sert à estimer l’usage global
          de l’app, indépendamment du formulaire de retour bêta.
        </p>
        <p>
          Si <strong>Umami</strong> (mesure d’audience) est configuré pour ce site, des
          données d’usage équivalentes (pages vues et événements techniques agrégés) peuvent
          être traitées par le service{" "}
          <strong>Umami Cloud</strong>.{" "}
          <a href={UMAMI_PRIVACY} target="_blank" rel="noopener noreferrer">
            Politique de confidentialité Umami
          </a>
        </p>
        <p>
          Si <strong>Google Analytics</strong> (GA4) est activé, des statistiques
          d’usage (pages, tendances) peuvent être traitées par{" "}
          <strong>Google</strong> selon ses conditions.{" "}
          <a href={GOOGLE_PRIVACY} target="_blank" rel="noopener noreferrer">
            Politique de confidentialité Google
          </a>
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
