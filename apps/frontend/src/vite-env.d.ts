/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/pwa-assets" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_THEME_COLOR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
