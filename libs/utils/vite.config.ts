import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import packageJson from "./package.json";

export default defineConfig({
  build: {
    ssr: true,
    lib: {
      entry: "src/index.ts",
      name: packageJson.name,
    },
    rollupOptions: {
      output: {
        globals: {
          dayjs: "dayjs",
          "dayjs/plugin/utc.js": "dayjsPluginUtc",
          "dayjs/plugin/customParseFormat.js": "dayjsPluginCustomParseFormat",
        },
      },
    },
  },
  plugins: [dts({ entryRoot: "src", tsconfigPath: "tsconfig.json" })],
});
