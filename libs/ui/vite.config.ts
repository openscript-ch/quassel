import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import packageJson from "./package.json";

export default defineConfig({
  build: {
    ssr: true,
    ssrEmitAssets: true,
    lib: {
      entry: "src/index.ts",
      name: packageJson.name,
      cssFileName: "style",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          dayjs: "dayjs",
          "dayjs/plugin/utc.js": "dayjsPluginUtc",
          react: "React",
          "react/jsx-runtime": "jsxRuntime",
          "@mantine/core": "mantineCore",
          "@mantine/dates": "mantineDates",
          "@mantine/hooks": "mantineHooks",
          "@mantine/form": "mantineForm",
          "@mantine/notifications": "mantineNotifications",
          "@tabler/icons-react/dist/esm/icons/index.mjs": "tablerIconsReact",
          "react-dsv-import": "reactDsvImport",
        },
      },
    },
  },
  plugins: [dts({ entryRoot: "src", tsconfigPath: "tsconfig.json" }), react(), svgr({ svgrOptions: { ref: true }, include: "**/*.svg?react" })],
  resolve: {
    alias: {
      // Workaround so that tabler doesn't import all icons as separate junks
      // https://github.com/tabler/tabler-icons/issues/1233#issuecomment-2428245119
      "@tabler/icons-react": "@tabler/icons-react/dist/esm/icons/index.mjs",
    },
  },
});
