import { useEffect, useState } from "react";
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
