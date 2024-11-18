import { Button } from "@quassel/ui";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

function QuestionnairePeriod() {
  const n = useNavigate();
  const p = Route.useParams();

  const handleSubmit = () => {
    n({ to: "/questionnaire/$id/entries", params: p });
  };

  return (
    <>
      <h3>Period</h3>
      <form onSubmit={handleSubmit}>
        <Button type="submit">Continue</Button>
      </form>
    </>
  );
}

export const Route = createFileRoute("/_auth/questionnaire/$id/period")({
  component: QuestionnairePeriod,
});
