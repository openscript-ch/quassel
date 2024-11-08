import { createFileRoute, Link } from "@tanstack/react-router";
import { $api } from "../../../../stores/api";
import { Button, Table } from "@quassel/ui";
import { useSuspenseQuery } from "@tanstack/react-query";

function AdministrationQuestionnairesIndex() {
  const questionnaires = useSuspenseQuery($api.queryOptions("get", "/questionnaires"));
  const deleteQuestionnaireMutation = $api.useMutation("delete", "/questionnaires/{id}", {
    onSuccess: () => questionnaires.refetch(),
  });

  return (
    <>
      <Button variant="default" renderRoot={(props) => <Link to="/administration/questionnaires/new" {...props} />}>
        New questionnaire
      </Button>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Id</Table.Th>
            <Table.Th>Name</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {questionnaires.data?.map((q) => (
            <Table.Tr key={q.id}>
              <Table.Td>{q.id}</Table.Td>
              <Table.Td>
                <Button variant="default" renderRoot={(props) => <Link to={`/administration/questionnaires/edit/${q.id}`} {...props} />}>
                  Edit
                </Button>
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
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
}

export const Route = createFileRoute("/_auth/administration/questionnaires/")({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData($api.queryOptions("get", "/questionnaires")),
  component: () => <AdministrationQuestionnairesIndex />,
});
