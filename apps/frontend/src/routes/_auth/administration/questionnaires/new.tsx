import { useForm } from "@mantine/form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button, TextInput } from "@quassel/ui";
import { $api } from "../../../../stores/api";
import { components } from "../../../../api.gen";

type FormValues = components["schemas"]["QuestionnaireCreationDto"];

function AdministrationQuestionnairesNew() {
  const n = useNavigate();
  const createQuestionnaireMutation = $api.useMutation("post", "/questionnaires", {
    onSuccess: () => {
      n({ to: "/administration/questionnaires" });
    },
  });
  const f = useForm<FormValues>({
    mode: "uncontrolled",
    initialValues: {
      title: "",
    },
  });
  const handleSubmit = (values: FormValues) => {
    createQuestionnaireMutation.mutate({ body: values });
  };

  return (
    <>
      <form autoComplete="off" onSubmit={f.onSubmit(handleSubmit)}>
        <TextInput label="Title" type="text" {...f.getInputProps("title")} required />

        <Button type="submit" fullWidth mt="xl" loading={createQuestionnaireMutation.isPending}>
          Create
        </Button>
      </form>
    </>
  );
}

export const Route = createFileRoute("/_auth/administration/questionnaires/new")({
  component: AdministrationQuestionnairesNew,
});
