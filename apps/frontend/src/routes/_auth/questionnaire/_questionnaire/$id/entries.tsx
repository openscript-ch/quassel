import { Button, Group, IconClearAll, modals, Stack, Title, useForm, Text } from "@quassel/ui";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { i18n } from "../../../../../stores/i18n";
import { useStore } from "@nanostores/react";
import { $api } from "../../../../../stores/api";
import { useEffect, useState } from "react";
import { components } from "../../../../../api.gen";
import { GapsPerDay, resolveGaps } from "@quassel/utils";
import { QuestionnaireEntries } from "../../../../../components/questionnaire/QuestionnaireEntries";

const messages = i18n("questionnaireEntries", {
  formAction: "Continue",
  backAction: "Back",
  addEntityLabel: "Add",
  notificationSuccessCreateLanguage: "Successfully add a new language.",
  notificationSuccessCreateCarer: "Successfully add a new carer.",
  gapsDialogTitle: "Continue with gaps?",
  gapsDialogDescription: "There were gaps detected in the calendar. Do you want to continue anyway or highlight the gaps?",
  gapsDialogContinueAnyway: "Continue anyway",
  gapsDialogHighlightGaps: "Highlight gaps",
  confirmClearDialogTitle: "Clear all entries from this questionnaire?",
  confirmClearDialogDescription: "When confirming, all entries from this questionnaires will be removed. This action can't be undone.",
  confirmClearDialogCancel: "Cancel",
  confirmClearDialogConfirm: "Clear all",
});

export function Entries() {
  const n = useNavigate();
  const p = Route.useParams();

  const t = useStore(messages);

  const { data: questionnaire, refetch } = $api.useSuspenseQuery("get", "/questionnaires/{id}", { params: { path: p } });

  const removeAllEntriesMutation = $api.useMutation("delete", "/entries", { onSuccess: () => refetch() });

  const [gaps, setGaps] = useState<GapsPerDay>();
  const [highlightGaps, setHighlightGaps] = useState(false);

  const f = useForm<{ entries: components["schemas"]["EntryResponseDto"][] }>({
    initialValues: {
      entries: [],
    },
    validate: {
      entries: (value) => {
        const gaps = resolveGaps(value);
        setGaps(gaps);

        const hasGaps = gaps.some(({ length }) => length);
        return hasGaps;
      },
    },
  });

  const handleSubmit = () => {
    n({ to: "/questionnaire/$id/remarks", params: p });
  };

  const handleGapValidation = () => {
    modals.openConfirmModal({
      title: t.gapsDialogTitle,
      children: <Text size="sm">{t.gapsDialogDescription}</Text>,
      labels: { cancel: t.gapsDialogHighlightGaps, confirm: t.gapsDialogContinueAnyway },
      confirmProps: { variant: "light" },
      cancelProps: { variant: "filled" },
      onConfirm: handleSubmit,
      onCancel: () => setHighlightGaps(true),
    });
  };

  const handleClearEntries = () => {
    modals.openConfirmModal({
      title: t.confirmClearDialogTitle,
      children: <Text size="sm">{t.confirmClearDialogDescription}</Text>,
      labels: { cancel: t.confirmClearDialogCancel, confirm: t.confirmClearDialogConfirm },
      onConfirm: () => removeAllEntriesMutation.mutate({ params: { query: { questionnaireId: questionnaire.id } } }),
    });
  };

  useEffect(() => {
    f.setValues({ entries: questionnaire.entries });

    if (highlightGaps) f.validate();
  }, [questionnaire]);

  return (
    <form onSubmit={f.onSubmit(handleSubmit, handleGapValidation)}>
      <Stack>
        <Group justify="space-between">
          <Title order={3}>{questionnaire.title}</Title>
          <Button variant="default" onClick={handleClearEntries} rightSection={<IconClearAll />}>
            Clear all
          </Button>
        </Group>
        <QuestionnaireEntries gaps={highlightGaps ? gaps : undefined} questionnaire={questionnaire} />

        <Group>
          <Link to="/questionnaire/$id/period" params={p}>
            <Button variant="light">{t.backAction}</Button>
          </Link>
          <Button type="submit">{t.formAction}</Button>
        </Group>
      </Stack>
    </form>
  );
}

export const Route = createFileRoute("/_auth/questionnaire/_questionnaire/$id/entries")({
  loader: ({ params, context: { queryClient } }) =>
    queryClient.ensureQueryData(
      $api.queryOptions("get", "/questionnaires/{id}", {
        params: { path: { id: params.id } },
      })
    ),
  component: Entries,
});
