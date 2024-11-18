import { Container } from "@quassel/ui";
import { createFileRoute, Outlet } from "@tanstack/react-router";

function FormLayout() {
  return (
    <Container size="md" mt="xl">
      <Outlet />
    </Container>
  );
}

export const Route = createFileRoute("/_auth/questionnaire/_form")({
  component: FormLayout,
});
