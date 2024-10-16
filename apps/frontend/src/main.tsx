import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@quassel/ui/style.css";
import { ThemeProvider } from "@quassel/ui";
import { ApiProvider } from "./provider/ApiProvider.tsx";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";

import './main.css';

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApiProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ApiProvider>
  </StrictMode>
);
