import { createFileRoute, Link } from "@tanstack/react-router";
import { $api } from "../../../../stores/api";
import { Button, Table } from "@quassel/ui";
import { useSuspenseQuery } from "@tanstack/react-query";
import { $session } from "../../../../stores/session";
import { useStore } from "@nanostores/react";

function AdministrationStudiesIndex() {
  const sessionStore = useStore($session);
  const studies = useSuspenseQuery($api.queryOptions("get", "/studies"));
  const deleteStudyMutation = $api.useMutation("delete", "/studies/{id}", {
    onSuccess: () => studies.refetch(),
  });

  return (
    <>
      <Button variant="default" renderRoot={(props) => <Link to="/administration/studies/new" {...props} />}>
        New study
      </Button>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Id</Table.Th>
            <Table.Th>Title</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {studies.data?.map((s) => (
            <Table.Tr key={s.id}>
              <Table.Td>{s.id}</Table.Td>
              <Table.Td>{s.title}</Table.Td>
              <Table.Td>
                <Button variant="default" renderRoot={(props) => <Link to={`/administration/studies/edit/${s.id}`} {...props} />}>
                  Edit
                </Button>
                {sessionStore.role === "ADMIN" && (
                  <Button
                    variant="default"
                    onClick={() =>
                      deleteStudyMutation.mutate({
                        params: { path: { id: s.id.toString() } },
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
    </>
  );
}

export const Route = createFileRoute("/_auth/administration/studies/")({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData($api.queryOptions("get", "/studies")),
  component: () => <AdministrationStudiesIndex />,
});
