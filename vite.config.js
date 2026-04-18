import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["pwa-icon.svg"],
      manifest: {
        name: "BeMyBaby",
        short_name: "BeMyBaby",
        description:
          "Assistant pour suivre ta grossesse, tes listes et tes préparatifs.",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "portrait-primary",
        background_color: "#fff6f1",
        theme_color: "#8c6adf",
        lang: "fr",
        icons: [
          {
            src: "/pwa-icon.svg",
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        // Les illustrations bébé / fruit sont lourdes : pas de précache (évite l’échec du build et des Mo en cache).
        globPatterns: ["**/*.{js,css,html,ico,svg,woff2}"],
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [/^\/api\//],
      },
    }),
  ],
});
