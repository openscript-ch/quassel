import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/administration/carers")({
  component: () => <div>Hello /_auth/administration/carers!</div>,
});
