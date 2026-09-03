import "./utils/ga4Bootstrap";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoot from "./app/AppRoot";
import { isSupabaseConfigured } from "./lib/supabase";
import "./styles/index.scss";

const isCapacitorBuild = import.meta.env.VITE_CAPACITOR === "1";

if (import.meta.env.DEV && !isSupabaseConfigured()) {
  console.info(
    "[BeMyBaby] Dév : créer .env avec VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY (voir .env.example) pour tester l’auth et la synchro comme en prod."
  );
}

/** Service worker PWA : web only — évite les caches bizarres dans la WebView Capacitor. */
if (!isCapacitorBuild) {
  import("virtual:pwa-register")
    .then(({ registerSW }) => {
      registerSW({ immediate: true });
    })
    .catch(() => {
      /* build sans plugin PWA */
    });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoot />
    </BrowserRouter>
  </React.StrictMode>
);
