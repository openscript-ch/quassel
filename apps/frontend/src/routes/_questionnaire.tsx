import { Header } from "@quassel/ui";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_questionnaire")({
  component: QuestionnarieLayout,
});

function QuestionnarieLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
