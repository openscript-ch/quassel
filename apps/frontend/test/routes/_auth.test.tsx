import { describe, it, expect } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "../../src/routeTree.gen";
import { ThemeProvider } from "@quassel/ui";

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
});
