import { useForm } from "@mantine/form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button, TextInput } from "@quassel/ui";
import { $api } from "../../../../stores/api";
import { components } from "../../../../api.gen";

type FormValues = components["schemas"]["LanguageCreationDto"];

function AdministrationLanguagesNew() {
  const n = useNavigate();
  const createLanguageMutation = $api.useMutation("post", "/languages", {
    onSuccess: () => {
      n({ to: "/administration/languages" });
    },
  });
  const f = useForm<FormValues>({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      ietfBcp47: "",
    },
  });
  const handleSubmit = (values: FormValues) => {
    createLanguageMutation.mutate({ body: values });
  };

  return (
    <>
      <form autoComplete="off" onSubmit={f.onSubmit(handleSubmit)}>
        <TextInput label="Name" type="text" {...f.getInputProps("name")} required />
        <TextInput label="IETF BCP 47" type="text" {...f.getInputProps("ietfBcp47")} />

        <Button type="submit" fullWidth mt="xl" loading={createLanguageMutation.isPending}>
          Create
        </Button>
      </form>
    </>
  );
}

export const Route = createFileRoute("/_auth/administration/languages/new")({
  component: AdministrationLanguagesNew,
});
