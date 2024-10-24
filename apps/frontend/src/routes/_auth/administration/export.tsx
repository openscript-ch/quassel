import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/administration/export")({
  component: () => <div>Hello /_auth/administration/export!</div>,
});
