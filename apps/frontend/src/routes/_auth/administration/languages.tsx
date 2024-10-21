import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/administration/languages")({
  component: () => <div>Hello /_auth/administration/languages!</div>,
});
