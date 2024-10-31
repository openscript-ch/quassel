import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/questionnaire")({
  component: QuestionnaireLayout,
});

function QuestionnaireLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}
