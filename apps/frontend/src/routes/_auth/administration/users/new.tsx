import { useForm } from "@mantine/form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { components, userCreationDtoRoleValues } from "../../../../api.gen";
import { Button, PasswordInput, Select, TextInput } from "@quassel/ui";
import { $api } from "../../../../stores/api";

type FormValues = {
  email: string;
  password: string;
  role?: components["schemas"]["UserCreationDto"]["role"];
};

function AdministrationUsersNew() {
  const n = useNavigate();
  const createUserMutation = $api.useMutation("post", "/users", {
    onSuccess: () => {
      n({ to: "/administration/users" });
    },
  });
  const f = useForm<FormValues>({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
  });
  const handleSubmit = (values: FormValues) => {
    createUserMutation.mutate({ body: values });
  };

  return (
    <>
      <form autoComplete="off" onSubmit={f.onSubmit(handleSubmit)}>
        <TextInput label="Email" type="email" {...f.getInputProps("email")} required />
        <PasswordInput label="Password" {...f.getInputProps("password")} autoComplete="new-password" required />
        <Select label="Role" {...f.getInputProps("role")} data={userCreationDtoRoleValues} />

        <Button type="submit" fullWidth mt="xl" loading={createUserMutation.isPending}>
          Create
        </Button>
      </form>
    </>
  );
}

export const Route = createFileRoute("/_auth/administration/users/new")({
  component: AdministrationUsersNew,
});
