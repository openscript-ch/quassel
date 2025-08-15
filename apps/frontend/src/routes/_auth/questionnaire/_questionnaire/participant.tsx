import { Alert, Button, Group, Stack, Table, Title } from "@quassel/ui";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { format, i18n } from "../../../../stores/i18n";
import { useStore } from "@nanostores/react";
import { $questionnaire } from "../../../../stores/questionnaire";
import { params } from "@nanostores/i18n";
import { $api } from "../../../../stores/api";

export const messages = i18n("questionnaireParticipant", {
  title: "Participant",
  participantLabel: "Child",
  studyLabel: "Study",
  birthdateMissing: "Birthdate missing",
  formAction: "Continue",
  backAction: "Back",
  assignStudyInfoTitle: "New study",
  assignStudyInfoDescription: params(
    'This child {participantId} wasn\'t previously linked to the study "{studyTitle}". Continuing will associate all questionnaire data with the study "{studyTitle}".'
  ),
});

function QuestionnaireParticipant() {
  const n = useNavigate();

  const t = useStore(messages);
  const { time } = useStore(format);

  const questionnaire = useStore($questionnaire);
  const birthday = questionnaire?.participant.birthday;
  const latestQuestionnaire = questionnaire?.participant.latestQuestionnaire;

  const isParticipantAssignedToStudy = questionnaire?.study.participants.some((p) => p.id === questionnaire.participant.id);

  const mutation = $api.useMutation("post", "/study-participants");

  const handleSubmit = async () => {
    if (!isParticipantAssignedToStudy) {
      await mutation.mutateAsync({ body: { participantId: questionnaire!.participant.id, studyId: questionnaire!.study.id } });
    }

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
      <Title order={3}>{t.title}</Title>
      <Stack>
        <Table>
          <Table.Tbody>
            <Table.Tr>
              <Table.Th>{t.participantLabel}</Table.Th>
              <Table.Td>{questionnaire?.participant.id}</Table.Td>
              <Table.Td>{birthday ? time(new Date(birthday), { timeZone: "UTC" }) : <i>{t.birthdateMissing}</i>}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th>{t.studyLabel}</Table.Th>
              <Table.Td>{questionnaire?.study.id}</Table.Td>
              <Table.Td>{questionnaire?.study.title}</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
        {!isParticipantAssignedToStudy && (
          <Alert variant="light" icon={"i"} title={t.assignStudyInfoTitle}>
            {t.assignStudyInfoDescription({ participantId: questionnaire?.participant.id ?? "", studyTitle: questionnaire?.study.title ?? "" })}
          </Alert>
        )}

        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <Group>
            <Button component={Link} to="/questionnaire" variant="light">
              {t.backAction}
            </Button>
            <Button type="submit" loading={mutation.isPending}>
              {t.formAction}
            </Button>
          </Group>
        </form>
      </Stack>
    </>
  );
}

export const Route = createFileRoute("/_auth/questionnaire/_questionnaire/participant")({
  component: QuestionnaireParticipant,
});
