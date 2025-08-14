import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { i18n } from "../../../../../stores/i18n";
import { useStore } from "@nanostores/react";
import { PeriodForm, PeriodFormValues } from "../../../../../components/questionnaire/PeriodForm";
import { $api } from "../../../../../stores/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Title } from "@quassel/ui";
import { getStartOf, getEndOf } from "@quassel/utils";

export const messages = i18n("questionnairePeriod", {
  title: "Period",
  formAction: "Continue",
});

function QuestionnairePeriod() {
  const n = useNavigate();
  const { id } = Route.useParams();

  const t = useStore(messages);

  const {
    data: { title, startedAt, endedAt },
  } = useSuspenseQuery(
    $api.queryOptions("get", "/questionnaires/{id}", {
      params: { path: { id } },
    })
  );

  const period: PeriodFormValues = { title, range: [startedAt, endedAt] };

  const updateQuestionnaireMutation = $api.useMutation("patch", "/questionnaires/{id}");

  const onSave = async ({ title, range: [startedAt, endedAt] }: PeriodFormValues) => {
    if (!startedAt || !endedAt) return;

    startedAt = getStartOf("day", new Date(startedAt)).toISOString();
    endedAt = getEndOf("day", new Date(endedAt)).toISOString();

    await updateQuestionnaireMutation.mutateAsync({
      params: { path: { id } },
      body: { title, startedAt, endedAt },
    });

    n({ to: "/questionnaire/$id/entries", params: { id } });
  };

  return (
    <>
      <Title order={3}>{t.title}</Title>
      <PeriodForm onSave={onSave} period={period} actionLabel={t.formAction} />
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
