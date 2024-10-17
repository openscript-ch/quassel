import { createMemoryHistory, createRouter } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";

export function createTestRouter(initialPath?: string) {
  return createRouter({ routeTree, history: createMemoryHistory({ initialEntries: [initialPath || "/"] }) });
}
