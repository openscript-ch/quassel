import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { components } from "../../../../api.gen";
import { $api } from "../../../../stores/api";
import { useForm } from "@mantine/form";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { Button, TextInput } from "@quassel/ui";
import { useEffect } from "react";

type FormValues = components["schemas"]["ParticipantMutationDto"];

function AdministrationParticipantsEdit() {
  const p = Route.useParams();
  const q = useQueryClient();
  const participant = useSuspenseQuery(
    $api.queryOptions("get", "/participants/{id}", {
      params: { path: { id: p.id } },
    })
  );
  const n = useNavigate();
  const editParticipantMutation = $api.useMutation("patch", "/participants/{id}", {
    onSuccess: () => {
      q.invalidateQueries(
        $api.queryOptions("get", "/participants/{id}", {
          params: { path: { id: p.id } },
        })
      );
      n({ to: "/administration/participants" });
    },
  });
  const f = useForm<FormValues>({
    initialValues: {
      id: 0,
    },
  });
  const handleSubmit = (values: FormValues) => {
    editParticipantMutation.mutate({
      body: { ...values },
      params: { path: { id: p.id } },
    });
  };

  useEffect(() => {
    f.setValues(participant.data ?? {});
    f.resetDirty();
  }, [participant.isSuccess, participant.data]);

  return (
    <>
      <form autoComplete="off" onSubmit={f.onSubmit(handleSubmit)}>
        <TextInput label="Id" type="text" {...f.getInputProps("id")} required />
        <TextInput label="Birthday" type="date" {...f.getInputProps("birthday")} required />

        <Button type="submit" fullWidth mt="xl" loading={editParticipantMutation.isPending}>
          Change
        </Button>
      </form>
    </>
  );
}

export const Route = createFileRoute("/_auth/administration/participants/edit/$id")({
  loader: ({ params, context: { queryClient } }) =>
    queryClient.ensureQueryData(
      $api.queryOptions("get", "/participants/{id}", {
        params: { path: { id: params.id } },
      })
    ),
  component: AdministrationParticipantsEdit,
});
