import { describe, it, expect } from "vitest";
import { act, render, waitFor } from "@testing-library/react";
import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "../../src/routeTree.gen";
import { ThemeProvider } from "@quassel/ui";
import { $session } from "../../src/stores/session";

describe("_auth route", () => {
  it("should redirect to /session if not logged in", async () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const router = createRouter({ routeTree, history });

    render(
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(history.location.pathname).toBe("/session");
    });
  });

  it("should not redirect to /session if logged in", async () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const router = createRouter({ routeTree, history });

    act(() => {
      $session.set({ token: "token" });
    });

    render(
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(history.location.pathname).toBe("/");
    });

    act(() => {
      $session.set({});
    });
  });
});
