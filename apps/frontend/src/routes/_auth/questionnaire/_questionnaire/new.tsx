import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { i18n } from "../../../../stores/i18n";
import { useStore } from "@nanostores/react";
import { PeriodForm } from "../../../../components/questionnaire/PeriodForm";
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

  return (
    <>
      <h3>{t.title}</h3>
      <PeriodForm
        onSave={(period) =>
          createQuestionnaireMutation.mutate({
            body: { ...period, study: questionnaire!.study.id, participant: questionnaire!.participant.id },
          })
        }
        actionLabel={t.formAction}
      />
    </>
  );
}

export const Route = createFileRoute("/_auth/questionnaire/_questionnaire/new")({
  component: QuestionnaireNew,
});
