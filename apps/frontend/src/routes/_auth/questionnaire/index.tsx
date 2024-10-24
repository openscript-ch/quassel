import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/questionnaire/")({
  component: Index,
});

function Index() {
  return <h3>Questionnaire</h3>;
}
