function getEnv(key: keyof Exclude<typeof window.env, undefined>) {
  if (window.env === undefined) return;
  if (window.env[key]?.startsWith("//")) return;

  return window.env[key];
}

export const C = {
  env: {
    apiUrl: getEnv("apiUrl") || "http://localhost:3000",
  },
  ui: {
    maxDropdownHeight: 800,
  },
};
