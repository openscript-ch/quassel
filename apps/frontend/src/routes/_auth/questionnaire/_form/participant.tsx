import { Button } from "@quassel/ui";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

function QuestionnaireParticipant() {
  const n = useNavigate();

  const handleSubmit = () => {
    n({ to: "/questionnaire/new" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button type="submit">New questionnaire</Button>
    </form>
  );
}

export const Route = createFileRoute("/_auth/questionnaire/_form/participant")({
  component: QuestionnaireParticipant,
});
