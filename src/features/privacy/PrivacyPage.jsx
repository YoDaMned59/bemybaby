import { createElement } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppPage from "../../components/page/AppPage";
import StackedPageHeader from "../../components/page/StackedPageHeader";
import {
  AlertTriangle,
  BarChart3,
  Cloud,
  Database,
  FileText,
  Globe2,
  Heart,
  Lock,
  Mail,
  Scale,
  Shield,
  UserCheck,
} from "lucide-react";
import "./PrivacyPage.scss";

/** Affiché en tête de page (mettre à jour lors d’un changement substantiel). */
const POLICY_LAST_UPDATED = "3 septembre 2026";

const VERCEL_PRIVACY = "https://vercel.com/legal/privacy-policy";
const SUPABASE_PRIVACY = "https://supabase.com/privacy";

function envTrim(key) {
  const v = import.meta.env[key];
  return typeof v === "string" ? v.trim() : "";
}

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
  const privacyContactEmail = envTrim("VITE_PRIVACY_CONTACT_EMAIL");
  const publisherName = envTrim("VITE_PUBLISHER_NAME");
  const publisherLegalForm = envTrim("VITE_PUBLISHER_LEGAL_FORM");
  const publisherCountry = envTrim("VITE_PUBLISHER_COUNTRY") || "France";
  const publisherSiret = envTrim("VITE_PUBLISHER_SIRET");

  const hasPublisher = Boolean(publisherName);

  return (
    <AppPage pageClassName="privacy-page" containerClassName="privacy-container">
      <StackedPageHeader
        sectionClassName="privacy-header"
        brandClassName="privacy-brand"
        onBack={() => navigate(-1)}
        title="Politique de confidentialité"
        subtitle="BeMyBaby — traitement des données personnelles et informations d’usage, conformément au Règlement général sur la protection des données (RGPD) et aux exigences des plateformes de distribution."
      />

      <p className="privacy-meta">
        <strong>Dernière mise à jour :</strong> {POLICY_LAST_UPDATED}
      </p>

      <div
        className="privacy-callout privacy-callout--access"
        role="region"
        aria-label="Accès au service"
      >
        <p className="privacy-callout-lead">
          <UserCheck
            className="privacy-callout-icon"
            size={20}
            strokeWidth={2}
            aria-hidden
          />
          <span>
            <strong>Accès à l’application :</strong> l’utilisation de BeMyBaby
            nécessite la <strong>création d’un compte</strong> (adresse e-mail et
            mot de passe) ou une <strong>connexion</strong> avec un compte
            existant. Aucun accès aux fonctionnalités principales n’est possible
            sans authentification (lorsque le service cloud est configuré).
          </span>
        </p>
      </div>

      <PrivacySection
        id="privacy-controller"
        icon={FileText}
        title="1. Responsable du traitement"
      >
        {hasPublisher ? (
          <ul className="privacy-list">
            <li>
              <strong>Éditeur / responsable :</strong> {publisherName}
              {publisherLegalForm ? ` (${publisherLegalForm})` : ""}
            </li>
            <li>
              <strong>Pays :</strong> {publisherCountry}
            </li>
            {publisherSiret ? (
              <li>
                <strong>SIRET :</strong> {publisherSiret}
              </li>
            ) : null}
            {privacyContactEmail ? (
              <li>
                <strong>Contact vie privée :</strong>{" "}
                <a href={`mailto:${privacyContactEmail}`}>
                  {privacyContactEmail}
                </a>
              </li>
            ) : null}
          </ul>
        ) : (
          <p className="privacy-lead">
            Le responsable du traitement des données personnelles collectées via
            l’application BeMyBaby est <strong>l’éditeur</strong> identifié sur la
            fiche Google Play (compte développeur / organisation) et, le cas
            échéant, sur le site officiel du service. Pour afficher ici la
            raison sociale et le SIRET, définir les variables{" "}
            <code>VITE_PUBLISHER_*</code> au déploiement.
          </p>
        )}
        <p className="privacy-lead privacy-lead--tight">
          Les traitements décrits ci-dessous visent la fourniture du service
          (suivi personnalisé, listes, rendez-vous, synchronisation du compte) et
          l’amélioration de la sécurité et de la qualité du produit.
        </p>
      </PrivacySection>

      <PrivacySection id="privacy-data" icon={Database} title="2. Données collectées">
        <ul className="privacy-list">
          <li>
            <strong>Données de compte :</strong> adresse e-mail, mot de passe
            (géré de façon sécurisée par le prestataire d’authentification — jamais
            stocké en clair par nous), identifiants techniques de session, date
            de création du compte.
          </li>
          <li>
            <strong>Profil et organisation :</strong> prénom,{" "}
            <strong>date prévue d’accouchement</strong> (si tu la renseignes),
            listes de préparation, états de tâches, rendez-vous (titre, date,
            notes libres que tu saisis).
          </li>
          <li>
            <strong>Données techniques :</strong> informations relatives à
            l’appareil ou au navigateur, traitées de façon nécessaire à la
            sécurité / au fonctionnement, ou agrégées pour la mesure d’audience
            lorsque celle-ci est activée.
          </li>
        </ul>
      </PrivacySection>

      <PrivacySection
        id="privacy-purposes"
        icon={Heart}
        title="3. Finalités et bases légales"
      >
        <ul className="privacy-list">
          <li>
            <strong>Exécution du contrat / service demandé :</strong> création et
            gestion du compte, sauvegarde et synchronisation de tes contenus,
            affichage dans l’application (y compris semaine de grossesse
            estimée à partir de la date prévue).
          </li>
          <li>
            <strong>Intérêt légitime :</strong> mesure d’audience agrégée
            (lorsqu’elle est active), sécurisation des comptes, prévention des
            abus, amélioration de la stabilité — dans le respect de la
            minimisation.
          </li>
          <li>
            <strong>Obligations légales :</strong> conservation ou communication
            si la loi l’exige.
          </li>
        </ul>
      </PrivacySection>

      <PrivacySection
        id="privacy-hosting"
        icon={Cloud}
        title="4. Hébergement, sous-traitants et transferts"
      >
        <ul className="privacy-list">
          <li>
            Compte et synchronisation : infrastructure{" "}
            <strong>Supabase</strong> —{" "}
            <a href={SUPABASE_PRIVACY} target="_blank" rel="noopener noreferrer">
              supabase.com/privacy
            </a>
            . Traitements possibles dans l’UE et/ou hors UE avec garanties
            appropriées.
          </li>
          <li>
            Application web : déploiement possible sur <strong>Vercel</strong> —{" "}
            <a href={VERCEL_PRIVACY} target="_blank" rel="noopener noreferrer">
              vercel.com/legal/privacy-policy
            </a>
            .
          </li>
          <li>
            Nous ne <strong>vendons pas</strong> tes données personnelles. Aucun
            profil publicitaire n’est construit à partir du détail de tes listes
            ou de ton contenu personnel.
          </li>
        </ul>
      </PrivacySection>

      <PrivacySection
        id="privacy-local"
        icon={Lock}
        title="5. Stockage local et compte"
      >
        <ul className="privacy-list">
          <li>
            Des informations peuvent être conservées{" "}
            <strong>localement</strong> sur ton appareil (navigateur ou
            application) pour le fonctionnement et la rapidité d’affichage.
          </li>
          <li>
            Avec un <strong>compte authentifié</strong>, une copie peut être
            associée à ton compte sur l’infrastructure cloud pour retrouver ton
            suivi sur un autre appareil.
          </li>
          <li>
            Sans compte ou sans synchronisation, certaines données peuvent ne
            pas être récupérables en cas de changement d’appareil.
          </li>
        </ul>
      </PrivacySection>

      <PrivacySection
        id="privacy-analytics"
        icon={BarChart3}
        title="6. Cookies, mesure d’audience et traceurs"
      >
        <ul className="privacy-list">
          <li>
            Stockage local / session nécessaires à l’authentification et au
            fonctionnement.
          </li>
          <li>
            Lorsque la mesure d’audience est activée (par ex.{" "}
            <strong>Vercel Analytics</strong> et, selon configuration,{" "}
            <strong>Google Analytics 4</strong>), des indicateurs{" "}
            <strong>agrégés</strong> peuvent être collectés (pages vues, type
            d’appareil de façon générale, etc.). Ces outils ne doivent pas
            recevoir le contenu privé de tes listes ou ta date prévue
            d’accouchement.
          </li>
        </ul>
      </PrivacySection>

      <PrivacySection
        id="privacy-retention"
        icon={Globe2}
        title="7. Durée de conservation"
      >
        <ul className="privacy-list">
          <li>
            Données de compte et de synchronisation :{" "}
            <strong>tant que le compte est actif</strong>.
          </li>
          <li>
            Suppression du compte depuis <strong>Profil</strong> : effacement
            côté serveur selon les délais techniques du prestataire ; copies
            locales retirées via l’app ou les paramètres de l’appareil.
          </li>
        </ul>
      </PrivacySection>

      <PrivacySection id="privacy-security" icon={Shield} title="8. Sécurité">
        <ul className="privacy-list">
          <li>
            Communications avec les serveurs en <strong>TLS/HTTPS</strong> lorsque
            le service est correctement configuré.
          </li>
          <li>
            Mots de passe gérés via le mécanisme sécurisé du prestataire
            d’authentification ; utilise un mot de passe robuste et unique.
          </li>
          <li>
            Sur Android, la sauvegarde système automatique des données de
            l’application est <strong>désactivée</strong> (
            <code>allowBackup=false</code>) pour limiter l’exposition des données
            locales.
          </li>
        </ul>
      </PrivacySection>

      <PrivacySection id="privacy-rights" icon={Scale} title="9. Tes droits (RGPD)">
        <p className="privacy-lead">
          Conformément au RGPD, tu disposes notamment des droits d’
          <strong>accès</strong>, de <strong>rectification</strong>, d’
          <strong>effacement</strong>, de <strong>limitation</strong>, d’
          <strong>opposition</strong> (dans les cas prévus) et de{" "}
          <strong>portabilité</strong>, ainsi que du droit de définir des
          directives relatives au sort de tes données après décès (selon la
          législation applicable).
        </p>
        <p className="privacy-lead">
          Tu peux <strong>supprimer ton compte et les données associées</strong>{" "}
          depuis l’application connectée, rubrique <strong>Profil</strong>{" "}
          (confirmation requise).
        </p>
        <p className="privacy-lead privacy-lead--tight">
          Pour toute autre demande : contact ci-dessous. Réclamation possible
          auprès de la <strong>CNIL</strong> (
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
            cnil.fr
          </a>
          ).
        </p>
      </PrivacySection>

      <PrivacySection id="privacy-contact" icon={Mail} title="10. Contact">
        <p className="privacy-lead">
          Pour toute question relative à cette politique ou au traitement de tes
          données personnelles :
        </p>
        <ul className="privacy-list">
          {privacyContactEmail ? (
            <li>
              <strong>E-mail :</strong>{" "}
              <a href={`mailto:${privacyContactEmail}`}>
                {privacyContactEmail}
              </a>
            </li>
          ) : (
            <li>
              <strong>E-mail :</strong> à renseigner via{" "}
              <code>VITE_PRIVACY_CONTACT_EMAIL</code> au déploiement (recommandé
              pour Play / RGPD).
            </li>
          )}
          <li>
            <strong>Fiche Google Play :</strong> les coordonnées publiques du
            développeur / de l’organisation peuvent compléter les présentes.
          </li>
          <li>
            <strong>Depuis l’application :</strong> après connexion,{" "}
            <Link to="/profile" className="privacy-inline-cta">
              Profil
            </Link>{" "}
            — compte et suppression des données.
          </li>
        </ul>
      </PrivacySection>

      <PrivacySection
        id="privacy-minors"
        icon={AlertTriangle}
        title="11. Mineurs et public cible"
      >
        <p className="privacy-lead">
          BeMyBaby s’adresse aux <strong>personnes majeures</strong> ou aux
          mineurs disposant de l’autorité parentale / du consentement requis. Le
          service n’est pas destiné aux{" "}
          <strong>enfants de moins de 13 ans</strong> comme public principal.
        </p>
      </PrivacySection>

      <PrivacySection
        id="privacy-health"
        icon={AlertTriangle}
        title="12. Données liées à la grossesse et limitation d’usage"
      >
        <p className="privacy-lead">
          Lorsque tu indiques une <strong>date prévue d’accouchement</strong> ou
          des éléments de suivi de grossesse (tâches, rappels, notes de
          rendez-vous), ces informations sont traitées pour{" "}
          <strong>personnaliser l’organisation</strong> dans l’app et peuvent
          être <strong>synchronisées</strong> avec ton compte. Elles relèvent de
          données à caractère sensible au sens des politiques des stores et, en
          UE, peuvent s’apparenter à des données concernant la santé (art. 9
          RGPD) selon le contexte — elles sont utilisées{" "}
          <strong>uniquement</strong> pour le service demandé, pas pour de la
          publicité ciblée.
        </p>
        <p className="privacy-lead">
          BeMyBaby est un <strong>outil d’organisation personnelle</strong>. Il
          ne constitue pas un dossier médical officiel, un dispositif médical ni
          un substitut aux conseils d’un{" "}
          <strong>professionnel de santé</strong> ou aux démarches
          administratives (Assurance maladie, CAF, etc.).
        </p>
        <p className="privacy-lead privacy-lead--tight">
          En cas d’urgence vitale : <strong>15</strong> (SAMU) ou services
          d’urgence appropriés.
        </p>
      </PrivacySection>

      <PrivacySection id="privacy-changes" icon={FileText} title="13. Modifications">
        <p className="privacy-lead">
          Nous pouvons mettre à jour cette politique. La{" "}
          <strong>date de dernière mise à jour</strong> en tête de page sera
          alors modifiée. Pour des changements importants, information par un
          moyen raisonnable (message in-app ou e-mail si la loi l’exige).
        </p>
      </PrivacySection>

      <p className="privacy-footer-links">
        <Link to="/" className="privacy-footer-link">
          Retour à l’accueil
        </Link>
      </p>
    </AppPage>
  );
}
