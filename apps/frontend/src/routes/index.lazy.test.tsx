import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RouterProvider } from "@tanstack/react-router";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";
import "@testing-library/jest-dom";

describe("index route", () => {
  it("should render the index route", async () => {
    render(<RouterProvider router={createRouter({ routeTree })} />);
    expect(await screen.findByText("Welcome Home!")).toBeInTheDocument();
  });
});
