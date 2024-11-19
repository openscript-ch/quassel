import { Button } from "@quassel/ui";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { i18n } from "../../../../../stores/i18n";
import { useStore } from "@nanostores/react";

export const messages = i18n("questionnairePeriod", {
  title: "Period",
  formAction: "Continue",
});

function QuestionnairePeriod() {
  const n = useNavigate();
  const p = Route.useParams();

  const t = useStore(messages);

  const handleSubmit = () => {
    n({ to: "/questionnaire/$id/entries", params: p });
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

export const Route = createFileRoute("/_auth/questionnaire/_questionnaire/$id/period")({
  component: QuestionnairePeriod,
});
