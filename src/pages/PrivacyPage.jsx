import { createElement } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppPage from "../components/page/AppPage";
import StackedPageHeader from "../components/page/StackedPageHeader";
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
const POLICY_LAST_UPDATED = "4 mai 2026";

const VERCEL_PRIVACY = "https://vercel.com/legal/privacy-policy";
const SUPABASE_PRIVACY = "https://supabase.com/privacy";

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
  const privacyContactEmail =
    typeof import.meta.env.VITE_PRIVACY_CONTACT_EMAIL === "string"
      ? import.meta.env.VITE_PRIVACY_CONTACT_EMAIL.trim()
      : "";

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

      <div className="privacy-callout privacy-callout--access" role="region" aria-label="Accès au service">
        <p className="privacy-callout-lead">
          <UserCheck className="privacy-callout-icon" size={20} strokeWidth={2} aria-hidden />
          <span>
            <strong>Accès à l’application :</strong> l’utilisation de BeMyBaby nécessite la{" "}
            <strong>création d’un compte</strong> (adresse e-mail et mot de passe) ou une{" "}
            <strong>connexion</strong> avec un compte existant. Aucun accès aux fonctionnalités
            principales n’est possible sans authentification.
          </span>
        </p>
      </div>

      <PrivacySection id="privacy-controller" icon={FileText} title="1. Responsable du traitement">
        <p className="privacy-lead">
          Le responsable du traitement des données personnelles collectées via l’application et les
          services associés BeMyBaby est <strong>l’éditeur de l’application</strong>, tel qu’identifié
          sur la fiche du distributeur (Google Play) et, le cas échéant, sur le site officiel du
          service.
        </p>
        <p className="privacy-lead privacy-lead--tight">
          Les traitements décrits ci-dessous visent la fourniture du service (suivi personnalisé,
          listes, rendez-vous, synchronisation du compte) et l’amélioration de la sécurité et de la
          qualité du produit.
        </p>
      </PrivacySection>

      <PrivacySection id="privacy-data" icon={Database} title="2. Données collectées">
        <ul className="privacy-list">
          <li>
            <strong>Données de compte :</strong> adresse e-mail, mot de passe (traité par le
            prestataire d’authentification sous forme sécurisée — nous ne stockons pas ton mot de
            passe en clair), identifiants techniques de session, date de création du compte.
          </li>
          <li>
            <strong>Données d’usage du service :</strong> contenus que tu saisis dans l’application
            pour ton usage personnel — par exemple éléments de <strong>profil</strong>,{" "}
            <strong>listes</strong>, <strong>rendez-vous</strong> et données associées nécessaires au
            fonctionnement des fonctionnalités.
          </li>
          <li>
            <strong>Données techniques :</strong> informations relatives à l’appareil ou au
            navigateur pouvant être traitées dans un cadre strictement nécessaire (sécurité,
            débogage côté infrastructure) ou agrégées pour la mesure d’audience lorsque celle-ci est
            activée.
          </li>
        </ul>
      </PrivacySection>

      <PrivacySection id="privacy-purposes" icon={Heart} title="3. Finalités et bases légales">
        <ul className="privacy-list">
          <li>
            <strong>Exécution du contrat / service demandé :</strong> création et gestion du compte,
            sauvegarde et synchronisation de tes contenus, affichage dans l’application.
          </li>
          <li>
            <strong>Intérêt légitime :</strong> mesure d’audience agrégée et anonymisée (lorsqu’elle
            est active), sécurisation des comptes, prévention des abus, amélioration de la stabilité
            du service — dans le respect du principe de minimisation.
          </li>
          <li>
            <strong>Obligations légales :</strong> conservation ou communication de certaines
            informations si la loi l’exige (ex. réponse aux autorités compétentes sur requête
            valable).
          </li>
        </ul>
      </PrivacySection>

      <PrivacySection id="privacy-hosting" icon={Cloud} title="4. Hébergement, sous-traitants et transferts">
        <ul className="privacy-list">
          <li>
            Les données liées au compte et à la synchronisation peuvent être hébergées et traitées
            via l’infrastructure <strong>Supabase</strong>. Tu peux consulter la politique de
            confidentialité du prestataire ici :{" "}
            <a href={SUPABASE_PRIVACY} target="_blank" rel="noopener noreferrer">
              supabase.com/privacy
            </a>{" "}
            (langue principale : anglais). Les données peuvent être traitées dans l’Union
            européenne et/ou, le cas échéant, hors UE avec garanties appropriées (clauses
            contractuelles types ou mécanismes reconnus).
          </li>
          <li>
            L’application web peut être déployée sur <strong>Vercel</strong>. En cas d’activation de
            la mesure d’audience Vercel :{" "}
            <a href={VERCEL_PRIVACY} target="_blank" rel="noopener noreferrer">
              vercel.com/legal/privacy-policy
            </a>
            .
          </li>
          <li>
            Nous ne <strong>vendons pas</strong> tes données personnelles. Aucun profil publicitaire
            n’est construit à partir du détail de tes listes ou de ton contenu personnel à des fins
            de ciblage publicitaire tiers.
          </li>
        </ul>
      </PrivacySection>

      <PrivacySection id="privacy-local" icon={Lock} title="5. Stockage local et compte">
        <ul className="privacy-list">
          <li>
            Des informations peuvent être conservées <strong>localement</strong> sur ton appareil
            (navigateur ou application) pour le fonctionnement hors ligne ou la rapidité d’affichage.
          </li>
          <li>
            Avec un <strong>compte authentifié</strong> et la synchronisation activée, une copie de
            tes données peut être associée à ton compte sur l’infrastructure décrite ci-dessus, afin
            que tu puisses retrouver ton suivi après connexion depuis un autre appareil.
          </li>
          <li>
            Sans compte ou sans synchronisation, certaines données peuvent ne pas être récupérables
            en cas de changement d’appareil ou de réinitialisation.
          </li>
        </ul>
      </PrivacySection>

      <PrivacySection id="privacy-analytics" icon={BarChart3} title="6. Cookies, mesure d’audience et traceurs">
        <ul className="privacy-list">
          <li>
            Sur la version web, des technologies équivalentes aux cookies (stockage local,
            identifiants de session nécessaires à l’authentification) peuvent être utilisées pour le
            fonctionnement du service.
          </li>
          <li>
            Lorsque la mesure d’audience est activée (par ex. <strong>Vercel Analytics</strong> et,
            selon configuration, <strong>Google Analytics 4</strong>), des indicateurs{" "}
            <strong>agrégés</strong> (pages consultées, type d’appareil de façon générale,
            répartition géographique approximative, etc.) peuvent être collectés. Ces outils ne
            doivent pas être utilisés pour reconstituer le contenu privé de ton application (listes,
            rendez-vous détaillés, etc.).
          </li>
        </ul>
      </PrivacySection>

      <PrivacySection id="privacy-retention" icon={Globe2} title="7. Durée de conservation">
        <ul className="privacy-list">
          <li>
            Les données de compte et de synchronisation sont conservées <strong>tant que le compte
            est actif</strong>.
          </li>
          <li>
            Lorsque tu demandes la <strong>suppression du compte</strong> depuis l’application
            (fonction prévue dans la section Profil, avec confirmation), les données associées au
            compte côté serveur sont effacées selon les délais techniques du prestataire ; les copies
            locales sur l’appareil peuvent être effacées via l’application ou les paramètres du
            terminal.
          </li>
          <li>
            Certaines traces techniques (journaux sécurité, sauvegardes chiffrées à durée limitée)
            peuvent persister brièvement chez les sous-traitants avant purge automatique.
          </li>
        </ul>
      </PrivacySection>

      <PrivacySection id="privacy-security" icon={Shield} title="8. Sécurité">
        <ul className="privacy-list">
          <li>
            Les communications avec les serveurs utilisent des protocoles chiffrés (
            <strong>TLS/HTTPS</strong>) lorsque le service est correctement configuré.
          </li>
          <li>
            Les mots de passe sont gérés via le mécanisme sécurisé du prestataire d’authentification ;
            nous t’invitons à utiliser un mot de passe robuste et unique.
          </li>
          <li>
            Aucune mesure de sécurité n’étant absolue, nous travaillons à réduire les risques dans la
            limite des moyens raisonnables d’un service de cette taille.
          </li>
        </ul>
      </PrivacySection>

      <PrivacySection id="privacy-rights" icon={Scale} title="9. Tes droits (RGPD)">
        <p className="privacy-lead">
          Conformément au RGPD, tu disposes notamment des droits d’<strong>accès</strong>, de{" "}
          <strong>rectification</strong>, d’<strong>effacement</strong>, de{" "}
          <strong>limitation</strong>, d’<strong>opposition</strong> (dans les cas prévus par la loi)
          et de <strong>portabilité</strong> des données tu fournies, ainsi que du droit de définir
          des directives relatives au sort de tes données après décès (selon la législation
          applicable).
        </p>
        <p className="privacy-lead">
          Tu peux <strong>supprimer ton compte et les données associées</strong> depuis l’application
          connectée, rubrique <strong>Profil</strong> (fonction de désinscription / suppression des
          données, avec étape de confirmation).
        </p>
        <p className="privacy-lead privacy-lead--tight">
          Pour toute autre demande relative à tes droits, tu peux nous contacter via les coordonnées
          ci-dessous. Tu peux aussi introduire une réclamation auprès de l’autorité de contrôle
          compétente (en France : la <strong>CNIL</strong>,{" "}
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
            cnil.fr
          </a>
          ).
        </p>
      </PrivacySection>

      <PrivacySection id="privacy-contact" icon={Mail} title="10. Contact">
        <p className="privacy-lead">
          Pour toute question relative à cette politique ou au traitement de tes données personnelles :
        </p>
        <ul className="privacy-list">
          {privacyContactEmail ? (
            <li>
              <strong>E-mail :</strong>{" "}
              <a href={`mailto:${privacyContactEmail}`}>{privacyContactEmail}</a>
            </li>
          ) : null}
          <li>
            <strong>Fiche Google Play / informations développeur :</strong> les coordonnées
            publiques figurant sur la page de l’application peuvent compléter les présentes.
          </li>
          <li>
            <strong>Depuis l’application :</strong> après connexion, la section{" "}
            <Link to="/profile" className="privacy-inline-cta">
              Profil
            </Link>{" "}
            centralise les actions liées au compte et à la suppression des données.
          </li>
        </ul>
      </PrivacySection>

      <PrivacySection id="privacy-minors" icon={AlertTriangle} title="11. Mineurs et public cible">
        <p className="privacy-lead">
          BeMyBaby s’adresse aux <strong>personnes majeures</strong> ou aux mineurs disposant de
          l’autorité parentale ou du consentement requis pour créer un compte et utiliser un service
          numérique de ce type. Le service n’est pas destiné aux{" "}
          <strong>enfants de moins de 13 ans</strong> comme public principal.
        </p>
        <p className="privacy-lead privacy-lead--tight">
          Si tu es parent ou responsable légal et penses qu’un mineur nous a transmis des données sans
          droit, contacte-nous pour que nous puissions prendre les mesures appropriées.
        </p>
      </PrivacySection>

      <PrivacySection id="privacy-health" icon={AlertTriangle} title="12. Données de santé et limitation d’usage">
        <p className="privacy-lead">
          BeMyBaby est un <strong>outil d’organisation personnelle</strong> (listes, rappels,
          suivi). Il ne constitue pas un dossier médical officiel, un dispositif médical ni un
          substitut aux conseils d’un <strong>professionnel de santé</strong> ou aux démarches
          administratives (Assurance maladie, CAF, etc.).
        </p>
        <p className="privacy-lead privacy-lead--tight">
          En cas d’urgence vitale, contacte le <strong>15</strong> (SAMU) ou les services d’urgence
          appropriés.
        </p>
      </PrivacySection>

      <PrivacySection id="privacy-changes" icon={FileText} title="13. Modifications">
        <p className="privacy-lead">
          Nous pouvons mettre à jour cette politique pour refléter l’évolution du service, des
          obligations légales ou des pratiques de traitement. La <strong>date de dernière mise à
          jour</strong> figurant en tête de page sera alors modifiée. Pour des changements importants,
          nous pourrons t’en informer par un moyen raisonnable (par ex. message dans l’application ou
          e-mail si la loi l’exige).
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
