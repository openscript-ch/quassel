function getEnv(key: keyof Exclude<typeof window.env, undefined>) {
  if (window.env === undefined) return;
  if (window.env[key]?.startsWith("$")) return;

  return window.env[key];
}

export const C = {
  env: {
    apiUrl: getEnv("apiUrl") || import.meta.env.VITE_API_URL,
    themeColor: getEnv("themeColor") || import.meta.env.VITE_THEME_COLOR,
    title: getEnv("title") || import.meta.env.VITE_TITLE,
    logos: getEnv("logos") || import.meta.env.VITE_LOGOS,
  },
  ui: {
    maxDropdownHeight: 800,
  },
  calendar: {
    minTime: "05:00",
    maxTime: "23:59",
  },
};
