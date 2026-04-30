import { isSupabaseConfigured } from "../lib/supabase";

/** Ancien comportement : accès libre + session anonyme automatique au chargement. */
export function allowsAnonymousBrowsing() {
  return import.meta.env.VITE_ALLOW_ANONYMOUS_BROWSING === "true";
}

/** Accès réservé à un compte e-mail (signup / connexion) tant que Supabase est utilisé. */
export function requiresEmailAuthGate() {
  return isSupabaseConfigured() && !allowsAnonymousBrowsing();
}
