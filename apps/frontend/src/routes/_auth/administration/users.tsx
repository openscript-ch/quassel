import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/administration/users")({
  component: () => <div>Hello /_auth/administration/users!</div>,
});
