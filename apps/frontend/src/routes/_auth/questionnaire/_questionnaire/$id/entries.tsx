import { Button, Group, Stack, notifications } from "@quassel/ui";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { i18n } from "../../../../../stores/i18n";
import { useStore } from "@nanostores/react";
import { $api } from "../../../../../stores/api";
import { EntryFormValues } from "../../../../../components/questionnaire/calendar/EntryForm";
import { useQueryClient } from "@tanstack/react-query";
import { EntryCalendar } from "../../../../../components/questionnaire/calendar/EntryCalendar";

const messages = i18n("questionnaireEntries", {
  formAction: "Continue",
  backAction: "Back",
  addEntityLabel: "Add",
  notificationSuccessCreateLanguage: "Successfully add a new language.",
  notificationSuccessCreateCarer: "Successfully add a new carer.",
});

function QuestionnaireEntries() {
  const n = useNavigate();
  const p = Route.useParams();

  const t = useStore(messages);

  const c = useQueryClient();

  const createMutation = $api.useMutation("post", "/entries");
  const updateMutation = $api.useMutation("patch", "/entries/{id}");
  const deleteMutation = $api.useMutation("delete", "/entries/{id}");
  const { data: questionnaire } = $api.useSuspenseQuery("get", "/questionnaires/{id}", { params: { path: p } });

  const participantId = questionnaire.participant?.id;

  const { data: languages } = $api.useQuery("get", "/languages", { params: { query: { participantId } } });
  const createLanguageMutation = $api.useMutation("post", "/languages", {
    onSuccess() {
      notifications.show({ message: t.notificationSuccessCreateLanguage, color: "uzhGreen" });
      c.refetchQueries($api.queryOptions("get", "/languages", { params: { query: { participantId } } }));
    },
  });

  const { data: carers } = $api.useQuery("get", "/carers", { params: { query: { participantId } } });
  const createCarerMutation = $api.useMutation("post", "/carers", {
    onSuccess() {
      notifications.show({ message: t.notificationSuccessCreateCarer, color: "uzhGreen" });
      c.refetchQueries($api.queryOptions("get", "/carers", { params: { query: { participantId } } }));
    },
  });

  const reloadEntries = () => {
    c.invalidateQueries($api.queryOptions("get", "/questionnaires/{id}", { params: { path: p } }));
  };

  const handleCreate = ({ carer, ...rest }: EntryFormValues, weekday: number) => {
    const entryRequest = {
      ...rest,
      carer: carer!,
      weekday,
      questionnaire: questionnaire.id,
    };

    return createMutation.mutateAsync({ body: entryRequest }, { onSuccess: reloadEntries });
  };

  const handleUpdate = (id: number, { carer, ...rest }: Partial<EntryFormValues>, weekday: number) => {
    const entryRequest = {
      ...rest,
      carer: carer!,
      weekday,
      questionnaire: questionnaire.id,
    };

    return updateMutation.mutateAsync({ body: entryRequest, params: { path: { id: id.toString() } } }, { onSuccess: reloadEntries });
  };

  const handleDelete = (id: number) => {
    return deleteMutation.mutateAsync({ params: { path: { id: id.toString() } } }, { onSuccess: reloadEntries });
  };

  const handleSubmit = () => {
    n({ to: "/questionnaire/$id/remarks", params: p });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack>
          <EntryCalendar
            entries={questionnaire.entries ?? []}
            onAddEntry={handleCreate}
            onUpdateEntry={handleUpdate}
            onDeleteEntry={handleDelete}
            carers={carers ?? []}
            languages={languages ?? []}
            onAddCarer={(name) => createCarerMutation.mutateAsync({ body: { name, participant: participantId } }).then(({ id }) => id)}
            onAddLanguage={(name) => createLanguageMutation.mutateAsync({ body: { name, participant: participantId } }).then(({ id }) => id)}
          />

          <Group>
            <Link to="/questionnaire/$id/period" params={p}>
              <Button variant="light">{t.backAction}</Button>
            </Link>
            <Button type="submit">{t.formAction}</Button>
          </Group>
        </Stack>
      </form>
    </>
  );
}

export const Route = createFileRoute("/_auth/questionnaire/_questionnaire/$id/entries")({
  loader: ({ params, context: { queryClient } }) =>
    queryClient.ensureQueryData(
      $api.queryOptions("get", "/questionnaires/{id}", {
        params: { path: { id: params.id } },
      })
    ),
  component: QuestionnaireEntries,
});
