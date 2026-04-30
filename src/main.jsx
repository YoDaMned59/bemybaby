import "./utils/ga4Bootstrap";
import "./utils/installPromptCapture";
import React from "react";
import ReactDOM from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import { registerSW } from "virtual:pwa-register";
import App from "./App";
import "./styles/index.scss";

registerSW({ immediate: true });

const analyticsOn =
  import.meta.env.PROD && import.meta.env.VITE_DISABLE_ANALYTICS !== "true";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      <App />
      {analyticsOn ? <Analytics /> : null}
    </>
  </React.StrictMode>
);