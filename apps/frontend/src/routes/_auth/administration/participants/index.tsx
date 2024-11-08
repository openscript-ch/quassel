import { createFileRoute, Link } from "@tanstack/react-router";
import { $api } from "../../../../stores/api";
import { Button, Table } from "@quassel/ui";
import { useSuspenseQuery } from "@tanstack/react-query";

function AdministrationParticipantsIndex() {
  const participants = useSuspenseQuery($api.queryOptions("get", "/participants"));
  const deleteParticipantMutation = $api.useMutation("delete", "/participants/{id}", {
    onSuccess: () => participants.refetch(),
  });

  return (
    <>
      <Button variant="default" renderRoot={(props) => <Link to="/administration/participants/new" {...props} />}>
        New participant
      </Button>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Id</Table.Th>
            <Table.Th>Birthday</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {participants.data?.map((c) => (
            <Table.Tr key={c.id}>
              <Table.Td>{c.id}</Table.Td>
              <Table.Td>{c.birthday}</Table.Td>
              <Table.Td>
                <Button variant="default" renderRoot={(props) => <Link to={`/administration/participants/edit/${c.id}`} {...props} />}>
                  Edit
                </Button>
                <Button
                  variant="default"
                  onClick={() =>
                    deleteParticipantMutation.mutate({
                      params: { path: { id: c.id.toString() } },
                    })
                  }
                >
                  Delete
                </Button>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
}

export const Route = createFileRoute("/_auth/administration/participants/")({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData($api.queryOptions("get", "/participants")),
  component: () => <AdministrationParticipantsIndex />,
});
