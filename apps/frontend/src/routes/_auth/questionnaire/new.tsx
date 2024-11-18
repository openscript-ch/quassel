import { Button } from "@quassel/ui";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

function QuestionnaireNew() {
  const n = useNavigate();

  const handleSubmit = () => {
    // TODO create new questionnaire and receive ID

    n({ to: "/questionnaire/$id/entries", params: { id: "123" } });
  };

  return (
    <>
      <h3>Period</h3>
      <form onSubmit={handleSubmit}>
        {/* TODO period form */}
        <Button type="submit">Create</Button>
      </form>
    </>
  );
}

export const Route = createFileRoute("/_auth/questionnaire/new")({
  component: QuestionnaireNew,
});
