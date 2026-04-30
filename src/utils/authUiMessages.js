export const AUTH_MIN_PASSWORD = 6;

export function mapAuthErrorMessage(message) {
  const m = typeof message === "string" ? message.toLowerCase() : "";
  if (
    m.includes("failed to fetch") ||
    m.includes("networkerror") ||
    m.includes("network request failed") ||
    m.includes("load failed") ||
    m.includes("networkerror when attempting to fetch")
  ) {
    return (
      "Connexion impossible au serveur (réseau ou adresse du projet). " +
      "Vérifie ta connexion Internet, désactive un bloqueur de pubs / pare-feu agressif, " +
      "puis copie-colle l’URL exacte « Project URL » depuis Supabase → Project Settings → API " +
      "(elle doit ressembler à https://xxxx.supabase.co) dans VITE_SUPABASE_URL, " +
      "redémarre npm run dev et réessaie."
    );
  }
  if (
    m.includes("already been registered") ||
    m.includes("user already registered") ||
    m.includes("already registered") ||
    m.includes("user already exists")
  ) {
    return "Cette adresse est déjà utilisée — connecte-toi avec ton mot de passe.";
  }
  if (m.includes("invalid login credentials")) {
    return "E-mail ou mot de passe incorrect.";
  }
  if (m.includes("email not confirmed")) {
    return "Confirme d’abord ton adresse via le lien reçu par e-mail, puis réessaie.";
  }
  if (
    m.includes("rate limit") ||
    m.includes("429") ||
    m.includes("too many requests")
  ) {
    return (
      "Trop de demandes envoyées depuis ton réseau (protection anti-abus Supabase). " +
      "À la maison, le téléphone et l’ordinateur sur le même Wi‑Fi partagent souvent la même adresse Internet : les inscriptions comptent donc ensemble — d’où « le même problème » pour deux personnes. " +
      "Attends environ 30 à 60 minutes sans recliquer en boucle sur « Inscription », ou passe un des deux téléphones en 4G/5G pour avoir une IP différente. " +
      "Dans Supabase Dashboard, regarde aussi Auth (limites / captcha) si tu tests beaucoup en prod."
    );
  }
  if (m.includes("password")) {
    return "Mot de passe refusé par le serveur (longueur ou règles).";
  }
  return typeof message === "string" && message.trim()
    ? message
    : "Une erreur est survenue. Réessaie dans un instant.";
}
