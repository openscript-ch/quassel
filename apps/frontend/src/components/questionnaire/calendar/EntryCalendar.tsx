import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { DateSelectArg, EventChangeArg, EventInput } from "@fullcalendar/core";
import { Button, Modal, useDisclosure, useMantineTheme } from "@quassel/ui";
import { GapsPerDay, getDateFromTimeAndWeekday, getNext, getTime, groupByWeekday, isSame } from "@quassel/utils";
import { QuestionnaireEntry } from "./QuestionnaireEntry";
import { components } from "../../../api.gen";
import { EntityForm, EntryFormValues } from "./EntryForm";
import { useEffect, useState } from "react";
import { format, i18n } from "../../../stores/i18n";
import { useStore } from "@nanostores/react";
import { EventImpl } from "@fullcalendar/core/internal";
import styles from "./EntryCalendar.module.css";
import { $layout } from "../../../stores/layout";
import { C } from "../../../configuration";

const calendarBaseConfig: FullCalendar["props"] = {
  allDaySlot: false,
  headerToolbar: false,
  slotMinTime: C.calendar.minTime,
  slotMaxTime: C.calendar.maxTime,
  slotDuration: { hour: 1 },
  firstDay: 1,
  locale: "en-GB",
  expandRows: true,
  editable: true,
  selectAllow: ({ start, end }) => {
    end.setTime(end.getTime() - 1000);
    return isSame("day", start, end);
  },
  selectable: true,
  selectLongPressDelay: 200,
  eventLongPressDelay: 400,
};

export type ExtendedEvent = EventInput & {
  extendedProps?: { entryLanguages: components["schemas"]["EntryLanguageResponseDto"][]; weeklyRecurring?: number };
};

export type EntryCalendarProps = {
  entries: components["schemas"]["EntryResponseDto"][];
  gaps?: GapsPerDay;
  onAddEntry: (entry: EntryFormValues) => Promise<unknown>;
  onUpdateEntry: (id: number, entry: Partial<EntryFormValues>) => Promise<unknown>;
  onDeleteEntry: (id: number) => Promise<unknown>;
  carers: components["schemas"]["CarerResponseDto"][];
  languages: components["schemas"]["LanguageResponseDto"][];
  templates: components["schemas"]["EntryTemplateDto"][];
  onAddCarer: (value: string) => Promise<number>;
  onAddLanguage: (value: string) => Promise<number>;
};

const messages = i18n("entryCalendar", {
  actionAdd: "Add",
  actionUpdate: "Update",
});

