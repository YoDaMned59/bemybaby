import { Link } from "react-router-dom";
import { isSupabaseConfigured } from "../../lib/supabase";
import { requiresEmailAuthGate } from "../../utils/supabaseEnv";

/**
 * Rendre visibles l’inscription / connexion (sur /profil) quand ce n’est pas imposé avant l’app.
 */
export default function DashboardAuthTeaser() {
  const configured = isSupabaseConfigured();
  const isDev = import.meta.env.DEV;

  if (requiresEmailAuthGate()) {
    return null;
  }

  if (!configured) {
    if (!isDev) {
      return null;
    }
    return (
      <section
        className="dashboard-section dashboard-auth-teaser dashboard-auth-teaser--dev"
        aria-label="Aide développeur"
      >
        <p className="dashboard-auth-teaser-text">
          <strong>Mode dev :</strong> l’accueil s’affiche sans Supabase. Consulte{" "}
          <strong>l’encart jaune en haut de l’écran</strong>, ou copie{" "}
          <code className="dashboard-auth-code">.env.example</code> vers{" "}
          <code className="dashboard-auth-code">.env</code> avec{" "}
          <code className="dashboard-auth-code">VITE_SUPABASE_URL</code> et la clé
          anon, puis <strong>redémarre</strong>{" "}
          <code className="dashboard-auth-code">npm run dev</code> pour retrouver la
          page connexion avant l’app comme en prod. Sinon le formulaire compte reste sous{" "}
          <strong>Profil</strong>.
        </p>
        <Link to="/profile" className="dashboard-auth-teaser-cta">
          Ouvrir Profil
        </Link>
      </section>
    );
  }

  return (
    <section
      className="dashboard-section dashboard-auth-teaser"
      aria-labelledby="dashboard-auth-title"
    >
      <h2 id="dashboard-auth-title">
        Compte &amp; autre téléphone 📱
      </h2>
      <p className="dashboard-auth-teaser-text">
        Crée un compte avec ton e-mail ou connecte-toi : le formulaire est sur{" "}
        <strong>Profil</strong> (icône en bas à droite). Ça conserve ta session
        actuelle avec la sauvegarde cloud Supabase.
      </p>
      <Link to="/profile" className="dashboard-profile-teaser-button">
        Créer un compte ou me connecter
      </Link>
    </section>
  );
}
