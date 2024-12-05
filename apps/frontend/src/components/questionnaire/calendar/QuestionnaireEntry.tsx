import { EventImpl } from "@fullcalendar/core/internal";
import { ExtendedEvent } from "../../../routes/_auth/questionnaire/_questionnaire/$id/entries";
import { Flex } from "@quassel/ui";

type QuestionnaireEntryProps = {
  event: EventImpl;
};

export function QuestionnaireEntry({ event }: QuestionnaireEntryProps) {
  return (
    <Flex direction={"column"}>
      <span>{event.title}</span>
      <span>{(event.extendedProps as ExtendedEvent["extendedProps"]).entryLanguages.map(({ language }) => language.name).join(", ")}</span>
    </Flex>
  );
}
