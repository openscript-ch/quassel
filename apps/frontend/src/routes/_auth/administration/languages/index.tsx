import { createFileRoute, Link } from "@tanstack/react-router";
import { $api } from "../../../../stores/api";
import { Button, Table } from "@quassel/ui";
import { useSuspenseQuery } from "@tanstack/react-query";
import { $session } from "../../../../stores/session";
import { useStore } from "@nanostores/react";

function AdministrationLanguageIndex() {
  const sessionStore = useStore($session);
  const languages = useSuspenseQuery($api.queryOptions("get", "/languages"));
  const deleteLanguageMutation = $api.useMutation("delete", "/languages/{id}", {
    onSuccess: () => languages.refetch(),
  });

  return (
    <>
      <Button variant="default" renderRoot={(props) => <Link to="/administration/languages/new" {...props} />}>
        New language
      </Button>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Id</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>IETF BCP 47</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {languages.data?.map((l) => (
            <Table.Tr key={l.id}>
              <Table.Td>{l.id}</Table.Td>
              <Table.Td>{l.name}</Table.Td>
              <Table.Td>{l.ietfBcp47}</Table.Td>
              <Table.Td>
                <Button variant="default" renderRoot={(props) => <Link to={`/administration/languages/edit/${l.id}`} {...props} />}>
                  Edit
                </Button>
                {sessionStore.role === "ADMIN" && (
                  <Button
                    variant="default"
                    onClick={() =>
                      deleteLanguageMutation.mutate({
                        params: { path: { id: l.id.toString() } },
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

export const Route = createFileRoute("/_auth/administration/languages/")({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData($api.queryOptions("get", "/languages")),
  component: AdministrationLanguageIndex,
});
