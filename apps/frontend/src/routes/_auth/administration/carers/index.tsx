import { createFileRoute, Link } from "@tanstack/react-router";
import { $api } from "../../../../stores/api";
import { Button, Table } from "@quassel/ui";
import { useSuspenseQuery } from "@tanstack/react-query";

function AdministrationCarerIndex() {
  const carers = useSuspenseQuery($api.queryOptions("get", "/carers"));
  const deleteUserMutation = $api.useMutation("delete", "/carers/{id}", {
    onSuccess: () => carers.refetch(),
  });

  return (
    <>
      <Button variant="default" renderRoot={(props) => <Link to="/administration/carers/new" {...props} />}>
        New carer
      </Button>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Id</Table.Th>
            <Table.Th>Name</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {carers.data?.map((c) => (
            <Table.Tr key={c.id}>
              <Table.Td>{c.id}</Table.Td>
              <Table.Td>{c.name}</Table.Td>
              <Table.Td>
                <Button variant="default" renderRoot={(props) => <Link to={`/administration/carers/edit/${c.id}`} {...props} />}>
                  Edit
                </Button>
                <Button
                  variant="default"
                  onClick={() =>
                    deleteUserMutation.mutate({
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

export const Route = createFileRoute("/_auth/administration/carers/")({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData($api.queryOptions("get", "/carers")),
  component: () => <AdministrationCarerIndex />,
});
