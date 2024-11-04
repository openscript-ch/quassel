import { Paper, Title } from "@quassel/ui";
import { createFileRoute, Outlet } from "@tanstack/react-router";

function AdministrationCarers() {
  return (
    <>
      <Title>Carers</Title>
      <Paper my="lg">
        <Outlet />
      </Paper>
    </>
  );
}

export const Route = createFileRoute("/_auth/administration/carers")({
  component: AdministrationCarers,
});
