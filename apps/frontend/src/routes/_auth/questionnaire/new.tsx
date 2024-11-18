import { createFileRoute } from "@tanstack/react-router";

function QuestionnaireNew() {
  return "Hello /_auth/questionnaire/new!";
}

export const Route = createFileRoute("/_auth/questionnaire/new")({
  component: QuestionnaireNew,
});
