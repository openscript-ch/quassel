import { createFileRoute } from "@tanstack/react-router";

function QuestionnaireRemarks() {
  return "Hello /_auth/questionnaire/$id/remarks!";
}

export const Route = createFileRoute("/_auth/questionnaire/$id/remarks")({
  component: QuestionnaireRemarks,
});
