import { Button, Stack, Table } from "@quassel/ui";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { format, i18n } from "../../../../stores/i18n";
import { useStore } from "@nanostores/react";
import { $questionnaire } from "../../../../stores/questionnaire";

export const messages = i18n("questionnaireParticipant", {
  title: "Participant",
  participantLabel: "Child",
  studyLabel: "Study",
  birthdateMissing: "Birthdate missing",
  formAction: "Continue",
});

function QuestionnaireParticipant() {
  const n = useNavigate();

  const t = useStore(messages);
  const { time } = useStore(format);

  const questionnaire = useStore($questionnaire);
  const birthday = questionnaire?.participant.birthday;
  const latestQuestionnaire = questionnaire?.participant.latestQuestionnaire;

  const handleSubmit = () => {
    if (!latestQuestionnaire || latestQuestionnaire.completedAt) {
      n({ to: "/questionnaire/new" });
    } else {
      n({
        to: "/questionnaire/$id/entries",
        params: { id: latestQuestionnaire.id.toString() },
      });
    }
  };

  return (
    <>
      <h3>{t.title}</h3>
      <Stack>
        <Table>
          <Table.Tbody>
            <Table.Tr>
              <Table.Th>{t.participantLabel}</Table.Th>
              <Table.Td>{questionnaire?.participant.id}</Table.Td>
              <Table.Td>{birthday ? time(new Date(birthday)) : <i>{t.birthdateMissing}</i>}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th>{t.studyLabel}</Table.Th>
              <Table.Td>{questionnaire?.study.id}</Table.Td>
              <Table.Td>{questionnaire?.study.title}</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
        <form onSubmit={handleSubmit}>
          <Button type="submit">{t.formAction}</Button>
        </form>
      </Stack>
    </>
  );
}

export const Route = createFileRoute("/_auth/questionnaire/_questionnaire/participant")({
  component: QuestionnaireParticipant,
});
