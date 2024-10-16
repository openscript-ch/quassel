import { Header } from "@quassel/ui";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <>
      <Header title="Quassel Admin" navigtationItems={[<Link to="/admin">Dashboard</Link>]} />
      <Outlet />
    </>
  );
}
