import { createFileRoute, Link } from "@tanstack/react-router";
import { $api } from "../../../../stores/api";
import { Button, Table } from "@quassel/ui";
import { useSuspenseQuery } from "@tanstack/react-query";
import { $session } from "../../../../stores/session";
import { useStore } from "@nanostores/react";
import { format } from "../../../../stores/i18n";

function AdministrationParticipantsIndex() {
  const { time } = useStore(format);
  const sessionStore = useStore($session);
  const participants = useSuspenseQuery($api.queryOptions("get", "/participants"));
  const deleteParticipantMutation = $api.useMutation("delete", "/participants/{id}", {
    onSuccess: () => participants.refetch(),
  });

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Id</Table.Th>
          <Table.Th>Birthday</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {participants.data?.map((p) => (
          <Table.Tr key={p.id}>
            <Table.Td>{p.id}</Table.Td>
            <Table.Td>{p.birthday && time(new Date(p.birthday))}</Table.Td>
            <Table.Td>
              <Button variant="default" renderRoot={(props) => <Link to={`/administration/participants/edit/${p.id}`} {...props} />}>
                Edit
              </Button>
              {sessionStore.role === "ADMIN" && (
                <Button
                  variant="default"
                  onClick={() =>
                    deleteParticipantMutation.mutate({
                      params: { path: { id: p.id.toString() } },
                    })
                  }
                >
                  Delete
                </Button>
              )}
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}

export const Route = createFileRoute("/_auth/administration/participants/")({
  beforeLoad: () => ({
    actions: [
      <Button key="new-participant" variant="default" renderRoot={(props) => <Link to="/administration/participants/new" {...props} />}>
        New participant
      </Button>,
      <Button key="import-participants" variant="default" renderRoot={(props) => <Link to="/administration/participants/import" {...props} />}>
        Import participants
      </Button>,
    ],
  }),
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData($api.queryOptions("get", "/participants")),
  component: () => <AdministrationParticipantsIndex />,
});
