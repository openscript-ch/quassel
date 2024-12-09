import { Button, formatDate, getDateFromTimeAndWeekday, Group, Stack, useMantineTheme, useDisclosure, Modal, getTime } from "@quassel/ui";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { i18n } from "../../../../../stores/i18n";
import { useStore } from "@nanostores/react";
import { $api } from "../../../../../stores/api";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventInput } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import { useSuspenseQuery } from "@tanstack/react-query";
import { components } from "../../../../../api.gen";
import { QuestionnaireEntry } from "../../../../../components/questionnaire/calendar/QuestionnaireEntry";
import { EntityForm } from "../../../../../components/questionnaire/calendar/EntryForm";
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

  const [selectedStartTime, setSelectedStartTime] = useState<string>();
  const [selectedEndTime, setSelectedEndTime] = useState<string>();

  const { data: questionnaire } = useSuspenseQuery($api.queryOptions("get", "/questionnaires/{id}", { params: { path: { id: p.id } } }));

  const events: ExtendedEvent[] =
    questionnaire.entries?.map(({ startedAt, endedAt, weekday, carer, entryLanguages }) => ({
      start: getDateFromTimeAndWeekday(startedAt, weekday),
      end: getDateFromTimeAndWeekday(endedAt, weekday),
      title: carer.name,
      extendedProps: { entryLanguages },
      backgroundColor: theme.colors[theme.primaryColor][4],
    })) ?? [];

  const handleSubmit = () => {
    n({ to: "/questionnaire/$id/remarks", params: p });
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="test" centered size="md">
        <EntityForm
          onSave={console.log}
          entry={!!selectedStartTime && !!selectedEndTime ? { startedAt: selectedStartTime, endedAt: selectedEndTime } : undefined}
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
            select={(args) => {
              setSelectedStartTime(getTime(args.start));
              setSelectedEndTime(getTime(args.end));
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
