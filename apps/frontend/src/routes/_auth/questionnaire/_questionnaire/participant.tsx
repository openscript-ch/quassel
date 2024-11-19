import { Button } from "@quassel/ui";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { i18n } from "../../../../stores/i18n";
import { useStore } from "@nanostores/react";

export const messages = i18n("questionnaireParticipant", {
  title: "Participant",
  formAction: "Continue",
});

function QuestionnaireParticipant() {
  const n = useNavigate();
  const t = useStore(messages);

  const handleSubmit = () => {
    n({ to: "/questionnaire/new" });
  };

  return (
    <>
      <h3>{t.title}</h3>
      <form onSubmit={handleSubmit}>
        <Button type="submit">{t.formAction}</Button>
      </form>
    </>
  );
}

export const Route = createFileRoute("/_auth/questionnaire/_questionnaire/participant")({
  component: QuestionnaireParticipant,
});
