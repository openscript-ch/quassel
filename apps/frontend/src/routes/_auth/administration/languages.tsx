import { Title, Paper } from "@quassel/ui";
import { createFileRoute, Outlet } from "@tanstack/react-router";

function AdministrationLanguages() {
  return (
    <>
      <Title>Languages</Title>
      <Paper my="lg">
        <Outlet />
      </Paper>
    </>
  );
}

export const Route = createFileRoute("/_auth/administration/languages")({
  component: AdministrationLanguages,
});
