import { Title, Paper } from "@quassel/ui";
import { createFileRoute, Outlet } from "@tanstack/react-router";

function AdministrationStudies() {
  return (
    <>
      <Title>Studies</Title>
      <Paper my="lg">
        <Outlet />
      </Paper>
    </>
  );
}

export const Route = createFileRoute("/_auth/administration/studies")({
  component: AdministrationStudies,
});
