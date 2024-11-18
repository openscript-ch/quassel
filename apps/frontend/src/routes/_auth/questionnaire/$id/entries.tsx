import { createFileRoute } from "@tanstack/react-router";

function QuestionnaireEntries() {
  return "Hello /_auth/questionnaire/$id/entries!";
}

export const Route = createFileRoute("/_auth/questionnaire/$id/entries")({
  component: QuestionnaireEntries,
});
