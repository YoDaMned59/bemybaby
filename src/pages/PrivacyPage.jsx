import { createElement } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppPage from "../components/page/AppPage";
import StackedPageHeader from "../components/page/StackedPageHeader";
import {
  AlertTriangle,
  BarChart3,
  Cloud,
  Heart,
  Lock,
  Shield,
} from "lucide-react";
import "./PrivacyPage.scss";

const VERCEL_PRIVACY = "https://vercel.com/legal/privacy-policy";

function PrivacySection({ id, icon, title, children }) {
  return (
    <section
      className="privacy-card"
      aria-labelledby={id}
      id={id ? `${id}-section` : undefined}
    >
      <div className="privacy-card-heading">
        <span className="privacy-card-icon" aria-hidden>
          {createElement(icon, { strokeWidth: 2 })}
        </span>
        <h2 id={id}>{title}</h2>
      </div>
      <div className="privacy-card-body">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  const navigate = useNavigate();

  return (
    <AppPage pageClassName="privacy-page" containerClassName="privacy-container">
      <StackedPageHeader
        sectionClassName="privacy-header"
        brandClassName="privacy-brand"
        onBack={() => navigate(-1)}
        title="Confidentialité"
        subtitle="BeMyBaby respecte ta vie privée — voici l’essentiel, sans jargon inutile."
      />

      <p className="privacy-reassurance" role="status">
        <span className="privacy-reassurance-emoji" aria-hidden>
          🧡
        </span>
        <span>Tes données restent à toi.</span>
      </p>

      <PrivacySection id="privacy-summary" icon={Lock} title="En bref">
        <ul className="privacy-list">
          <li>
            Tes informations (<strong>profil</strong>, <strong>listes</strong>,{" "}
            <strong>rendez-vous</strong>) servent uniquement à faire fonctionner l’application.
          </li>
          <li>
            Elles sont traitées avec soin, <strong>jamais revendues</strong>, et pas utilisées pour
            de la publicité ciblée sur ton prénom ou le détail de tes listes.
          </li>
          <li>
            La mesure d’audience (si elle est active) reste{" "}
            <strong>anonymisée et agrégée</strong>, pour comprendre l’usage général du service.
          </li>
        </ul>
      </PrivacySection>

      <PrivacySection id="privacy-data" icon={Heart} title="Tes données">
        <ul className="privacy-list">
          <li>
            <strong>Listes</strong>, <strong>profil</strong> et{" "}
            <strong>rendez-vous</strong> sont d’abord enregistrés{" "}
            <strong>dans ton navigateur</strong> (stockage local sur ton appareil).
          </li>
          <li>
            Si une <strong>sauvegarde sécurisée dans le cloud</strong> est activée pour le projet, une copie peut
            être associée à ton compte (connexion depuis <strong>Profil</strong>) pour retrouver ton suivi ailleurs
            — en transit chiffré, au service du produit uniquement.
          </li>
          <li>
            Transparence : l’infrastructure peut s’appuyer sur{" "}
            <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">
              Supabase — politique de confidentialité (en anglais)
            </a>
            .
          </li>
        </ul>
      </PrivacySection>

      <PrivacySection id="privacy-sync" icon={Cloud} title="Sauvegarde et compte">
        <ul className="privacy-list">
          <li>
            Sans compte ou sans sauvegarde cloud, tes données restent sur cet appareil / ce navigateur.{" "}
            <strong>Si tu changes d’appareil sans compte, certaines données peuvent ne pas être conservées.</strong>
          </li>
          <li>
            Avec un <strong>compte e-mail</strong> configuré dans l’app, tu peux retrouver ta session depuis un
            autre téléphone après connexion.
          </li>
          <li>
            <Link to="/profile" className="privacy-inline-cta">
              Ouvrir Profil — compte et sauvegarde
            </Link>
          </li>
        </ul>
      </PrivacySection>

      <PrivacySection id="privacy-analytics" icon={BarChart3} title="Mesure d’audience">
        <ul className="privacy-list">
          <li>
            Des <strong>outils de mesure d’audience</strong> (selon la configuration du déploiement) peuvent
            collecter des indicateurs <strong>techniques et agrégés</strong> : pages vues, type d’appareil, pays
            approximatif, etc.
          </li>
          <li>
            Ce n’est <strong>pas</strong> une copie de tes champs personnels à des fins publicitaires.
          </li>
          <li>
            <a href={VERCEL_PRIVACY} target="_blank" rel="noopener noreferrer">
              En savoir plus — politique de confidentialité Vercel (en anglais)
            </a>
            .
          </li>
        </ul>
      </PrivacySection>

      <PrivacySection id="privacy-health" icon={AlertTriangle} title="Information importante">
        <p className="privacy-lead">
          BeMyBaby est un <strong>outil d’organisation</strong>. Il ne remplace pas les conseils d’un{" "}
          <strong>professionnel de santé</strong>, les démarches officielles (Assurance maladie, CAF, etc.) ni
          les urgences.
        </p>
        <p className="privacy-lead privacy-lead--tight">
          En cas de doute sur ta santé ou celle de bébé, ou en cas d’urgence : contacte un{" "}
          <strong>professionnel de santé</strong> ou le <strong>15</strong> (SAMU — urgence vitale immédiate).
        </p>
      </PrivacySection>

      <PrivacySection id="privacy-rights" icon={Shield} title="Tes droits">
        <p className="privacy-lead">
          Tu peux demander la <strong>suppression</strong> de tes données à tout moment.
        </p>
        <p className="privacy-lead privacy-lead--tight">
          Tu peux aussi <strong>effacer les données locales</strong> depuis les paramètres de ton navigateur
          (données du site).
        </p>
        <p className="privacy-footer-links">
          <Link to="/" className="privacy-footer-link">
            Retour à l’accueil
          </Link>
        </p>
      </PrivacySection>
    </AppPage>
  );
}
