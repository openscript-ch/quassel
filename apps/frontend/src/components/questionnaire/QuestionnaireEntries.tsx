import { notifications } from "@quassel/ui";
import { $api } from "../../stores/api";
import { EntryCalendar } from "./calendar/EntryCalendar";
import { useQueryClient } from "@tanstack/react-query";
import { EntryFormValues } from "./calendar/EntryForm";
import { components } from "../../api.gen";
import { GapsPerDay } from "../../utils/entry";
import { i18n } from "../../stores/i18n";
import { useStore } from "@nanostores/react";

type QuestionnaireEntriesProps = {
  questionnaire: components["schemas"]["QuestionnaireResponseDto"];
  gaps?: GapsPerDay;
};

const messages = i18n("questionnaireEntries", {
  notificationSuccessCreateLanguage: "Successfully add a new language.",
  notificationSuccessCreateCarer: "Successfully add a new carer.",
});

export function QuestionnaireEntries({ questionnaire, gaps }: QuestionnaireEntriesProps) {
  const c = useQueryClient();
  const t = useStore(messages);

  const participantId = questionnaire.participant?.id;

  const invalidateTemplates = () =>
    c.invalidateQueries(
      $api.queryOptions("get", "/participants/{id}/entry-templates", {
        params: { path: { id: participantId.toString() } },
      })
    );

  const createMutation = $api.useMutation("post", "/entries", { onSuccess: invalidateTemplates });
  const updateMutation = $api.useMutation("patch", "/entries/{id}", { onSuccess: invalidateTemplates });
  const deleteMutation = $api.useMutation("delete", "/entries/{id}", { onSuccess: invalidateTemplates });

  const { data: templates } = $api.useQuery("get", "/participants/{id}/entry-templates", {
    params: { path: { id: participantId.toString() } },
  });

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
    c.invalidateQueries($api.queryOptions("get", "/questionnaires/{id}", { params: { path: { id: questionnaire.id.toString() } } }));
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

  return (
    <EntryCalendar
      entries={questionnaire.entries ?? []}
      gaps={gaps}
      onAddEntry={handleCreate}
      onUpdateEntry={handleUpdate}
      onDeleteEntry={handleDelete}
      carers={carers ?? []}
      languages={languages ?? []}
      templates={templates ?? []}
      onAddCarer={(name) => createCarerMutation.mutateAsync({ body: { name, participant: participantId } }).then(({ id }) => id)}
      onAddLanguage={(name) => createLanguageMutation.mutateAsync({ body: { name, participant: participantId } }).then(({ id }) => id)}
    />
  );
}
