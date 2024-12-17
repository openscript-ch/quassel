import {
  Button,
  formatDate,
  getDateFromTimeAndWeekday,
  Group,
  Stack,
  useMantineTheme,
  useDisclosure,
  Modal,
  getTime,
  notifications,
} from "@quassel/ui";
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
import { useQueryClient } from "@tanstack/react-query";

export type ExtendedEvent = EventInput & {
  extendedProps: { entryLanguages: components["schemas"]["EntryLanguageResponseDto"][]; weeklyRecurring?: number };
};

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
  notificationSuccessCreateLanguage: "Successfully add a new language.",
  notificationSuccessCreateCarer: "Successfully add a new carer.",
});

function QuestionnaireEntries() {
  const n = useNavigate();
  const p = Route.useParams();

  const t = useStore(messages);

  const c = useQueryClient();

  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure();

  const [selectedWeekday, setSelectedWeekday] = useState<number>();
  const [entryUpdatingId, setEntryUpdadingId] = useState<number>();
  const [entryDraft, setEntryDraft] = useState<Partial<EntryFormValues>>();

  const createMutation = $api.useMutation("post", "/entries");
  const updateMutation = $api.useMutation("patch", "/entries/{id}");
  const deleteMutation = $api.useMutation("delete", "/entries/{id}");
  const { data: questionnaire, refetch } = $api.useSuspenseQuery("get", "/questionnaires/{id}", { params: { path: { id: p.id } } });

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

  const events: ExtendedEvent[] =
    questionnaire.entries?.map(({ startedAt, endedAt, weekday, carer, entryLanguages, id, weeklyRecurring }) => ({
      id: id.toString(),
      start: getDateFromTimeAndWeekday(startedAt, weekday),
      end: getDateFromTimeAndWeekday(endedAt, weekday),
      title: carer.name,
      extendedProps: { entryLanguages, weeklyRecurring },
      backgroundColor: theme.colors[theme.primaryColor][4],
    })) ?? [];

  const reset = () => {
    refetch();
    close();
    setSelectedWeekday(undefined);
    setEntryUpdadingId(undefined);
  };

  const handleCreate = ({ carer, ...rest }: EntryFormValues) => {
    if (selectedWeekday === undefined) return;

    const entryRequest = {
      ...rest,
      carer: carer!,
      weekday: selectedWeekday,
      questionnaire: questionnaire.id,
    };

    createMutation.mutate({ body: entryRequest }, { onSuccess: reset });
  };

  const handleUpdate = (id: number, { carer, ...rest }: Partial<EntryFormValues>, weekday?: number) => {
    const entryRequest = {
      ...rest,
      carer: carer!,
      weekday,
      questionnaire: questionnaire.id,
    };

    updateMutation.mutate({ body: entryRequest, params: { path: { id: id.toString() } } }, { onSuccess: reset });
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate({ params: { path: { id: id.toString() } } }, { onSuccess: reset });
  };

  const handleOnSave = (entry: EntryFormValues | Partial<EntryFormValues>) => {
    if (!entryUpdatingId) {
      handleCreate(entry as EntryFormValues);
    } else {
      handleUpdate(entryUpdatingId, entry);
    }
  };

  const handleSubmit = () => {
    n({ to: "/questionnaire/$id/remarks", params: p });
  };

  return (
    <>
      <Modal opened={opened} onClose={close} size="md">
        <EntityForm
          onAddCarer={(name) => createCarerMutation.mutateAsync({ body: { name, participant: participantId } }).then(({ id }) => id)}
          onAddLanguage={(name) => createLanguageMutation.mutateAsync({ body: { name, participant: participantId } }).then(({ id }) => id)}
          onSave={handleOnSave}
          onDelete={entryUpdatingId ? () => handleDelete(entryUpdatingId) : undefined}
          entry={entryDraft}
          carers={carers ?? []}
          languages={languages ?? []}
          actionLabel={t.addEntityLabel}
        />
      </Modal>
      <form onSubmit={handleSubmit}>
        <Stack>
          <FullCalendar
            {...calendarBaseConfig}
            plugins={[timeGridPlugin, interactionPlugin]}
            editable
            events={events}
            selectable
            select={({ start, end }) => {
              setEntryDraft({ startedAt: getTime(start), endedAt: getTime(end) });
              setSelectedWeekday(start.getDay());
              open();
            }}
            eventClick={(args) => {
              const { carer, entryLanguages, id, weeklyRecurring } =
                questionnaire.entries?.find((entry) => entry.id.toString() === args.event.id) ?? {};

              setEntryDraft({
                carer: carer?.id,
                startedAt: getTime(args.event.start!),
                endedAt: getTime(args.event.end!),
                entryLanguages: entryLanguages?.map(({ language, ...rest }) => ({ ...rest, language: language.id })),
                weeklyRecurring,
              });
              setEntryUpdadingId(id);
              open();
            }}
            eventResize={({ event: { id, start, end } }) => {
              handleUpdate(parseInt(id), { startedAt: getTime(start!), endedAt: getTime(end!) });
            }}
            eventDrop={({ event: { id, start, end } }) => {
              handleUpdate(parseInt(id), { startedAt: getTime(start!), endedAt: getTime(end!) }, start!.getDay());
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
