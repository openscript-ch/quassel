import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/administration/participants")({
  component: () => <div>Hello /_auth/administration/participants!</div>,
});
