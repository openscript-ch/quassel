import { createFileRoute, Link } from "@tanstack/react-router";
import { $api } from "../../../../stores/api";
import { Button, Group, Table } from "@quassel/ui";
import { $session } from "../../../../stores/session";
import { useStore } from "@nanostores/react";

function AdministrationQuestionnairesIndex() {
  const sessionStore = useStore($session);
  const { data, refetch } = $api.useSuspenseQuery("get", "/questionnaires");
  const deleteQuestionnaireMutation = $api.useMutation("delete", "/questionnaires/{id}", {
    onSuccess: () => refetch(),
  });

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Id</Table.Th>
          <Table.Th>Child</Table.Th>
          <Table.Th>Title</Table.Th>
          <Table.Th>Study</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data?.map((q) => (
          <Table.Tr key={q.id}>
            <Table.Td>{q.id}</Table.Td>
            <Table.Td>{q.participant.id}</Table.Td>
            <Table.Td>{q.title}</Table.Td>
            <Table.Td>{q.study.title}</Table.Td>
            <Table.Td>
              <Group>
                <Button variant="default" renderRoot={(props) => <Link to={`/administration/questionnaires/edit/${q.id}`} {...props} />}>
                  Edit
                </Button>
                {sessionStore.role === "ADMIN" && (
                  <Button
                    variant="default"
                    onClick={() =>
                      deleteQuestionnaireMutation.mutate({
                        params: { path: { id: q.id.toString() } },
                      })
                    }
                  >
                    Delete
                  </Button>
                )}
              </Group>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}

export const Route = createFileRoute("/_auth/administration/questionnaires/")({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData($api.queryOptions("get", "/questionnaires")),
  component: () => <AdministrationQuestionnairesIndex />,
});
