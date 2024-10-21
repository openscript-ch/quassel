import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/administration")({
  component: AdministrationLayout,
});

function AdministrationLayout() {
  return (
    <>
      <h2>Admin</h2>
      <Outlet />
    </>
  );
}
