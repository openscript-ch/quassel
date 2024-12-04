import { describe, it, expect, beforeEach } from "vitest";
import { act, render, waitFor } from "@testing-library/react";
import { createMemoryHistory, createRootRoute, createRoute, createRouter, RouterHistory, RouterProvider } from "@tanstack/react-router";
import { ThemeProvider } from "@quassel/ui";
import { $session } from "../../src/stores/session";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route as AuthImport } from "../../src/routes/_auth";
import { Route as SessionImport } from "../../src/routes/session";

describe("_auth route", () => {
  let history: RouterHistory;
  let renderStage: () => void;

  beforeEach(async () => {
    history = createMemoryHistory({ initialEntries: ["/"] });
    const rootRoute = createRootRoute();
    const AuthRoute = AuthImport.update({
      id: "/_auth",
      getParentRoute: () => rootRoute,
    } as never);
    const SessionRoute = SessionImport.update({
      id: "/session",
      path: "/session",
      getParentRoute: () => rootRoute,
    } as never);
    const IndexRoute = createRoute({ path: "/", component: () => <div>Index</div>, getParentRoute: () => AuthRoute });

    const routeTree = rootRoute.addChildren([IndexRoute, AuthRoute, SessionRoute]);
    const queryClient = new QueryClient();
    const router = createRouter({ routeTree, history, context: { queryClient } });

    await router.load();

    renderStage = () =>
      render(
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <RouterProvider router={router as never} />
          </ThemeProvider>
        </QueryClientProvider>
      );
  });

  it("should redirect to /session if not logged in", async () => {
    renderStage();

    await waitFor(() => {
      expect(history.location.pathname).toBe("/session");
    });
  });

  it("should not redirect to /session if logged in", async () => {
    act(() => {
      $session.set({ email: "hans.kanns@example.com" });
    });

    renderStage();

    await waitFor(() => {
      expect(history.location.pathname).toBe("/");
    });

    act(() => {
      $session.set({});
    });
  });
});
