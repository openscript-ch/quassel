import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { $api } from "../../../../stores/api";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { Button, DateInput, Stack, TextInput, useForm } from "@quassel/ui";
import { useEffect } from "react";
import { toMantineUTCDate } from "@quassel/utils";

type FormValues = {
  id: string;
  birthday: string;
};

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
  const f = useForm<FormValues>();
  const handleSubmit = ({ id, birthday }: FormValues) => {
    editParticipantMutation.mutate({
      body: { id: +id, birthday },
      params: { path: { id: p.id } },
    });
  };

  useEffect(() => {
    const { birthday, id } = participant.data;

    f.setValues({ birthday: birthday && toMantineUTCDate(birthday), id: id.toString() });
  }, [participant.isSuccess, participant.data]);

  return (
    <>
      <form autoComplete="off" onSubmit={f.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput label="Id" type="text" {...f.getInputProps("id")} required />
          <DateInput label="Birthday" {...f.getInputProps("birthday")} required />

          <Button type="submit" fullWidth loading={editParticipantMutation.isPending}>
            Change
          </Button>
        </Stack>
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
