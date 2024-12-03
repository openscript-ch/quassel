import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { i18n } from "../../../../stores/i18n";
import { useStore } from "@nanostores/react";
import { PeriodForm, PeriodFormValues } from "../../../../components/questionnaire/PeriodForm";
import { $api } from "../../../../stores/api";
import { $questionnaire } from "../../../../stores/questionnaire";

export const messages = i18n("questionnaireNew", {
  title: "Create new period of life",
  formAction: "Create",
});

function QuestionnaireNew() {
  const n = useNavigate();
  const t = useStore(messages);

  const questionnaire = useStore($questionnaire);

  const createQuestionnaireMutation = $api.useMutation("post", "/questionnaires", {
    onSuccess: (questionnaire) => {
      n({ to: "/questionnaire/$id/entries", params: { id: questionnaire.id.toString() } });
    },
  });

  const onSave = (form: PeriodFormValues) => {
    const {
      title,
      range: [localStartedAt, localEndedAt],
    } = form;

    const startedAt = localStartedAt.toISOString();
    const endedAt = localEndedAt.toISOString();

    createQuestionnaireMutation.mutate({
      body: { title, startedAt, endedAt, study: questionnaire!.study.id, participant: questionnaire!.participant.id },
    });
  };

  return (
    <>
      <h3>{t.title}</h3>
      <PeriodForm onSave={onSave} actionLabel={t.formAction} />
    </>
  );
}

export const Route = createFileRoute("/_auth/questionnaire/_questionnaire/new")({
  component: QuestionnaireNew,
});
