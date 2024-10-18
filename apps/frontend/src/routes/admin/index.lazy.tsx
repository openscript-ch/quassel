import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/admin/")({
  component: Index,
});

function Index() {
  return <h3>Admin</h3>;
}
