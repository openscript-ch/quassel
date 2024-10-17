import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RouterProvider } from "@tanstack/react-router";
import { createTestRouter } from "../test/routesHelper";

describe("index route", () => {
  it("should render the index route", async () => {
    render(<RouterProvider router={createTestRouter()} />);
    expect(await screen.findByText("Welcome Home!")).toBeInTheDocument();
  });
});
