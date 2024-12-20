import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { components, userMutationDtoRoleValues } from "../../../../api.gen";
import { $api } from "../../../../stores/api";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { Button, PasswordInput, Select, TextInput, useForm } from "@quassel/ui";
import { useEffect } from "react";

type FormValues = components["schemas"]["UserMutationDto"];

function AdministrationUsersEdit() {
  const p = Route.useParams();
  const q = useQueryClient();
  const user = useSuspenseQuery($api.queryOptions("get", "/users/{id}", { params: { path: { id: p.id } } }));
  const n = useNavigate();
  const editUserMutation = $api.useMutation("patch", "/users/{id}", {
    onSuccess: () => {
      q.invalidateQueries($api.queryOptions("get", "/users/{id}", { params: { path: { id: p.id } } }));
      n({ to: "/administration/users" });
    },
  });
  const f = useForm<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
  });
  const handleSubmit = (values: FormValues) => {
    const { password, ...v } = values;
    editUserMutation.mutate({ body: { ...v, password: password || undefined }, params: { path: { id: p.id } } });
  };

  useEffect(() => {
    f.setValues(user.data ?? {});
    f.resetDirty();
  }, [user.isSuccess, user.data]);

  return (
    <form autoComplete="off" onSubmit={f.onSubmit(handleSubmit)}>
      <TextInput label="Email" type="email" {...f.getInputProps("email")} />
      <PasswordInput label="Password" {...f.getInputProps("password")} autoComplete="new-password" />
      <Select label="Role" data={userMutationDtoRoleValues} {...f.getInputProps("role")} />

      <Button type="submit" fullWidth mt="xl" loading={editUserMutation.isPending}>
        Change
      </Button>
    </form>
  );
}

export const Route = createFileRoute("/_auth/administration/users/edit/$id")({
  loader: ({ params, context: { queryClient } }) =>
    queryClient.ensureQueryData($api.queryOptions("get", "/users/{id}", { params: { path: { id: params.id } } })),
  component: AdministrationUsersEdit,
});
