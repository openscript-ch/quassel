import { Button, Group, Modal, Stack, Title, useDisclosure, useForm } from "@quassel/ui";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { i18n } from "../../../../../stores/i18n";
import { useStore } from "@nanostores/react";
import { $api } from "../../../../../stores/api";
import { useEffect, useState } from "react";
import { components } from "../../../../../api.gen";
import { GapsPerDay, resolveGaps } from "../../../../../utils/entry";
import { QuestionnaireEntries } from "../../../../../components/questionnaire/QuestionnaireEntries";

const messages = i18n("questionnaireEntries", {
  formAction: "Continue",
  backAction: "Back",
  addEntityLabel: "Add",
  notificationSuccessCreateLanguage: "Successfully add a new language.",
  notificationSuccessCreateCarer: "Successfully add a new carer.",
  gapsDialogTitle: "Gaps detected in the calendar",
  gapsDialogContinueAnyway: "Continue anyway",
  gapsDialogHighlightGaps: "Highlight gaps",
});

export function Entries() {
  const n = useNavigate();
  const p = Route.useParams();

  const t = useStore(messages);

  const { data: questionnaire } = $api.useSuspenseQuery("get", "/questionnaires/{id}", { params: { path: p } });

  const [gaps, setGaps] = useState<GapsPerDay>();
  const [highlightGaps, setHighlightGaps] = useState(false);
  const [gapsDialogOpened, { open, close }] = useDisclosure();

  const f = useForm<{ entries: components["schemas"]["EntryResponseDto"][] }>({
    initialValues: {
      entries: [],
    },
    validate: {
      entries: (value) => {
        const gaps = resolveGaps(value);
        setGaps(gaps);

        const hasGaps = gaps.some(({ length }) => length);
        if (hasGaps) open();

        return hasGaps;
      },
    },
  });

  const handleSubmit = () => {
    n({ to: "/questionnaire/$id/remarks", params: p });
  };

  useEffect(() => {
    f.setValues({ entries: questionnaire.entries });
  }, [questionnaire]);

  return (
    <>
      <Modal opened={gapsDialogOpened} onClose={close} centered title={t.gapsDialogTitle}>
        <Group justify="flex-end">
          <Button onClick={handleSubmit} variant="light" type="submit">
            {t.gapsDialogContinueAnyway}
          </Button>
          <Button
            onClick={() => {
              setHighlightGaps(true);
              close();
            }}
          >
            {t.gapsDialogHighlightGaps}
          </Button>
        </Group>
      </Modal>
      <form onSubmit={f.onSubmit(handleSubmit)}>
        <Stack>
          <Title order={3}>{questionnaire.title}</Title>
          <QuestionnaireEntries gaps={highlightGaps ? gaps : undefined} questionnaire={questionnaire} />

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
  component: Entries,
});
