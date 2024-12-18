import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { i18n } from "../../../../../stores/i18n";
import { useStore } from "@nanostores/react";
import { PeriodForm, PeriodFormValues } from "../../../../../components/questionnaire/PeriodForm";
import { $api } from "../../../../../stores/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export const messages = i18n("questionnairePeriod", {
  title: "Period",
  formAction: "Continue",
});

function QuestionnairePeriod() {
  const n = useNavigate();
  const { id } = Route.useParams();

  const t = useStore(messages);

  const { data: questionnaire } = useSuspenseQuery(
    $api.queryOptions("get", "/questionnaires/{id}", {
      params: { path: { id } },
    })
  );

  const period: PeriodFormValues = {
    title: questionnaire.title!,
    range: [new Date(Date.parse(questionnaire.startedAt!)), new Date(Date.parse(questionnaire.endedAt!))],
  };

  const updateQuestionnaireMutation = $api.useMutation("patch", "/questionnaires/{id}");

  const onSave = async (form: PeriodFormValues) => {
    const {
      title,
      range: [localStartedAt, localEndedAt],
    } = form;

    const startedAt = localStartedAt!.toISOString();
    const endedAt = localEndedAt!.toISOString();

    await updateQuestionnaireMutation.mutateAsync({
      params: { path: { id } },
      body: { title, startedAt, endedAt },
    });

    n({ to: "/questionnaire/$id/entries", params: { id } });
  };

  return (
    <>
      <h3>{t.title}</h3>
      <PeriodForm onSave={onSave} startDate={period.range[0]!} period={period} actionLabel={t.formAction} />
    </>
  );
}

export const Route = createFileRoute("/_auth/questionnaire/_questionnaire/$id/period")({
  loader: ({ params, context: { queryClient } }) =>
    queryClient.ensureQueryData(
      $api.queryOptions("get", "/questionnaires/{id}", {
        params: { path: { id: params.id } },
      })
    ),
  component: QuestionnairePeriod,
});
