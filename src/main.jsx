import "./utils/ga4Bootstrap";
import "./utils/installPromptCapture";
import React from "react";
import ReactDOM from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import { registerSW } from "virtual:pwa-register";
import App from "./App";
import SupabaseStorageSyncListen from "./components/SupabaseStorageSyncListen";
import { isSupabaseConfigured } from "./lib/supabase";
import { bootstrapSupabase } from "./services/supabasePersist";
import "./styles/index.scss";

registerSW({ immediate: true });

const analyticsOn =
  import.meta.env.PROD && import.meta.env.VITE_DISABLE_ANALYTICS !== "true";

async function start() {
  try {
    if (isSupabaseConfigured()) {
      await bootstrapSupabase();
    }
  } catch (e) {
    console.warn("[BeMyBaby] Supabase désactivée ou inaccessible :", e);
  }

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <>
        <SupabaseStorageSyncListen />
        <App />
        {analyticsOn ? <Analytics /> : null}
      </>
    </React.StrictMode>
  );
}

start();
