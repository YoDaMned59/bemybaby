import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import App from "./App";
import SupabaseStorageSyncListen from "./components/SupabaseStorageSyncListen";
import AuthWall from "./components/auth/AuthWall";
import PrivacyPage from "./pages/PrivacyPage";
import { bootstrapSupabase, signOutBeMyBaby } from "./services/supabasePersist";
import { getSupabase, isSupabaseConfigured } from "./lib/supabase";
import { userHasRegisteredEmail } from "./utils/authIdentity";
import { requiresEmailAuthGate } from "./utils/supabaseEnv";
import DevSupabaseLocalHint from "./components/dev/DevSupabaseLocalHint";
import "./components/auth/AuthWall.scss";

const analyticsOn =
  import.meta.env.PROD && import.meta.env.VITE_DISABLE_ANALYTICS !== "true";

const AUTH_ENTRY_PATH = "/compte";
const AUTH_REDIRECT_KEY = "bemybabyAuthRedirect";

function normalizePathname(pathname) {
  const p = pathname.replace(/\/+$/, "") || "/";
  return p;
}

function isConfidentialitePathOnly() {
  if (typeof window === "undefined") {
    return false;
  }
  try {
    const p = new URL(window.location.href).pathname.replace(/\/+$/, "") || "/";
    return p === "/confidentialite";
  } catch {
    return false;
  }
}

/**
 * Routage avant rendu App : vérif Auth cloud / bootstrap / sync selon env.
 */
export default function AppRoot() {
  const [phase, setPhase] = useState("checking");
  const [bootNonce, setBootNonce] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  /** URL publique d’inscription / connexion (évite /profile dans la barre d’adresse). */
  useEffect(() => {
    if (phase !== "auth" || !requiresEmailAuthGate()) {
      return;
    }
    const p = normalizePathname(location.pathname);
    if (p === "/confidentialite") {
      return;
    }
    if (p === AUTH_ENTRY_PATH) {
      return;
    }
    try {
      if (p !== "/") {
        sessionStorage.setItem(
          AUTH_REDIRECT_KEY,
          p + (location.search || "")
        );
      } else {
        sessionStorage.removeItem(AUTH_REDIRECT_KEY);
      }
    } catch {
      /* ignore */
    }
    navigate(AUTH_ENTRY_PATH, { replace: true });
  }, [phase, location.pathname, location.search, navigate]);

  /** Après session valide : restaurer la page cible ou quitter /compte (évite conflit avec les Routes). */
  useLayoutEffect(() => {
    if (phase !== "ready" || !requiresEmailAuthGate()) {
      return;
    }
    const p = normalizePathname(location.pathname);
    let target;
    try {
      target = sessionStorage.getItem(AUTH_REDIRECT_KEY);
      if (target) {
        sessionStorage.removeItem(AUTH_REDIRECT_KEY);
      }
    } catch {
      return;
    }
    if (
      typeof target === "string" &&
      target.startsWith("/") &&
      !target.startsWith("//")
    ) {
      navigate(target, { replace: true });
      return;
    }
    if (p === AUTH_ENTRY_PATH) {
      navigate("/", { replace: true });
    }
  }, [phase, location.pathname, navigate]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!isSupabaseConfigured()) {
        if (!cancelled) setPhase("ready");
        return;
      }

      const supabase = getSupabase();
      if (!supabase) {
        if (!cancelled) setPhase("ready");
        return;
      }

      const gated = requiresEmailAuthGate();

      let { data: sessWrap } = await supabase.auth.getSession();
      let session = sessWrap?.session ?? null;

      if (gated) {
        const u = session?.user;
        if (u && !userHasRegisteredEmail(u)) {
          await signOutBeMyBaby();
          session = null;
        }
        const lacksEmail =
          !session?.user || !userHasRegisteredEmail(session.user);
        if (
          lacksEmail &&
          isConfidentialitePathOnly()
        ) {
          if (!cancelled) setPhase("privacyBypass");
          return;
        }
        if (lacksEmail) {
          if (!cancelled) setPhase("auth");
          return;
        }
      }

      try {
        await bootstrapSupabase();
      } catch (e) {
        console.warn("[BeMyBaby] Supabase bootstrap :", e);
        if (!gated && !cancelled) {
          setPhase("ready");
          return;
        }
        if (!cancelled) setPhase("auth");
        return;
      }

      if (!cancelled) setPhase("ready");
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [bootNonce]);

  if (phase === "checking") {
    return (
      <div className="app-boot-splash" aria-busy="true" aria-live="polite">
        <span className="app-boot-splash-brand">BeMyBaby</span>
        <p className="app-boot-splash-text">Chargement…</p>
      </div>
    );
  }

  if (phase === "privacyBypass") {
    return (
      <>
        <PrivacyPage />
        {analyticsOn ? <Analytics /> : null}
      </>
    );
  }

  if (phase === "auth" && requiresEmailAuthGate()) {
    return (
      <AuthWall
        onAuthenticated={() =>
          setBootNonce((n) => n + 1)
        }
      />
    );
  }

  return (
    <>
      <DevSupabaseLocalHint />
      {isSupabaseConfigured() ? <SupabaseStorageSyncListen /> : null}
      <App />
      {analyticsOn ? <Analytics /> : null}
    </>
  );
}
