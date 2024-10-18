import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/session")({
  component: () => <div>Hello /session!</div>,
});
