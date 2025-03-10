// @ts-check
import { defineConfig } from "astro/config";
import Icons from "unplugin-icons/vite";

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3003,
  },
  vite: {
    plugins: [Icons({ compiler: "astro" })],
  },
});
