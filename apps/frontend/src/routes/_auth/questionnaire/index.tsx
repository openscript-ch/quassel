import { Button, Stack, TextInput } from "@quassel/ui";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

function Questionnaire() {
  const n = useNavigate();

  const handleSubmit = () => {
    n({ to: "/questionnaire/participant" });
  };

  return (
    <>
      <h3>Questionnaire</h3>
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput />
          <TextInput />
          <Button type="submit">Start questionnaire</Button>
        </Stack>
      </form>
    </>
  );
}

export const Route = createFileRoute("/_auth/questionnaire/")({
  component: Questionnaire,
});
