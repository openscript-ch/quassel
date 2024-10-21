import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/administration/questionnaires")({
  component: () => <div>Hello /_auth/administration/questionnaires!</div>,
});
