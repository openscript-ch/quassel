import { createFileRoute, Link } from "@tanstack/react-router";
import { $api } from "../../../../stores/api";
import { Button, Table } from "@quassel/ui";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useStore } from "@nanostores/react";
import { $session } from "../../../../stores/session";

function AdministrationUsersIndex() {
  const sessionStore = useStore($session);
  const users = useSuspenseQuery($api.queryOptions("get", "/users"));
  const deleteUserMutation = $api.useMutation("delete", "/users/{id}", { onSuccess: () => users.refetch() });

  return (
    <>
      <Button variant="default" renderRoot={(props) => <Link to="/administration/users/new" {...props} />}>
        New user
      </Button>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Id</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Role</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {users.data?.map((u) => (
            <Table.Tr key={u.id}>
              <Table.Td>{u.id}</Table.Td>
              <Table.Td>{u.email}</Table.Td>
              <Table.Td>{u.role}</Table.Td>
              <Table.Td>
                <Button variant="default" renderRoot={(props) => <Link to={`/administration/users/edit/${u.id}`} {...props} />}>
                  Edit
                </Button>
                {sessionStore.role === "ADMIN" && (
                  <Button variant="default" onClick={() => deleteUserMutation.mutate({ params: { path: { id: u.id.toString() } } })}>
                    Delete
                  </Button>
                )}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
}

export const Route = createFileRoute("/_auth/administration/users/")({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData($api.queryOptions("get", "/users")),
  component: AdministrationUsersIndex,
});
