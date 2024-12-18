import FullCalendar from "@fullcalendar/react";
import interactionPlugin, { EventResizeStopArg } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventDropArg, EventInput } from "@fullcalendar/core";
import { formatDate, getDateFromTimeAndWeekday, getTime, isSame, Modal, useDisclosure, useMantineTheme } from "@quassel/ui";
import { QuestionnaireEntry } from "./QuestionnaireEntry";
import { components } from "../../../api.gen";
import { EntityForm, EntryFormValues } from "./EntryForm";
import { useState } from "react";
import { i18n } from "../../../stores/i18n";
import { useStore } from "@nanostores/react";

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
  editable: true,
  selectAllow: ({ start, end }) => isSame("day", start, end),
  selectable: true,
  selectLongPressDelay: 200,
  eventLongPressDelay: 400,
};

export type ExtendedEvent = EventInput & { extendedProps: { entryLanguages: components["schemas"]["EntryLanguageResponseDto"][] } };

export type EntryCalendarProps = {
  entries: components["schemas"]["QuestionnaireEntryDto"][];
  onAddEntry: (entry: EntryFormValues, weekday: number) => Promise<unknown>;
  onUpdateEntry: (id: number, entry: Partial<EntryFormValues>, weekday: number) => Promise<unknown>;
  onDeleteEntry: (id: number) => Promise<unknown>;
  carers: components["schemas"]["CarerDto"][];
  languages: components["schemas"]["LanguageDto"][];
  onAddCarer: (value: string) => Promise<number>;
  onAddLanguage: (value: string) => Promise<number>;
};

const messages = i18n("entryCalendar", {
  actionAdd: "Add",
  actionUpdate: "Update",
});

export function EntryCalendar({
  entries,
  onAddEntry,
  onUpdateEntry,
  onDeleteEntry,
  carers,
  languages,
  onAddCarer,
  onAddLanguage,
}: EntryCalendarProps) {
  const theme = useMantineTheme();

  const t = useStore(messages);

  const [opened, { open, close }] = useDisclosure();

  const [selectedWeekday, setSelectedWeekday] = useState<number>();
  const [entryUpdatingId, setEntryUpdadingId] = useState<number>();
  const [entryDraft, setEntryDraft] = useState<Partial<EntryFormValues>>();

  const events: ExtendedEvent[] =
    entries.map(({ startedAt, endedAt, weekday, carer, entryLanguages, id }) => ({
      id: id.toString(),
      start: getDateFromTimeAndWeekday(startedAt, weekday),
      end: getDateFromTimeAndWeekday(endedAt, weekday),
      title: carer.name,
      extendedProps: { entryLanguages },
      backgroundColor: theme.colors[theme.primaryColor][4],
    })) ?? [];

  const handleMove = ({ event: { id, start, end } }: EventDropArg | EventResizeStopArg) => {
    onUpdateEntry(parseInt(id), { startedAt: getTime(start!), endedAt: getTime(end!) }, start!.getDay());
  };

  const handleOnSave = async (entry: EntryFormValues) => {
    if (!selectedWeekday) return;

    if (!entryUpdatingId) {
      await onAddEntry(entry, selectedWeekday);
    } else {
      await onUpdateEntry(entryUpdatingId, entry, selectedWeekday);
    }
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} size="md">
        <EntityForm
          onAddCarer={onAddCarer}
          onAddLanguage={onAddLanguage}
          onSave={handleOnSave}
          onDelete={entryUpdatingId ? () => onDeleteEntry(entryUpdatingId).then(close) : undefined}
          entry={entryDraft}
          carers={carers}
          languages={languages}
          actionLabel={entryUpdatingId ? t.actionUpdate : t.actionAdd}
        />
      </Modal>
      <FullCalendar
        {...calendarBaseConfig}
        plugins={[timeGridPlugin, interactionPlugin]}
        events={events}
        select={({ start, end }) => {
          setEntryDraft({ startedAt: getTime(start), endedAt: getTime(end) });
          setSelectedWeekday(start.getDay());
          open();
        }}
        eventClick={({ event }) => {
          const { carer, entryLanguages, id, weekday, ...rest } = entries?.find((entry) => entry.id.toString() === event.id) ?? {};

          setEntryDraft({
            carer: carer?.id,
            entryLanguages: entryLanguages?.map(({ language, ...rest }) => ({ ...rest, language: language.id })),
            ...rest,
            startedAt: getTime(event.start!),
            endedAt: getTime(event.end!),
          });
          setSelectedWeekday(weekday);
          setEntryUpdadingId(id);
          open();
        }}
        eventResize={handleMove}
        eventDrop={handleMove}
        eventContent={({ event }) => <QuestionnaireEntry event={event} />}
      />
    </>
  );
}
