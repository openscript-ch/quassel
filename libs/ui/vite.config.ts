import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";
import packageJson from "./package.json";

export default defineConfig({
  build: {
    ssr: true,
    ssrEmitAssets: true,
    lib: {
      entry: "src/index.ts",
      name: packageJson.name,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react/jsx-runtime": "jsxRuntime",
          "@mantine/core": "mantineCore",
          "@tabler/icons-react": "tablerIconsReact",
        },
      },
    },
  },
  plugins: [dts({ entryRoot: "src" }), react()],
});