export function EntryCalendar({
  entries,
  gaps,
  onAddEntry,
  onUpdateEntry,
  onDeleteEntry,
  carers,
  languages,
  templates,
  onAddCarer,
  onAddLanguage,
}: EntryCalendarProps) {
  const theme = useMantineTheme();

  const t = useStore(messages);
  const { time } = useStore(format);

  const { fullscreen, admin } = useStore($layout);

  const [opened, { open, close }] = useDisclosure();

  const [entryUpdatingId, setEntryUpdadingId] = useState<number>();
  const [entryDraft, setEntryDraft] = useState<Partial<EntryFormValues>>();

  const [events, setEvents] = useState<ExtendedEvent[]>([]);

  useEffect(() => {
    if (entries) {
      setEvents([
        ...entries.map(({ startedAt, endedAt, weekday, carer, weeklyRecurring, entryLanguages, id }) => ({
          id: id.toString(),
          start: getDateFromTimeAndWeekday(startedAt, weekday),
          end: getDateFromTimeAndWeekday(endedAt, weekday),
          title: carer.name,
          extendedProps: { entryLanguages, weeklyRecurring },
          backgroundColor: carer.color ?? theme.colors[theme.primaryColor][4],
          borderColor: carer.color ?? theme.colors[theme.primaryColor][4],
        })),
        // gaps
        ...(gaps ?? []).flatMap((dailyGaps, index) =>
          dailyGaps.map((gap) => ({
            start: getDateFromTimeAndWeekday(gap[0], index),
            end: getDateFromTimeAndWeekday(gap[1], index),
            className: styles.eventGapIndicator,
            groupId: "gaps",
            editable: false,
          }))
        ),
        // sleep indications
        ...groupByWeekday(entries).flatMap((entries, index) => {
          const minStart = entries.reduce((acc, cur) => (acc.startedAt < cur.startedAt ? acc : cur)).startedAt;
          const maxEnd = entries.reduce((acc, cur) => (acc.endedAt > cur.endedAt ? acc : cur)).endedAt;

          return [
            {
              start: getDateFromTimeAndWeekday("05:00:00", index),
              end: getDateFromTimeAndWeekday(minStart, index),
              backgroundColor: theme.colors.uzhBlue[9],
              className: styles.eventSleepIndicator,
              display: "background",
            },
            {
              start: getDateFromTimeAndWeekday(maxEnd, index),
              end: getDateFromTimeAndWeekday("23:59:59", index),
              backgroundColor: theme.colors.uzhBlue[9],
              className: styles.eventSleepIndicator,
              display: "background",
            },
          ];
        }),
      ]);
    }
  }, [entries, gaps]);

  const setupEntryUpdate = (event: EventImpl) => {
    const { carer, entryLanguages, id, weekday, ...rest } = entries?.find((entry) => entry.id.toString() === event.id) ?? {};

    setEntryDraft({
      carer: carer?.id,
      entryLanguages: entryLanguages?.map(({ language, ...rest }) => ({ ...rest, language: language.id })),
      ...rest,
      startedAt: getTime(event.start!),
      endedAt: getTime(event.end!),
      weekday,
    });
    setEntryUpdadingId(id);
    open();
  };

  const setupEntryCreate = ({ start, end }: DateSelectArg | EventImpl) => {
    if (!start || !end) return;
    if (end.getHours() === 0 && end.getMinutes() === 0) end.setTime(end.getTime() - 1000);

    setEntryDraft({ startedAt: getTime(start), endedAt: getTime(end), weekday: start!.getDay() });
    setEntryUpdadingId(undefined);
    open();
  };

  const handleEventChange = ({ event: { id, start, end } }: EventChangeArg) => {
    if (!start || !end) return;

    if (end.getMinutes() === 59 && end.getHours() < 23) {
      end = getNext("hour", end);
    }

    const startTime = getTime(start) < C.calendar.minTime ? C.calendar.minTime : getTime(start);
    const endTime = isSame("day", start, end) ? getTime(end) : C.calendar.maxTime;

    setEvents(events.map((e) => (e.id === id ? { ...e, start: start!, end: end! } : e)));

    onUpdateEntry(parseInt(id), { startedAt: startTime, endedAt: endTime, weekday: start!.getDay() });
  };

  const handleOnSave = async (entry: EntryFormValues) => {
    if (!entryUpdatingId) {
      await onAddEntry(entry);
    } else {
      await onUpdateEntry(entryUpdatingId, entry);
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
          templates={templates}
          actionLabel={entryUpdatingId ? t.actionUpdate : t.actionAdd}
        />
      </Modal>
      <FullCalendar
        {...calendarBaseConfig}
        plugins={[timeGridPlugin, interactionPlugin]}
        events={events}
        viewClassNames={fullscreen || admin ? styles.spaciousCalendar : undefined}
        dayHeaderContent={({ date }) => (
          <Button
            variant="subtle"
            onClick={() => {
              setEntryDraft({ weekday: date.getDay() });
              setEntryUpdadingId(undefined);
              open();
            }}
          >
            {time(date, { weekday: "long" })}
          </Button>
        )}
        select={setupEntryCreate}
        eventClick={({ event }) => {
          if (event.groupId === "gaps" || event.display === "background") {
            setupEntryCreate(event);
          } else {
            setupEntryUpdate(event);
          }
        }}
        eventChange={handleEventChange}
        eventContent={({ event }) => <QuestionnaireEntry event={event} />}
      />
    </>
  );
}
