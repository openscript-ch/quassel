import { useForm } from "@mantine/form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button, TextInput } from "@quassel/ui";
import { $api } from "../../../../stores/api";
import { components } from "../../../../api.gen";

type FormValues = components["schemas"]["StudyCreationDto"];

function AdministrationStudiesNew() {
  const n = useNavigate();
  const createStudyMutation = $api.useMutation("post", "/studies", {
    onSuccess: () => {
      n({ to: "/administration/studies" });
    },
  });
  const f = useForm<FormValues>({
    mode: "uncontrolled",
    initialValues: {
      id: 0,
      title: "",
      questionnaires: [],
    },
  });
  const handleSubmit = (values: FormValues) => {
    createStudyMutation.mutate({ body: values });
  };

  return (
    <>
      <form autoComplete="off" onSubmit={f.onSubmit(handleSubmit)}>
        <TextInput label="Id" type="number" {...f.getInputProps("id")} defaultValue={undefined} required />
        <TextInput label="Title" type="text" {...f.getInputProps("title")} required />

        <Button type="submit" fullWidth mt="xl" loading={createStudyMutation.isPending}>
          Create
        </Button>
      </form>
    </>
  );
}

export const Route = createFileRoute("/_auth/administration/studies/new")({
  component: AdministrationStudiesNew,
});
