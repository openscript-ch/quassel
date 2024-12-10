import { Button, formatDate, getDateFromTimeAndWeekday, Group, Stack, useMantineTheme, useDisclosure, Modal, getTime } from "@quassel/ui";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { i18n } from "../../../../../stores/i18n";
import { useStore } from "@nanostores/react";
import { $api } from "../../../../../stores/api";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventInput } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import { components } from "../../../../../api.gen";
import { QuestionnaireEntry } from "../../../../../components/questionnaire/calendar/QuestionnaireEntry";
import { EntityForm, EntryFormValues } from "../../../../../components/questionnaire/calendar/EntryForm";
import { useState } from "react";

export type ExtendedEvent = EventInput & { extendedProps: { entryLanguages: components["schemas"]["EntryLanguageResponseDto"][] } };

const calendarBaseConfig: FullCalendar["props"] = {
  allDaySlot: false,
  headerToolbar: false,
  slotMinTime: { hour: 5 },
  slotMaxTime: { hour: 23 },
  slotDuration: { hour: 1 },
  firstDay: 1,
  dayHeaderContent: ({ date }) => formatDate(date, "dddd"),
  locale: "de",
  expandRows: true,
};

const messages = i18n("questionnaireEntries", {
  formAction: "Continue",
  backAction: "Back",
  addEntityLabel: "Add",
});

function QuestionnaireEntries() {
  const n = useNavigate();
  const p = Route.useParams();

  const t = useStore(messages);

  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure();

  const [selectedWeekday, setSelectedWeekday] = useState<number>();
  const [entryUpdatingId, setEntryUpdadingId] = useState<number>();
  const [entryDraft, setEntryDraft] = useState<Partial<EntryFormValues>>();

  const createMutation = $api.useMutation("post", "/entries");
  const updateMutation = $api.useMutation("patch", "/entries/{id}");
  const { data: questionnaire, refetch } = $api.useSuspenseQuery("get", "/questionnaires/{id}", { params: { path: { id: p.id } } });

  const events: ExtendedEvent[] =
    questionnaire.entries?.map(({ startedAt, endedAt, weekday, carer, entryLanguages, id }) => ({
      id: id.toString(),
      start: getDateFromTimeAndWeekday(startedAt, weekday),
      end: getDateFromTimeAndWeekday(endedAt, weekday),
      title: carer.name,
      extendedProps: { entryLanguages },
      backgroundColor: theme.colors[theme.primaryColor][4],
    })) ?? [];

  const handleReset = () => {
    refetch();
    close();
    setSelectedWeekday(undefined);
    setEntryUpdadingId(undefined);
  };

  const handleOnSave = ({ carer, ...rest }: EntryFormValues) => {
    if (selectedWeekday === undefined) return;

    const entryRequest = {
      ...rest,
      carer: carer!,
      weekday: selectedWeekday,
      questionnaire: questionnaire.id,
    };

    if (!entryUpdatingId) {
      createMutation.mutate({ body: entryRequest }, { onSuccess: handleReset });
    } else {
      updateMutation.mutate({ body: entryRequest, params: { path: { id: entryUpdatingId?.toString() } } }, { onSuccess: handleReset });
    }
  };

  const handleSubmit = () => {
    n({ to: "/questionnaire/$id/remarks", params: p });
  };

  return (
    <>
      <Modal opened={opened} onClose={close} size="md">
        <EntityForm onSave={handleOnSave} entry={entryDraft} actionLabel={t.addEntityLabel} />
      </Modal>
      <form onSubmit={handleSubmit}>
        <Stack>
          <FullCalendar
            {...calendarBaseConfig}
            plugins={[timeGridPlugin, interactionPlugin]}
            editable
            events={events}
            selectable
            select={(args) => {
              setEntryDraft({ startedAt: getTime(args.start), endedAt: getTime(args.end) });
              setSelectedWeekday(args.start.getDay());
              open();
            }}
            eventClick={(args) => {
              const { carer, entryLanguages, weekday, id } =
                questionnaire.entries?.find((entry) => entry.id.toString() === args.event.id) ?? {};

              setEntryUpdadingId(id);
              setEntryDraft({
                carer: carer?.id,
                startedAt: getTime(args.event.start!),
                endedAt: getTime(args.event.end!),
                entryLanguages: entryLanguages?.map(({ language, ...rest }) => ({ ...rest, language: language.id })),
              });
              setSelectedWeekday(weekday);
              open();
            }}
            eventContent={({ event }) => <QuestionnaireEntry event={event} />}
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
