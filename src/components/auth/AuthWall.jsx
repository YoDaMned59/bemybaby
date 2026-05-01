import { useMemo, useState, useEffect } from "react";
import {
  Cloud,
  Eye,
  EyeOff,
  Heart,
  ListChecks,
  Lock,
  LogIn,
  Mail,
  Smartphone,
  UserPlus,
} from "lucide-react";
import { getSupabase } from "../../lib/supabase";
import {
  AUTH_MIN_PASSWORD,
  mapAuthErrorMessage,
} from "../../utils/authUiMessages";
import { clearLocalSyncedAppState } from "../../services/supabasePersist";
import { trackAppEvent } from "../../utils/appAnalytics";
import "./AuthWall.scss";

/**
 * Mur d’entrée : inscription ou connexion uniquement (sans session e-mail valide).
 */
export default function AuthWall({ onAuthenticated }) {
  const supabase = useMemo(() => getSupabase(), []);

  const [mode, setMode] = useState("signup");
  const [emailUp, setEmailUp] = useState("");
  const [passUp, setPassUp] = useState("");
  const [passUp2, setPassUp2] = useState("");
  const [emailIn, setEmailIn] = useState("");
  const [passIn, setPassIn] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [showPassUp, setShowPassUp] = useState(false);
  const [showPassUp2, setShowPassUp2] = useState(false);
  const [showPassIn, setShowPassIn] = useState(false);
  /** Évite que le navigateur pré-remplisse l’inscription avec l’identifiant connexion au premier rendu. */
  const [signupShieldAutofill, setSignupShieldAutofill] = useState(true);

  useEffect(() => {
    if (mode === "signup") {
      setSignupShieldAutofill(true);
    }
  }, [mode]);

  async function handleSignup(e) {
    e.preventDefault();
    setError("");
    setInfo("");
    if (!supabase) {
      return;
    }
    const email = emailUp.trim();
    if (!email.includes("@")) {
      setError("Indique une adresse e-mail valide.");
      return;
    }
    if (passUp.length < AUTH_MIN_PASSWORD) {
      setError(
        `Mot de passe : au moins ${AUTH_MIN_PASSWORD} caractères.`
      );
      return;
    }
    if (passUp !== passUp2) {
      setError("Les deux mots de passe ne correspondent pas.");
      return;
    }

    setBusy(true);
    try {
      const origin =
        typeof window !== "undefined"
          ? `${window.location.origin}/`
          : undefined;
      const { data, error: upErr } = await supabase.auth.signUp({
        email,
        password: passUp,
        options: origin ? { emailRedirectTo: origin } : undefined,
      });
      if (upErr) {
        setError(mapAuthErrorMessage(upErr.message));
        return;
      }
      trackAppEvent("auth_signup_submitted", {});
      if (data.session) {
        clearLocalSyncedAppState();
        onAuthenticated();
      } else {
        setInfo(
          "Consulte ta boîte e-mail : le message de confirmation peut finir dans les indésirables, dans Spam ou dans Promotions (ex. Gmail) selon ta messagerie. Clique sur le lien dans ce mail, puis reviens sur cette page pour te connecter avec ton mot de passe."
        );
      }
    } finally {
      setBusy(false);
    }
  }

  async function handleSignin(e) {
    e.preventDefault();
    setError("");
    setInfo("");
    if (!supabase) {
      return;
    }
    const email = emailIn.trim();
    if (!email.includes("@") || passIn.length < AUTH_MIN_PASSWORD) {
      setError("E-mail et mot de passe requis.");
      return;
    }
    setBusy(true);
    try {
      const { error: inErr } = await supabase.auth.signInWithPassword({
        email,
        password: passIn,
      });
      if (inErr) {
        setError(mapAuthErrorMessage(inErr.message));
        return;
      }
      trackAppEvent("auth_signin_success", {});
      onAuthenticated();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-wall">
      <div className="auth-wall-card">
        <header className="auth-wall-top">
          <div className="auth-wall-brand-row">
            <span className="auth-wall-brand">BEMYBABY</span>
            <div className="auth-wall-logo-mark" aria-hidden>
              <Heart className="auth-wall-logo-heart" strokeWidth={2} />
            </div>
          </div>

          {mode === "signup" ? (
            <div className="auth-wall-hero">
              <h1 className="auth-wall-hero-title">
                Tu attends un bébé ? Prépare tout sans rien oublier 👶
              </h1>
              <p className="auth-wall-hero-sub">
                Listes bébé, valise maternité, rendez-vous et suivi grossesse au
                même endroit.
              </p>
            </div>
          ) : (
            <div className="auth-wall-hero auth-wall-hero--compact">
              <h1 className="auth-wall-hero-title">Bon retour 👶</h1>
              <p className="auth-wall-hero-sub">
                Connecte-toi pour retrouver ton suivi.
              </p>
            </div>
          )}

          {mode === "signup" ? (
            <div
              className="auth-wall-why"
              aria-labelledby="auth-wall-why-heading"
            >
              <h2 id="auth-wall-why-heading" className="auth-wall-why-title">
                Pourquoi créer un compte ?
              </h2>
              <ul className="auth-wall-why-list">
                <li className="auth-wall-why-item">
                  <Cloud className="auth-wall-why-icon" strokeWidth={2} aria-hidden />
                  <span>Sauvegarder ton suivi</span>
                </li>
                <li className="auth-wall-why-item">
                  <ListChecks className="auth-wall-why-icon" strokeWidth={2} aria-hidden />
                  <span>Retrouver tes listes et rendez-vous</span>
                </li>
                <li className="auth-wall-why-item">
                  <Smartphone className="auth-wall-why-icon" strokeWidth={2} aria-hidden />
                  <span>Accéder à ton espace depuis tes appareils</span>
                </li>
              </ul>
            </div>
          ) : null}
        </header>

        <div className="auth-wall-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={mode === "signup"}
            className={
              mode === "signup"
                ? "auth-wall-tab auth-wall-tab--primary auth-wall-tab--active"
                : "auth-wall-tab auth-wall-tab--primary"
            }
            onClick={() => {
              setMode("signup");
              setError("");
              setInfo("");
              setEmailUp("");
              setPassUp("");
              setPassUp2("");
            }}
          >
            Inscription
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "signin"}
            className={
              mode === "signin"
                ? "auth-wall-tab auth-wall-tab--secondary auth-wall-tab--active"
                : "auth-wall-tab auth-wall-tab--secondary"
            }
            onClick={() => {
              setMode("signin");
              setError("");
              setInfo("");
            }}
          >
            Connexion
          </button>
        </div>

        <p className="auth-wall-reassurance">
          Gratuit • Sans engagement • Données sécurisées
        </p>

        {error ? (
          <p className="auth-wall-alert auth-wall-alert--error" role="alert">
            {error}
          </p>
        ) : null}
        {info ? (
          <p className="auth-wall-alert auth-wall-alert--info" role="status">
            {info}
          </p>
        ) : null}

        {mode === "signup" ? (
          <form
            className="auth-wall-form"
            onSubmit={handleSignup}
            autoComplete="off"
          >
            <div className="auth-wall-field">
              <label className="auth-wall-label" htmlFor="authwall-email-up">
                E-mail
              </label>
              <div className="auth-wall-input-wrap">
                <input
                  id="authwall-email-up"
                  name="beMyBabySignupEmail"
                  className="auth-wall-input auth-wall-input--trail"
                  type="email"
                  inputMode="email"
                  autoComplete="section-inscription email"
                  value={emailUp}
                  readOnly={signupShieldAutofill}
                  onChange={(ev) => setEmailUp(ev.target.value)}
                  onFocus={() => {
                    if (signupShieldAutofill) {
                      setSignupShieldAutofill(false);
                    }
                  }}
                  disabled={busy}
                  aria-label="E-mail pour inscription"
                />
                <span className="auth-wall-input-affix" aria-hidden>
                  <Mail size={18} strokeWidth={2} />
                </span>
              </div>
            </div>
            <div className="auth-wall-field">
              <label className="auth-wall-label" htmlFor="authwall-pass-up">
                Mot de passe
              </label>
              <div className="auth-wall-input-wrap">
                <input
                  id="authwall-pass-up"
                  name="password-new"
                  className="auth-wall-input auth-wall-input--trail"
                  type={showPassUp ? "text" : "password"}
                  autoComplete="new-password"
                  value={passUp}
                  onChange={(ev) => setPassUp(ev.target.value)}
                  disabled={busy}
                  minLength={AUTH_MIN_PASSWORD}
                  aria-label="Mot de passe choisi pour inscription"
                />
                <button
                  type="button"
                  className="auth-wall-input-toggle"
                  onClick={() => setShowPassUp((v) => !v)}
                  disabled={busy}
                  aria-label={
                    showPassUp ? "Masquer le mot de passe" : "Afficher le mot de passe"
                  }
                >
                  {showPassUp ? (
                    <EyeOff size={18} strokeWidth={2} />
                  ) : (
                    <Eye size={18} strokeWidth={2} />
                  )}
                </button>
              </div>
            </div>
            <div className="auth-wall-field">
              <label className="auth-wall-label" htmlFor="authwall-pass-up2">
                Confirmer le mot de passe
              </label>
              <div className="auth-wall-input-wrap">
                <input
                  id="authwall-pass-up2"
                  name="confirm-password-new"
                  className="auth-wall-input auth-wall-input--trail"
                  type={showPassUp2 ? "text" : "password"}
                  autoComplete="new-password"
                  value={passUp2}
                  onChange={(ev) => setPassUp2(ev.target.value)}
                  disabled={busy}
                  minLength={AUTH_MIN_PASSWORD}
                  aria-label="Confirmation du mot de passe"
                />
                <button
                  type="button"
                  className="auth-wall-input-toggle"
                  onClick={() => setShowPassUp2((v) => !v)}
                  disabled={busy}
                  aria-label={
                    showPassUp2
                      ? "Masquer la confirmation du mot de passe"
                      : "Afficher la confirmation du mot de passe"
                  }
                >
                  {showPassUp2 ? (
                    <EyeOff size={18} strokeWidth={2} />
                  ) : (
                    <Eye size={18} strokeWidth={2} />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="auth-wall-submit"
              disabled={busy}
            >
              <UserPlus className="auth-wall-submit-icon" size={20} strokeWidth={2} aria-hidden />
              {busy ? "Patience…" : "Créer mon compte gratuitement"}
            </button>
            <p className="auth-wall-form-hint">
              Inscription en moins de 30 secondes
            </p>
          </form>
        ) : (
          <form
            className="auth-wall-form"
            onSubmit={handleSignin}
            autoComplete="on"
          >
            <div className="auth-wall-field">
              <label className="auth-wall-label" htmlFor="authwall-email-in">
                E-mail
              </label>
              <div className="auth-wall-input-wrap">
                <input
                  id="authwall-email-in"
                  name="beMyBabyLoginEmail"
                  className="auth-wall-input auth-wall-input--trail"
                  type="email"
                  inputMode="email"
                  autoComplete="section-connexion username"
                  value={emailIn}
                  onChange={(ev) => setEmailIn(ev.target.value)}
                  disabled={busy}
                  aria-label="E-mail pour connexion"
                />
                <span className="auth-wall-input-affix" aria-hidden>
                  <Mail size={18} strokeWidth={2} />
                </span>
              </div>
            </div>
            <div className="auth-wall-field">
              <label className="auth-wall-label" htmlFor="authwall-pass-in">
                Mot de passe
              </label>
              <div className="auth-wall-input-wrap">
                <input
                  id="authwall-pass-in"
                  name="password"
                  className="auth-wall-input auth-wall-input--trail"
                  type={showPassIn ? "text" : "password"}
                  autoComplete="section-connexion current-password"
                  value={passIn}
                  onChange={(ev) => setPassIn(ev.target.value)}
                  disabled={busy}
                  minLength={AUTH_MIN_PASSWORD}
                />
                <button
                  type="button"
                  className="auth-wall-input-toggle"
                  onClick={() => setShowPassIn((v) => !v)}
                  disabled={busy}
                  aria-label={
                    showPassIn ? "Masquer le mot de passe" : "Afficher le mot de passe"
                  }
                >
                  {showPassIn ? (
                    <EyeOff size={18} strokeWidth={2} />
                  ) : (
                    <Eye size={18} strokeWidth={2} />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="auth-wall-submit"
              disabled={busy}
            >
              <LogIn className="auth-wall-submit-icon" size={20} strokeWidth={2} aria-hidden />
              {busy ? "Patience…" : "Me connecter"}
            </button>
          </form>
        )}

        <div className="auth-wall-trust">
          <span>✓ Aucun spam</span>
          <span className="auth-wall-trust-sep" aria-hidden>
            ·
          </span>
          <span>♡ Gratuit</span>
          <span className="auth-wall-trust-sep" aria-hidden>
            ·
          </span>
          <span>🗑️ Supprime ton compte quand tu veux</span>
        </div>

        <p className="auth-wall-privacy">
          <Lock className="auth-wall-privacy-icon" size={14} strokeWidth={2} aria-hidden />
          <span>
            Nous protégeons tes données et ne les partageons jamais.{" "}
            <a href="/confidentialite">Voir notre Politique de confidentialité ›</a>
          </span>
        </p>
      </div>
    </div>
  );
}
