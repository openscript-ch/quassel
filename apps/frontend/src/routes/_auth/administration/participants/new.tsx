import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button, TextInput, useForm } from "@quassel/ui";
import { $api } from "../../../../stores/api";
import { components } from "../../../../api.gen";

type FormValues = components["schemas"]["ParticipantCreationDto"];

function AdministrationParticipantsNew() {
  const n = useNavigate();
  const createParticipantMutation = $api.useMutation("post", "/participants", {
    onSuccess: () => {
      n({ to: "/administration/participants" });
    },
  });
  const f = useForm<FormValues>({
    mode: "uncontrolled",
    initialValues: {
      id: 0,
      birthday: "",
    },
  });
  const handleSubmit = (values: FormValues) => {
    createParticipantMutation.mutate({ body: values });
  };

  return (
    <form autoComplete="off" onSubmit={f.onSubmit(handleSubmit)}>
      <TextInput label="Id" type="number" {...f.getInputProps("id")} defaultValue={undefined} required />
      <TextInput label="Birthday" type="date" {...f.getInputProps("birthday")} required />

      <Button type="submit" fullWidth mt="xl" loading={createParticipantMutation.isPending}>
        Create
      </Button>
    </form>
  );
}

export const Route = createFileRoute("/_auth/administration/participants/new")({
  component: AdministrationParticipantsNew,
});
