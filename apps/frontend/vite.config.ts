import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
  },
  build: {
    chunkSizeWarningLimit: 1000,
  },
  clearScreen: false,
  plugins: [react(), TanStackRouterVite({ quoteStyle: "double", semicolons: true })],
});
