import { Paper, Title } from "@quassel/ui";
import { createFileRoute, Outlet } from "@tanstack/react-router";

function AdministrationExport() {
  return (
    <>
      <Title>Export</Title>
      <Paper my="lg">
        <Outlet />
      </Paper>
    </>
  );
}

export const Route = createFileRoute("/_auth/administration/export")({
  component: AdministrationExport,
});
