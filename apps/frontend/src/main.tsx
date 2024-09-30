import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@quassel/ui/style.css";
import { ThemeProvider } from "@quassel/ui";
import { ApiProvider } from "./provider/ApiProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApiProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ApiProvider>
  </StrictMode>
);
