import { Paper, Title } from "@quassel/ui";
import { createFileRoute, Outlet } from "@tanstack/react-router";

function AdministrationUsers() {
  return (
    <>
      <Title>Users</Title>
      <Paper my="lg">
        <Outlet />
      </Paper>
    </>
  );
}

export const Route = createFileRoute("/_auth/administration/users")({
  component: AdministrationUsers,
});
