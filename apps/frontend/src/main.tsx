import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@quassel/ui/style.css";
import { ThemeProvider } from "@quassel/ui";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

const queryClient = new QueryClient();
const router = createRouter({ routeTree, context: { queryClient }, defaultPreload: "intent", defaultPreloadStaleTime: 0 });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

dayjs.extend(utc);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
