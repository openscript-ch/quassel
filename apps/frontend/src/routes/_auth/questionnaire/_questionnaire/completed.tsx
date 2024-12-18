import { Button, Stack, Title } from "@quassel/ui";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { i18n } from "../../../../stores/i18n";
import { useStore } from "@nanostores/react";
import { $questionnaire } from "../../../../stores/questionnaire";

export const messages = i18n("questionnaireOverview", {
  title: "Thanks for submitting the questionnaire!",
  closeAction: "Close",
});

function QuestionnaireOverview() {
  const n = useNavigate();
  const t = useStore(messages);

  const handleClose = () => {
    $questionnaire.set(undefined);

    n({ to: "/questionnaire" });
  };

  return (
    <Stack align="flex-start">
      <Title order={2}>{t.title}</Title>
      <Button onClick={handleClose}>{t.closeAction}</Button>
    </Stack>
  );
}

export const Route = createFileRoute("/_auth/questionnaire/_questionnaire/completed")({
  component: QuestionnaireOverview,
});
