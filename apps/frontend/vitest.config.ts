/// <reference types="vitest" />
import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    unstubEnvs: true,
    setupFiles: ["./test/vitest.setup.ts"],
    coverage: {
      exclude: ["src/routeTree.gen.ts", ...coverageConfigDefaults.exclude],
    },
  },
});
