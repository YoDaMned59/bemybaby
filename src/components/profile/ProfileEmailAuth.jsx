import { LogOut } from "lucide-react";
import { useCallback, useState } from "react";
import { isSupabaseConfigured } from "../../lib/supabase";
import { useSupabaseSession } from "../../hooks/useSupabaseSession";
import {
  isLikelyAnonymousUser,
  userHasRegisteredEmail,
} from "../../utils/authIdentity";
import {
  AUTH_MIN_PASSWORD,
  mapAuthErrorMessage,
} from "../../utils/authUiMessages";
import { trackAppEvent } from "../../utils/appAnalytics";
import "./ProfileEmailAuth.scss";

export default function ProfileEmailAuth() {
  const configured = isSupabaseConfigured();
  const { supabase, session, loading } = useSupabaseSession();

  const [emailUp, setEmailUp] = useState("");
  const [passUp, setPassUp] = useState("");
  const [passUp2, setPassUp2] = useState("");
  const [emailIn, setEmailIn] = useState("");
  const [passIn, setPassIn] = useState("");
  const [signInOpen, setSignInOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [successUp, setSuccessUp] = useState("");

  const user = session?.user ?? null;
  const hasEmail = userHasRegisteredEmail(user);
  const isAnon = isLikelyAnonymousUser(user);

  const resetMessages = useCallback(() => {
    setError("");
    setSuccessUp("");
  }, []);

  const handleAttachAccount = useCallback(
    async (e) => {
      e.preventDefault();
      if (!supabase || !isAnon) {
        return;
      }
      resetMessages();
      const email = emailUp.trim();
      if (!email || !email.includes("@")) {
        setError("Indique une adresse e-mail valide.");
        return;
      }
      if (
        passUp.length < AUTH_MIN_PASSWORD ||
        passUp2.length < AUTH_MIN_PASSWORD
      ) {
        setError(
          `Choisis un mot de passe d’au moins ${AUTH_MIN_PASSWORD} caractères.`
        );
        return;
      }
      if (passUp !== passUp2) {
        setError("Les deux mots de passe ne correspondent pas.");
        return;
      }

      setBusy(true);
      try {
        const { error: upErr } = await supabase.auth.updateUser({
          email,
          password: passUp,
        });
        if (upErr) {
          setError(mapAuthErrorMessage(upErr.message));
          return;
        }
        trackAppEvent("account_email_linked", {});
        setSuccessUp(
          "Compte créé à partir de ta session actuelle — tes données restent sur cette fiche utilisateur. Si la confirmation par e-mail est activée sur le projet, ouvre ta boîte mail et valide le lien."
        );
        setEmailUp("");
        setPassUp("");
        setPassUp2("");
      } finally {
        setBusy(false);
      }
    },
    [supabase, isAnon, emailUp, passUp, passUp2, resetMessages]
  );

  const handleSignIn = useCallback(
    async (e) => {
      e.preventDefault();
      if (!supabase) {
        return;
      }
      resetMessages();
      const email = emailIn.trim();
      if (!email || passIn.length < AUTH_MIN_PASSWORD) {
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
        window.location.reload();
      } finally {
        setBusy(false);
      }
    },
    [supabase, emailIn, passIn, resetMessages]
  );

  const handleSignOut = useCallback(async () => {
    if (!supabase) {
      return;
    }
    resetMessages();
    setBusy(true);
    try {
      await supabase.auth.signOut();
      window.location.reload();
    } finally {
      setBusy(false);
    }
  }, [supabase, resetMessages]);

  if (!configured || !supabase) {
    return null;
  }

  if (loading) {
    return (
      <section
        className="profile-email-auth profile-email-auth--loading"
        aria-hidden="true"
      >
        <p className="profile-email-auth-lead">Chargement du compte…</p>
      </section>
    );
  }

  if (hasEmail) {
    return (
      <section
        className="profile-email-auth profile-email-auth--signout-only"
        aria-label="Fin de session"
      >
        <button
          type="button"
          className="profile-email-auth-signout"
          onClick={handleSignOut}
          disabled={busy}
        >
          <LogOut className="profile-email-auth-signout-icon" aria-hidden />
          <span>{busy ? "Déconnexion…" : "Se déconnecter"}</span>
        </button>
      </section>
    );
  }

  return (
    <section
      className="profile-email-auth"
      aria-label="Compte et sauvegarde cloud"
    >
      {error ? (
        <p className="profile-email-auth-message profile-email-auth-message--error" role="alert">
          {error}
        </p>
      ) : null}
      {successUp ? (
        <p className="profile-email-auth-message profile-email-auth-message--success" role="status">
          {successUp}
        </p>
      ) : null}

      {isAnon ? (
        <>
          <form className="profile-email-auth-form" onSubmit={handleAttachAccount}>
            <p className="profile-email-auth-form-title">Créer mon compte</p>
            <div className="profile-email-auth-field">
              <label htmlFor="auth-email-up">E-mail</label>
              <input
                id="auth-email-up"
                type="email"
                autoComplete="email"
                value={emailUp}
                onChange={(ev) => setEmailUp(ev.target.value)}
                disabled={busy}
              />
            </div>
            <div className="profile-email-auth-field">
              <label htmlFor="auth-pass-up">Mot de passe</label>
              <input
                id="auth-pass-up"
                type="password"
                autoComplete="new-password"
                value={passUp}
                onChange={(ev) => setPassUp(ev.target.value)}
                disabled={busy}
                minLength={AUTH_MIN_PASSWORD}
              />
            </div>
            <div className="profile-email-auth-field">
              <label htmlFor="auth-pass-up2">Confirmer le mot de passe</label>
              <input
                id="auth-pass-up2"
                type="password"
                autoComplete="new-password"
                value={passUp2}
                onChange={(ev) => setPassUp2(ev.target.value)}
                disabled={busy}
                minLength={AUTH_MIN_PASSWORD}
              />
            </div>
            <button
              type="submit"
              className="profile-email-auth-button profile-email-auth-button--primary"
              disabled={busy}
            >
              {busy ? "Patience…" : "Créer mon compte avec cet e-mail"}
            </button>
          </form>

          <details
            className="profile-email-auth-details"
            open={signInOpen}
            onToggle={(ev) => setSignInOpen(ev.target.open)}
          >
            <summary className="profile-email-auth-summary">
              J’ai déjà un compte
            </summary>
            <form className="profile-email-auth-form" onSubmit={handleSignIn}>
              <div className="profile-email-auth-field">
                <label htmlFor="auth-email-in">E-mail</label>
                <input
                  id="auth-email-in"
                  type="email"
                  autoComplete="username"
                  value={emailIn}
                  onChange={(ev) => setEmailIn(ev.target.value)}
                  disabled={busy}
                />
              </div>
              <div className="profile-email-auth-field">
                <label htmlFor="auth-pass-in">Mot de passe</label>
                <input
                  id="auth-pass-in"
                  type="password"
                  autoComplete="current-password"
                  value={passIn}
                  onChange={(ev) => setPassIn(ev.target.value)}
                  disabled={busy}
                  minLength={AUTH_MIN_PASSWORD}
                />
              </div>
              <button
                type="submit"
                className="profile-email-auth-button profile-email-auth-button--secondary"
                disabled={busy}
              >
                {busy ? "Patience…" : "Se connecter"}
              </button>
            </form>
          </details>
        </>
      ) : null}

      {!isAnon ? (
        <p className="profile-email-auth-lead profile-email-auth-lead--muted">
          Session sans e-mail détectée. Recharge la page ou contacte le support
          si le problème persiste.
        </p>
      ) : null}
    </section>
  );
}
