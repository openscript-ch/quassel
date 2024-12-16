import { Button, Group } from "@quassel/ui";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { i18n } from "../../../../../stores/i18n";
import { useStore } from "@nanostores/react";
import { $questionnaire } from "../../../../../stores/questionnaire";

export const messages = i18n("questionnaireOverview", {
  title: "Thanks for submitting the questionnaire!",
  newPeriodAction: "Continue with new period",
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
    <>
      <h3>{t.title}</h3>
      <Group>
        <Link to="/questionnaire/new">
          <Button variant="outline">{t.newPeriodAction}</Button>
        </Link>
        <Button onClick={handleClose}>{t.closeAction}</Button>
      </Group>
    </>
  );
}

export const Route = createFileRoute("/_auth/questionnaire/_questionnaire/$id/overview")({
  component: QuestionnaireOverview,
});
