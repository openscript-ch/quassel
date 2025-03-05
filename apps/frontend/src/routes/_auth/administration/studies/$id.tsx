import { createFileRoute } from "@tanstack/react-router";
import { $api } from "../../../../stores/api";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { ActionIcon, Stack, Table, Title, IconTrash } from "@quassel/ui";

function AdministrationStudiesEdit() {
  const p = Route.useParams();
  const q = useQueryClient();
  const study = useSuspenseQuery(
    $api.queryOptions("get", "/studies/{id}", {
      params: { path: { id: p.id } },
    })
  );
  const removeParticipantMutation = $api.useMutation("delete", "/study-participants", {
    onSuccess: () => {
      q.invalidateQueries(
        $api.queryOptions("get", "/studies/{id}", {
          params: { path: { id: p.id } },
        })
      );
    },
  });

  return (
    <Stack>
      <Table>
        <Table.Tr>
          <Table.Th>Id</Table.Th>
          <Table.Td>{study.data.id}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Title</Table.Th>
          <Table.Td>{study.data.title}</Table.Td>
        </Table.Tr>
      </Table>
      <Title order={3}>Participants</Title>
      <Table>
        <Table.Tr>
          <Table.Th>ID</Table.Th>
          <Table.Th>Birthday</Table.Th>
          <Table.Th></Table.Th>
        </Table.Tr>
        {study.data?.participants.map((p) => (
          <Table.Tr key={p.id}>
            <Table.Td>{p.id}</Table.Td>
            <Table.Td>{p.birthday}</Table.Td>
            <Table.Td>
              <ActionIcon onClick={() => removeParticipantMutation.mutate({ body: { participantId: p.id, studyId: study.data.id } })}>
                <IconTrash />
              </ActionIcon>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table>
    </Stack>
  );
}

export const Route = createFileRoute("/_auth/administration/studies/$id")({
  loader: ({ params, context: { queryClient } }) =>
    queryClient.ensureQueryData(
      $api.queryOptions("get", "/studies/{id}", {
        params: { path: { id: params.id } },
      })
    ),
  component: AdministrationStudiesEdit,
});
