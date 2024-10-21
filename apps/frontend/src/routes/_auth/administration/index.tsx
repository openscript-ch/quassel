import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/administration/")({
  component: Index,
});

function Index() {
  return <h3>Admin</h3>;
}
