import { Button, Group } from "@quassel/ui";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

function QuestionnaireRemarks() {
  const n = useNavigate();
  const p = Route.useParams();

  const handleSubmit = () => {
    n({ to: "/questionnaire/$id/overview", params: p });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add remarks</h3>
      <Group>
        <Link to="/questionnaire/$id/entries" params={p}>
          <Button variant="light">Back</Button>
        </Link>
        <Button variant="outline">Save</Button>
        <Button type="submit">Save and Complete</Button>
      </Group>
    </form>
  );
}

export const Route = createFileRoute("/_auth/questionnaire/_form/$id/remarks")({
  component: QuestionnaireRemarks,
});
