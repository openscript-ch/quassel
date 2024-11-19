import { Button, Stack, TextInput } from "@quassel/ui";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { i18n } from "../../../stores/i18n";
import { useStore } from "@nanostores/react";
import { useForm } from "@mantine/form";
import { $api } from "../../../stores/api";
import { $questionnaire } from "../../../stores/questionnaire";

type FormValues = {
  participantId: string;
  studyId: string;
};

export const messages = i18n("questionnaire", {
  title: "Start new questionnaire",
  participantIdLabel: "Child ID",
  studyIdLabel: "Study ID",
  formAction: "Continue",
});

function Questionnaire() {
  const n = useNavigate();

  const t = useStore(messages);

  const f = useForm<FormValues>();

  const validateParticipantMutation = $api.useMutation("get", "/participants/{id}", {
    onError(error) {
      if (error.statusCode === 404) {
        f.setFieldError("participantId", "Participant not found.");
      }
    },
  });
  const validateStudyMutation = $api.useMutation("get", "/studies/{id}", {
    onError(error) {
      if (error.statusCode === 404) {
        f.setFieldError("studyId", "Study not found.");
      }
    },
  });

  const handleSubmit = async (values: FormValues) => {
    const participantCheck = validateParticipantMutation.mutateAsync({
      params: { path: { id: values.participantId } },
    });
    const studyCheck = validateStudyMutation.mutateAsync({
      params: { path: { id: values.studyId } },
    });

    Promise.all([participantCheck, studyCheck]).then(([participant, study]) => {
      $questionnaire.set({ participant, study });
      n({ to: "/questionnaire/participant" });
    });
  };

  return (
    <>
      <h3>{t.title}</h3>
      <form onSubmit={f.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput required label={t.participantIdLabel} {...f.getInputProps("participantId")} />
          <TextInput required label={t.studyIdLabel} {...f.getInputProps("studyId")} />
          <Button type="submit">{t.formAction}</Button>
        </Stack>
      </form>
    </>
  );
}

export const Route = createFileRoute("/_auth/questionnaire/")({
  component: Questionnaire,
});
