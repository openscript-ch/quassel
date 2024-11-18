import { Button, Group } from "@quassel/ui";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

function QuestionnaireEntries() {
  const n = useNavigate();
  const p = Route.useParams();

  const handleSubmit = () => {
    n({ to: "/questionnaire/$id/remarks", params: p });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Group>
        <Link to="/questionnaire/$id/period" params={p}>
          <Button variant="light">Back</Button>
        </Link>
        <Button type="submit">Continue</Button>
      </Group>
    </form>
  );
}

export const Route = createFileRoute("/_auth/questionnaire/$id/entries")({
  component: QuestionnaireEntries,
});
