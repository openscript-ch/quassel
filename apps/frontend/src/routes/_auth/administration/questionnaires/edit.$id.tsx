import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { $api } from "../../../../stores/api";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { Button, DateInput, Divider, Group, Stack, Textarea, TextInput, useForm } from "@quassel/ui";
import { useEffect } from "react";
import { QuestionnaireEntries } from "../../../../components/questionnaire/QuestionnaireEntries";
import { i18n } from "../../../../stores/i18n";
import { useStore } from "@nanostores/react";

type FormValues = {
  startedAt: Date;
  endedAt: Date;
  title: string;
  remark?: string;
};

const messages = i18n("questionnairesEdit", {
  labelRemarks: "Remarks",
  labelTitle: "Title",
  labelEndedAt: "End date",
  labelStartedAt: "Start date",
});

function AdministrationQuestionnairesEdit() {
  const p = Route.useParams();
  const n = useNavigate();
  const q = useQueryClient();

  const t = useStore(messages);

  const { data, isSuccess } = useSuspenseQuery(
    $api.queryOptions("get", "/questionnaires/{id}", {
      params: { path: { id: p.id } },
    })
  );

  const editQuestionnaireMutation = $api.useMutation("patch", "/questionnaires/{id}", {
    onSuccess: () => {
      q.invalidateQueries(
        $api.queryOptions("get", "/questionnaires/{id}", {
          params: { path: { id: p.id } },
        })
      );
      n({ to: "/administration/questionnaires" });
    },
  });

  const f = useForm<FormValues>();
  const handleSubmit = ({ startedAt, endedAt, ...rest }: FormValues) => {
    editQuestionnaireMutation.mutate({
      body: { ...rest, startedAt: startedAt.toISOString(), endedAt: endedAt.toISOString() },
      params: { path: { id: p.id } },
    });
  };

  useEffect(() => {
    const { title, remark, startedAt, endedAt } = data;
    f.initialize({ title, remark, startedAt: new Date(startedAt), endedAt: new Date(endedAt) });
  }, [isSuccess, data]);

  return (
    <Stack gap="xl">
      <form autoComplete="off" onSubmit={f.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput {...f.getInputProps("title")} label={t.labelTitle} />
          <Group>
            <DateInput {...f.getInputProps("startedAt")} label={t.labelStartedAt} flex={1} />
            <DateInput {...f.getInputProps("endedAt")} label={t.labelEndedAt} flex={1} />
          </Group>

          <Textarea {...f.getInputProps("remark")} label={t.labelRemarks} rows={8} />

          <Button type="submit" loading={editQuestionnaireMutation.isPending}>
            Change
          </Button>
        </Stack>
      </form>
      <Divider />
      <QuestionnaireEntries questionnaire={data} />
    </Stack>
  );
}

export const Route = createFileRoute("/_auth/administration/questionnaires/edit/$id")({
  loader: ({ params, context: { queryClient } }) =>
    queryClient.ensureQueryData(
      $api.queryOptions("get", "/questionnaires/{id}", {
        params: { path: { id: params.id } },
      })
    ),
  component: AdministrationQuestionnairesEdit,
});
