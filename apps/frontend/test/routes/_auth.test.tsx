import { describe, it, expect, vitest } from "vitest";
import { act, render, waitFor } from "@testing-library/react";
import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "../../src/routeTree.gen";
import { ThemeProvider } from "@quassel/ui";
import { $session } from "../../src/stores/session";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("_auth route", () => {
  it("should redirect to /session if not logged in", async () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const queryClient = new QueryClient();
    const router = createRouter({ routeTree, history, context: { queryClient } });

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(history.location.pathname).toBe("/session");
    });
  });

  it("should not redirect to /session if logged in", async () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const queryClient = new QueryClient();
    const router = createRouter({ routeTree, history, context: { queryClient } });

    act(() => {
      $session.set({ email: "hans.kanns@example.ch" });
    });

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(history.location.pathname).toBe("/");
    });

    act(() => {
      $session.set({});
    });
  });
});
