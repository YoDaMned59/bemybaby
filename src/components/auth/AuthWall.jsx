import { useMemo, useState, useEffect } from "react";
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
        <span className="auth-wall-brand">BeMyBaby</span>
        <h1 className="auth-wall-title">Bienvenue</h1>
        <p className="auth-wall-hook">
          Déjà utilisé pour organiser les premières listes et rendez-vous bébé.
        </p>
        <p className="auth-wall-desc">
          Organise ta grossesse et prépare l’arrivée de bébé.
        </p>
        <p className="auth-wall-desc">
          Retrouve tes listes, ton profil et tes rendez-vous partout.
        </p>

        <div className="auth-wall-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={mode === "signup"}
            className={
              mode === "signup"
                ? "auth-wall-tab auth-wall-tab--active"
                : "auth-wall-tab"
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
                ? "auth-wall-tab auth-wall-tab--active"
                : "auth-wall-tab"
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
            <label className="auth-wall-label" htmlFor="authwall-email-up">
              E-mail
            </label>
            <input
              id="authwall-email-up"
              name="beMyBabySignupEmail"
              className="auth-wall-input"
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
            <label className="auth-wall-label" htmlFor="authwall-pass-up">
              Mot de passe
            </label>
            <input
              id="authwall-pass-up"
              name="password-new"
              className="auth-wall-input"
              type="password"
              autoComplete="new-password"
              value={passUp}
              onChange={(ev) => setPassUp(ev.target.value)}
              disabled={busy}
              minLength={AUTH_MIN_PASSWORD}
              aria-label="Mot de passe choisi pour inscription"
            />
            <label className="auth-wall-label" htmlFor="authwall-pass-up2">
              Confirmer le mot de passe
            </label>
            <input
              id="authwall-pass-up2"
              name="confirm-password-new"
              className="auth-wall-input"
              type="password"
              autoComplete="new-password"
              value={passUp2}
              onChange={(ev) => setPassUp2(ev.target.value)}
              disabled={busy}
              minLength={AUTH_MIN_PASSWORD}
              aria-label="Confirmation du mot de passe"
            />
            <button
              type="submit"
              className="auth-wall-submit auth-wall-submit--primary"
              disabled={busy}
            >
              {busy ? "Patience…" : "Commencer gratuitement"}
            </button>
          </form>
        ) : (
          <form
            className="auth-wall-form"
            onSubmit={handleSignin}
            autoComplete="on"
          >
            <label className="auth-wall-label" htmlFor="authwall-email-in">
              E-mail
            </label>
            <input
              id="authwall-email-in"
              name="beMyBabyLoginEmail"
              className="auth-wall-input"
              type="email"
              inputMode="email"
              autoComplete="section-connexion username"
              value={emailIn}
              onChange={(ev) => setEmailIn(ev.target.value)}
              disabled={busy}
              aria-label="E-mail pour connexion"
            />
            <label className="auth-wall-label" htmlFor="authwall-pass-in">
              Mot de passe
            </label>
            <input
              id="authwall-pass-in"
              name="password"
              className="auth-wall-input"
              type="password"
              autoComplete="section-connexion current-password"
              value={passIn}
              onChange={(ev) => setPassIn(ev.target.value)}
              disabled={busy}
              minLength={AUTH_MIN_PASSWORD}
            />
            <button
              type="submit"
              className="auth-wall-submit auth-wall-submit--secondary"
              disabled={busy}
            >
              {busy ? "Patience…" : "Me connecter"}
            </button>
          </form>
        )}

        <p className="auth-wall-footer">
          <a href="/confidentialite">Confidentialité</a>
        </p>
      </div>
    </div>
  );
}
