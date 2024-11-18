import { Button, Stack, TextInput } from "@quassel/ui";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { i18n } from "../../../../stores/i18n";
import { useStore } from "@nanostores/react";

export const messages = i18n("questionnaire", {
  title: "Start new questionnaire",
  formAction: "Continue",
});

function Questionnaire() {
  const n = useNavigate();
  const t = useStore(messages);

  const handleSubmit = () => {
    n({ to: "/questionnaire/participant" });
  };

  return (
    <>
      <h3>{t.title}</h3>
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput />
          <TextInput />
          <Button type="submit">{t.formAction}</Button>
        </Stack>
      </form>
    </>
  );
}

export const Route = createFileRoute("/_auth/questionnaire/_form/")({
  component: Questionnaire,
});
