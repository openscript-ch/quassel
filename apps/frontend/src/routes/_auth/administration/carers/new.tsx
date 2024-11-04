import { useForm } from "@mantine/form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button, TextInput } from "@quassel/ui";
import { $api } from "../../../../stores/api";
import { components } from "../../../../api.gen";

type FormValues = components["schemas"]["CarerCreationDto"];

function AdministrationCarersNew() {
  const n = useNavigate();
  const createCarerMutation = $api.useMutation("post", "/carers", {
    onSuccess: () => {
      n({ to: "/administration/carers" });
    },
  });
  const f = useForm<FormValues>({
    mode: "uncontrolled",
    initialValues: {
      name: "",
    },
  });
  const handleSubmit = (values: FormValues) => {
    createCarerMutation.mutate({ body: values });
  };

  return (
    <>
      <form autoComplete="off" onSubmit={f.onSubmit(handleSubmit)}>
        <TextInput label="Name" type="text" {...f.getInputProps("name")} required />

        <Button type="submit" fullWidth mt="xl" loading={createCarerMutation.isPending}>
          Create
        </Button>
      </form>
    </>
  );
}

export const Route = createFileRoute("/_auth/administration/carers/new")({
  component: AdministrationCarersNew,
});
