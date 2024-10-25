import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/administration/studies")({
  component: () => <div>Hello /_auth/administration/studies!</div>,
});
