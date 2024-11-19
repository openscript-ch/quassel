import { Container } from "@quassel/ui";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/questionnaire")({
  component: QuestionnaireLayout,
});

function QuestionnaireLayout() {
  return (
    <Container size="md" mt="xl">
      <Outlet />
    </Container>
  );
}
