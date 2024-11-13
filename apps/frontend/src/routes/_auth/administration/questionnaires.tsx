import { Title, Paper } from "@quassel/ui";
import { createFileRoute, Outlet } from "@tanstack/react-router";

function AdministrationQuestionnaires() {
  return (
    <>
      <Title>Questionnaires</Title>
      <Paper my="lg">
        <Outlet />
      </Paper>
    </>
  );
}

export const Route = createFileRoute("/_auth/administration/questionnaires")({
  component: AdministrationQuestionnaires,
});
