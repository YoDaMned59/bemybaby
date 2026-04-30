import "./utils/ga4Bootstrap";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { registerSW } from "virtual:pwa-register";
import AppRoot from "./AppRoot";
import { isSupabaseConfigured } from "./lib/supabase";
import "./styles/index.scss";

if (import.meta.env.DEV && !isSupabaseConfigured()) {
  console.info(
    "[BeMyBaby] Dév : créer .env avec VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY (voir .env.example) pour tester l’auth et la synchro comme en prod."
  );
}

registerSW({ immediate: true });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoot />
    </BrowserRouter>
  </React.StrictMode>
);
