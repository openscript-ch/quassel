import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { components } from "../../../../api.gen";
import { $api } from "../../../../stores/api";
import { useForm } from "@mantine/form";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { Button, TextInput } from "@quassel/ui";
import { useEffect } from "react";

type FormValues = components["schemas"]["StudyMutationDto"];

function AdministrationStudiesEdit() {
  const p = Route.useParams();
  const q = useQueryClient();
  const study = useSuspenseQuery(
    $api.queryOptions("get", "/studies/{id}", {
      params: { path: { id: p.id } },
    })
  );
  const n = useNavigate();
  const editStudyMutation = $api.useMutation("patch", "/studies/{id}", {
    onSuccess: () => {
      q.invalidateQueries(
        $api.queryOptions("get", "/studies/{id}", {
          params: { path: { id: p.id } },
        })
      );
      n({ to: "/administration/studies" });
    },
  });
  const f = useForm<FormValues>();
  const handleSubmit = (values: FormValues) => {
    editStudyMutation.mutate({
      body: { ...values },
      params: { path: { id: p.id } },
    });
  };

  useEffect(() => {
    f.setValues(study.data ?? {});
    f.resetDirty();
  }, [study.isSuccess, study.data]);

  return (
    <>
      <form autoComplete="off" onSubmit={f.onSubmit(handleSubmit)}>
        <TextInput label="Id" type="number" {...f.getInputProps("id")} required />
        <TextInput label="Title" type="text" {...f.getInputProps("title")} required />

        <Button type="submit" fullWidth mt="xl" loading={editStudyMutation.isPending}>
          Change
        </Button>
      </form>
    </>
  );
}

export const Route = createFileRoute("/_auth/administration/studies/edit/$id")({
  loader: ({ params, context: { queryClient } }) =>
    queryClient.ensureQueryData(
      $api.queryOptions("get", "/studies/{id}", {
        params: { path: { id: params.id } },
      })
    ),
  component: AdministrationStudiesEdit,
});
