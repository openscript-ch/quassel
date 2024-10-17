import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/questionnaire")({
  component: QuestionnarieLayout,
});

function QuestionnarieLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}
