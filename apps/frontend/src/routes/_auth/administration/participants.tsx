import { Paper, Title } from "@quassel/ui";
import { createFileRoute, Outlet } from "@tanstack/react-router";

function AdministrationParticipants() {
  return (
    <>
      <Title>Participants</Title>
      <Paper my="lg">
        <Outlet />
      </Paper>
    </>
  );
}

export const Route = createFileRoute("/_auth/administration/participants")({
  component: AdministrationParticipants,
});
