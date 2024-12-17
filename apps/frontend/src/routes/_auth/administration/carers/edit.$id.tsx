import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { components } from "../../../../api.gen";
import { $api } from "../../../../stores/api";
import { useQueryClient } from "@tanstack/react-query";
import { Button, TextInput, useForm } from "@quassel/ui";
import { useEffect } from "react";

type FormValues = components["schemas"]["CarerMutationDto"];

function AdministrationCarersEdit() {
  const p = Route.useParams();
  const q = useQueryClient();
  const { data, isSuccess } = $api.useSuspenseQuery("get", "/carers/{id}", { params: { path: { id: p.id } } });
  const n = useNavigate();
  const editCarerMutation = $api.useMutation("patch", "/carers/{id}", {
    onSuccess: () => {
      q.invalidateQueries(
        $api.queryOptions("get", "/carers/{id}", {
          params: { path: { id: p.id } },
        })
      );
      n({ to: "/administration/carers" });
    },
  });
  const f = useForm<FormValues>({
    initialValues: {
      name: "",
    },
  });
  const handleSubmit = (values: FormValues) => {
    editCarerMutation.mutate({
      body: { ...values },
      params: { path: { id: p.id } },
    });
  };

  useEffect(() => {
    f.setValues({ ...data, participant: data.participant?.id });
    f.resetDirty();
  }, [isSuccess, data]);

  return (
    <>
      <form autoComplete="off" onSubmit={f.onSubmit(handleSubmit)}>
        <TextInput label="Name" type="name" {...f.getInputProps("name")} />

        <Button type="submit" fullWidth mt="xl" loading={editCarerMutation.isPending}>
          Change
        </Button>
      </form>
    </>
  );
}

export const Route = createFileRoute("/_auth/administration/carers/edit/$id")({
  loader: ({ params, context: { queryClient } }) =>
    queryClient.ensureQueryData(
      $api.queryOptions("get", "/carers/{id}", {
        params: { path: { id: params.id } },
      })
    ),
  component: AdministrationCarersEdit,
});
