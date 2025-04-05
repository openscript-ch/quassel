import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@quassel/ui/style.css";
import { ThemeProvider, defaultTheme, mergeThemeOverrides } from "@quassel/ui";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { C } from "./configuration.ts";

const queryClient = new QueryClient();
const router = createRouter({ routeTree, context: { queryClient }, defaultPreload: "intent", defaultPreloadStaleTime: 0 });
const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : React.lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        }))
      );

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const currentTheme = mergeThemeOverrides(defaultTheme, { primaryColor: C.env.themeColor });
if (import.meta.env.DEV) document.title = C.env.title;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={currentTheme}>
        <RouterProvider router={router} notFoundMode="root" />
        <TanStackRouterDevtools router={router} position="bottom-right" />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
