import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { $api } from "../../../../stores/api";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { Button, DateInput, Divider, Group, Stack, Table, Textarea, TextInput, useForm } from "@quassel/ui";
import { useEffect } from "react";
import { QuestionnaireEntries } from "../../../../components/questionnaire/QuestionnaireEntries";
import { format, i18n } from "../../../../stores/i18n";
import { useStore } from "@nanostores/react";

type FormValues = {
  startedAt: string;
  endedAt: string;
  title: string;
  remark?: string;
};

const messages = i18n("questionnairesEdit", {
  labelRemarks: "Remarks",
  labelTitle: "Title",
  labelEndedAt: "End date",
  labelStartedAt: "Start date",
  labelParticipant: "Participant",
  labelStudy: "Study",
});

function AdministrationQuestionnairesEdit() {
  const p = Route.useParams();
  const n = useNavigate();
  const q = useQueryClient();

  const t = useStore(messages);
  const { time } = useStore(format);

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
  const handleSubmit = (values: FormValues) => {
    editQuestionnaireMutation.mutate({
      body: values,
      params: { path: { id: p.id } },
    });
  };

  useEffect(() => {
    f.initialize(data);
  }, [isSuccess, data]);

  return (
    <Stack gap="xl">
      <Table>
        <Table.Tbody>
          <Table.Tr>
            <Table.Th>{t.labelParticipant}</Table.Th>
            <Table.Td>{data.participant.id}</Table.Td>
            <Table.Td>{data.participant.birthday && time(new Date(data.participant.birthday))}</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>

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
