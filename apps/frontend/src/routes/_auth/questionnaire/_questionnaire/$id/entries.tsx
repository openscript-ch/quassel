import { Button, Group } from "@quassel/ui";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { i18n } from "../../../../../stores/i18n";
import { useStore } from "@nanostores/react";

export const messages = i18n("questionnaireEntries", {
  formAction: "Continue",
  backAction: "Back",
});

function QuestionnaireEntries() {
  const n = useNavigate();
  const p = Route.useParams();

  const t = useStore(messages);

  const handleSubmit = () => {
    n({ to: "/questionnaire/$id/remarks", params: p });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Group>
        <Link to="/questionnaire/$id/period" params={p}>
          <Button variant="light">{t.backAction}</Button>
        </Link>
        <Button type="submit">{t.formAction}</Button>
      </Group>
    </form>
  );
}

export const Route = createFileRoute("/_auth/questionnaire/_questionnaire/$id/entries")({
  component: QuestionnaireEntries,
});
