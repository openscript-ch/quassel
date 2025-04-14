import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
// import unpluginFavicons from "@anolilab/unplugin-favicons/vite";

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
    TanStackRouterVite({ quoteStyle: "double", semicolons: true }),
    // unpluginFavicons({
    //   logo: "./public/logo.svg",
    //   inject: true,
    //   appName: "LEMON",
    //   appShortName: "LEMON",
    //   favicons: {
    //     theme_color: "#FFC845",
    //     icons: {
    //       android: true,
    //       appleIcon: true,
    //       favicons: true,
    //       windows: true,
    //       yandex: true,
    //       appleStartup: false,
    //     },
    //   },
    // }),
  ],
});
