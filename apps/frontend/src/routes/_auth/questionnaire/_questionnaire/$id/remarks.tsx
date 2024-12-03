import { Button, Group } from "@quassel/ui";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { i18n } from "../../../../../stores/i18n";
import { useStore } from "@nanostores/react";

export const messages = i18n("questionnaireRemarks", {
  title: "Add remarks",
  backAction: "Back",
  saveAction: "Save",
  formAction: "Save and complete",
});

function QuestionnaireRemarks() {
  const n = useNavigate();
  const p = Route.useParams();

  const t = useStore(messages);

  const handleSubmit = () => {
    n({ to: "/questionnaire/$id/overview", params: p });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{t.title}</h3>
      <Group>
        <Link to="/questionnaire/$id/entries" params={p}>
          <Button variant="light">{t.backAction}</Button>
        </Link>
        <Button variant="outline">{t.saveAction}</Button>
        <Button type="submit">{t.formAction}</Button>
      </Group>
    </form>
  );
}

export const Route = createFileRoute("/_auth/questionnaire/_questionnaire/$id/remarks")({
  component: QuestionnaireRemarks,
});
