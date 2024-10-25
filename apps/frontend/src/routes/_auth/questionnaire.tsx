import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/questionnaire")({
  component: QuestionnaireLayout,
});

function QuestionnaireLayout() {
  return (
    <>
      <h2>Questionnaire</h2>
      <Outlet />
    </>
  );
}
