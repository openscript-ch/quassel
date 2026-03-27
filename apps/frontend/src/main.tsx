import React, { StrictMode } from "react";
import * as Sentry from "@sentry/react";
import { createRoot } from "react-dom/client";
import "@quassel/ui/style.css";
import { ThemeProvider, defaultTheme, mergeThemeOverrides } from "@quassel/ui";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { C } from "./configuration.ts";

const queryClient = new QueryClient();
const router = createRouter({ routeTree, context: { queryClient }, defaultPreload: "intent", defaultPreloadStaleTime: 0 });
const TanStackRouterDevtools = import.meta.env.DEV
  ? React.lazy(() =>
      import("@tanstack/react-router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
      }))
    )
  : () => null;

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const sentryDsn = C.env.sentryDsn;

Sentry.init({
  dsn: sentryDsn,
  enabled: Boolean(sentryDsn),
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 1.0,
  sendDefaultPii: true,
});

const currentTheme = mergeThemeOverrides(defaultTheme, { primaryColor: C.env.themeColor });
const container = document.getElementById("root")!;
if (import.meta.env.DEV) document.title = C.env.title;

createRoot(container, {
  onUncaughtError: Sentry.reactErrorHandler((error, errorInfo) => {
    console.warn("Uncaught error", error, errorInfo.componentStack);
  }),
  onCaughtError: Sentry.reactErrorHandler(),
  onRecoverableError: Sentry.reactErrorHandler(),
}).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={currentTheme}>
        <RouterProvider router={router} notFoundMode="root" />
        <TanStackRouterDevtools router={router} position="bottom-right" />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
