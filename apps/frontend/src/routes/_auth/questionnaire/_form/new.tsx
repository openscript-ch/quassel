import { Button } from "@quassel/ui";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { i18n } from "../../../../stores/i18n";
import { useStore } from "@nanostores/react";

export const messages = i18n("questionnaireNew", {
  title: "Create new period of life",
  formAction: "Create",
});

function QuestionnaireNew() {
  const n = useNavigate();
  const t = useStore(messages);

  const handleSubmit = () => {
    // TODO create new questionnaire and receive ID

    n({ to: "/questionnaire/$id/entries", params: { id: "123" } });
  };

  return (
    <>
      <h3>{t.title}</h3>
      <form onSubmit={handleSubmit}>
        {/* TODO period form */}
        <Button type="submit">{t.formAction}</Button>
      </form>
    </>
  );
}

export const Route = createFileRoute("/_auth/questionnaire/_form/new")({
  component: QuestionnaireNew,
});
