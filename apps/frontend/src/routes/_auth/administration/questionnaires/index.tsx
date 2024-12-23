import { createFileRoute, Link } from "@tanstack/react-router";
import { $api } from "../../../../stores/api";
import { Button, Table } from "@quassel/ui";
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
          <Table.Th>Name</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data?.map((q) => (
          <Table.Tr key={q.id}>
            <Table.Td>{q.id}</Table.Td>
            <Table.Td>
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
