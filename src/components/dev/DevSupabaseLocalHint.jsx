import { useState } from "react";
import { isSupabaseConfigured } from "../../lib/supabase";
import "./DevSupabaseLocalHint.scss";

/**
 * En dev sans variables Supabase : rappeler comment tester auth / synchro comme en prod.
 */
export default function DevSupabaseLocalHint() {
  const [dismissed, setDismissed] = useState(false);

  if (!import.meta.env.DEV || dismissed || isSupabaseConfigured()) {
    return null;
  }

  return (
    <div className="dev-supabase-local-hint" role="status">
      <div className="dev-supabase-local-hint-inner">
        <strong className="dev-supabase-local-hint-title">
          Tests avant prod — configuration Supabase manquante
        </strong>
        <p className="dev-supabase-local-hint-text">
          Crée un fichier <code>.env</code> à la racine du projet (copie depuis{" "}
          <code>.env.example</code>), puis renseigne au minimum{" "}
          <code>VITE_SUPABASE_URL</code> et <code>VITE_SUPABASE_ANON_KEY</code>{" "}
          (tableau Supabase → Project settings → API). Redémarre{" "}
          <code>npm run dev</code>. Tu pourras alors voir le mur inscription /
          connexion et la synchro cloud comme après déploiement. Pour imiter la
          prod (&quot;e-mail avant l&apos;app&quot;), ne définit pas{" "}
          <code>VITE_ALLOW_ANONYMOUS_BROWSING=true</code>.
        </p>
      </div>
      <button
        type="button"
        className="dev-supabase-local-hint-dismiss"
        onClick={() => setDismissed(true)}
        aria-label="Masquer cet encart"
      >
        Fermer
      </button>
    </div>
  );
}
