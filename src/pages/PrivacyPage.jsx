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
            Si la <strong>synchronisation cloud Supabase</strong> est activée pour le projet, une copie peut être
            associée à ton compte (connexion depuis <strong>Profil</strong>) pour retrouver ton suivi ailleurs — en
            transit chiffré, au service du produit uniquement.
          </li>
          <li>
            Politique hébergeur :{" "}
            <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">
              Supabase — confidentialité (en anglais)
            </a>
            .
          </li>
        </ul>
      </PrivacySection>

      <PrivacySection id="privacy-sync" icon={Cloud} title="Sauvegarde et compte">
        <ul className="privacy-list">
          <li>
            Sans compte ou sans synchro cloud, tes données suivent cet appareil / ce navigateur. Les
            effacer ou changer d’environnement peut faire <strong>perdre</strong> l’historique local.
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
            Des outils du type <strong>Web Analytics / GA4</strong> (selon la configuration du déploiement)
            peuvent mesurer des indicateurs <strong>techniques et agrégés</strong> : pages vues, type
            d’appareil, pays approximatif, etc.
          </li>
          <li>
            Ce n’est <strong>pas</strong> une copie de tes champs personnels à des fins publicitaires.
          </li>
          <li>
            <a href={VERCEL_PRIVACY} target="_blank" rel="noopener noreferrer">
              Vercel — politique de confidentialité (en anglais)
            </a>
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
        <ul className="privacy-list">
          <li>
            Tu peux demander la <strong>suppression</strong> des données liées à ton compte cloud en passant
            par les réglages du service (hébergeur / support du projet) et en te déconnectant depuis l’app.
          </li>
          <li>
            Pour les données uniquement sur ton appareil, tu peux les effacer via les paramètres du
            navigateur (données du site).
          </li>
        </ul>
        <p className="privacy-footer-links">
          <Link to="/" className="privacy-footer-link">
            Retour à l’accueil
          </Link>
        </p>
      </PrivacySection>
    </AppPage>
  );
}
