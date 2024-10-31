import { Title } from "@quassel/ui";
import { createFileRoute, Outlet } from "@tanstack/react-router";

function AdministrationUsers() {
  return (
    <>
      <Title>Users</Title>
      <Outlet />
    </>
  );
}

export const Route = createFileRoute("/_auth/administration/users")({
  component: AdministrationUsers,
});
