import { Button, Group } from "@quassel/ui";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

function QuestionnaireOverview() {
  const n = useNavigate();

  const handleClose = () => {
    // TODO handle closing quesitonnaire ("logout")

    n({ to: "/questionnaire" });
  };

  return (
    <>
      <h3>Thanks for submitting the questionnaire!</h3>
      <Group>
        <Link to="/questionnaire/new">
          <Button variant="outline">Continue with new period</Button>
        </Link>
        <Button onClick={handleClose}>Close</Button>
      </Group>
    </>
  );
}

export const Route = createFileRoute("/_auth/questionnaire/$id/overview")({
  component: QuestionnaireOverview,
});
