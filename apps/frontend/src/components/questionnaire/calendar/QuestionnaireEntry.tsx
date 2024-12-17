import { EventImpl } from "@fullcalendar/core/internal";
import { ExtendedEvent } from "../../../routes/_auth/questionnaire/_questionnaire/$id/entries";
import { IconRepeat, Stack, Text } from "@quassel/ui";
import { i18n } from "../../../stores/i18n";
import { params } from "@nanostores/i18n";
import { useStore } from "@nanostores/react";

type QuestionnaireEntryProps = {
  event: EventImpl;
};

const messages = i18n("questionnaireEntries", {
  labelRecurringWeekly: params("{weeks} weeks"),
});

export function QuestionnaireEntry({ event }: QuestionnaireEntryProps) {
  const { entryLanguages, weeklyRecurring } = event.extendedProps as ExtendedEvent["extendedProps"];

  const t = useStore(messages);

  return (
    <Stack gap={0}>
      <Text size="sm" fw="bold" truncate>
        {event.title}
      </Text>
      {entryLanguages.map(({ language }) => language.ietfBcp47).join(", ")}
      {weeklyRecurring && weeklyRecurring > 1 && (
        <Text mt="sm" size="sm">
          <IconRepeat size={13} /> {t.labelRecurringWeekly({ weeks: weeklyRecurring })}
        </Text>
      )}
    </Stack>
  );
}
