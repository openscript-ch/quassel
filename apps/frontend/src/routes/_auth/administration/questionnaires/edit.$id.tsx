import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { components } from "../../../../api.gen";
import { $api } from "../../../../stores/api";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { Button, TextInput, useForm } from "@quassel/ui";
import { useEffect } from "react";

type FormValues = components["schemas"]["QuestionnaireMutationDto"];

function AdministrationQuestionnairesEdit() {
  const p = Route.useParams();
  const q = useQueryClient();
  const { data, isSuccess } = useSuspenseQuery(
    $api.queryOptions("get", "/questionnaires/{id}", {
      params: { path: { id: p.id } },
    })
  );
  const n = useNavigate();
  const editQuestionnaireMutation = $api.useMutation("patch", "/questionnaires/{id}", {
    onSuccess: () => {
      q.invalidateQueries(
        $api.queryOptions("get", "/questionnaires/{id}", {
          params: { path: { id: p.id } },
        })
      );
      n({ to: "/administration/questionnaires" });
    },
  });
  const f = useForm<FormValues>();
  const handleSubmit = (values: FormValues) => {
    editQuestionnaireMutation.mutate({
      body: { ...values },
      params: { path: { id: p.id } },
    });
  };

  useEffect(() => {
    f.setValues({ title: data.title });
    f.resetDirty();
  }, [isSuccess, data]);

  return (
    <form autoComplete="off" onSubmit={f.onSubmit(handleSubmit)}>
      <TextInput label="Name" type="name" {...f.getInputProps("title")} />

      <Button type="submit" fullWidth mt="xl" loading={editQuestionnaireMutation.isPending}>
        Change
      </Button>
    </form>
  );
}

export const Route = createFileRoute("/_auth/administration/questionnaires/edit/$id")({
  loader: ({ params, context: { queryClient } }) =>
    queryClient.ensureQueryData(
      $api.queryOptions("get", "/questionnaires/{id}", {
        params: { path: { id: params.id } },
      })
    ),
  component: AdministrationQuestionnairesEdit,
});
