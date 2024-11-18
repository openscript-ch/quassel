import { createFileRoute } from "@tanstack/react-router";

function QuestionnairePeriod() {
  return "Hello /_auth/questionnaire/$id/period!";
}

export const Route = createFileRoute("/_auth/questionnaire/$id/period")({
  component: QuestionnairePeriod,
});
