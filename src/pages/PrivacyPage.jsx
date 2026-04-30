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
          sont d’abord enregistrés <strong>localement</strong> dans ton navigateur
          (<strong>localStorage</strong>).
        </p>
        <p>
          Si l’éditeur a activé une <strong>synchronisation Supabase</strong>, une copie de
          ces données peut être transférée de façon chiffrée en transit vers un projet
          hébergé chez Supabase (souvent en Europe selon les réglages du projet), liée à un{" "}
          <strong>compte utilisateur anonyme</strong>. Objectif : retrouver ton suivi depuis
          un autre appareil, pas du ciblage publicitaire. Voir la{" "}
          <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">
            politique de confidentialité de Supabase (en anglais)
          </a>
          .
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
          Les <strong>événements d’analytics</strong> envoyés sont des métriques techniques (par
          exemple pages vues ou type d’interaction), selon réglages,{" "}
          <strong>sans être</strong> une copie textuelle de tes champs utilisateur destinée aux
          outils de mesure. Ne pas les confondre avec la donnée fonctionnelle (profil, listes…)
          stockée localement puis, si configuré, sur Supabase uniquement au service du produit.
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
          Pour toute question sur les données traitées par les hébergeurs (
          <strong>Vercel</strong>, <strong>Supabase</strong> si synchro cloud) ou l’outil
          d’analyse (<strong>GA4</strong> si activé), contacte l’éditeur ou consulte les
          documents légaux correspondants. Pour les données encore uniquement sur ton
          appareil dans le navigateur, tu restes maître du stockage sur ton téléphone ou ton
          ordinateur.
        </p>
      </section>
    </AppPage>
  );
}
