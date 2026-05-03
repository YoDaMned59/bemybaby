import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

/** Build embarqué dans l’APK Capacitor : chemins relatifs obligatoires. Le déploiement web (Vercel) garde `base: "/"`. */
const forCapacitor = process.env.VITE_CAPACITOR === "1";
const asset = (file) => (forCapacitor ? file : `/${file}`);

// https://vite.dev/config/
export default defineConfig({
  base: forCapacitor ? "./" : "/",
  /** Permet d’utiliser sur Vercel les noms NEXT_PUBLIC_* (intégration Supabase Next) en plus de VITE_*. */
  envPrefix: ["VITE_", "NEXT_PUBLIC_"],
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["pwa-icon.svg", "pwa-192.png", "pwa-512.png"],
      manifest: {
        name: "BeMyBaby",
        short_name: "BeMyBaby",
        description:
          "Assistant pour suivre ta grossesse, tes listes et tes préparatifs.",
        start_url: forCapacitor ? "./" : "/",
        scope: forCapacitor ? "./" : "/",
        display: "standalone",
        orientation: "portrait-primary",
        background_color: "#fff6f1",
        theme_color: "#8c6adf",
        lang: "fr",
        icons: [
          {
            src: asset("pwa-192.png"),
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: asset("pwa-512.png"),
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: asset("pwa-512.png"),
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: asset("pwa-icon.svg"),
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "any",
          },
        ],
      },
      workbox: {
        // Les illustrations bébé / fruit sont lourdes : pas de précache (évite l’échec du build et des Mo en cache).
        globPatterns: ["**/*.{js,css,html,ico,svg,woff2}"],
        navigateFallback: forCapacitor ? "index.html" : "/index.html",
        navigateFallbackDenylist: [/^\/api\//],
      },
    }),
  ],
});
