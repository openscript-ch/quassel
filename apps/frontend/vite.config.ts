import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tanstackRouter from "@tanstack/router-plugin/vite";
import unpluginFavicons from "@anolilab/unplugin-favicons/vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
  },
  build: {
    chunkSizeWarningLimit: 1000,
  },
  clearScreen: false,
  plugins: [
    react(),
    tanstackRouter({ quoteStyle: "double", semicolons: true }),
    unpluginFavicons({
      logo: "./public/logo.svg",
      inject: true,
      favicons: {
        appName: "LEMON",
        appShortName: "LEMON",
        theme_color: "#FFC845",
        icons: {
          android: true,
          appleIcon: true,
          favicons: true,
          windows: true,
          yandex: true,
          appleStartup: false,
        },
      },
    }),
  ],
});
