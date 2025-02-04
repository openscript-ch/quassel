import { Button, isNotEmpty, Select, Table, useForm } from "@quassel/ui";
import { createFileRoute } from "@tanstack/react-router";
import { $api } from "../../../../stores/api";
import { i18n } from "../../../../stores/i18n";
import { useStore } from "@nanostores/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { components, operations } from "../../../../api.gen";
import { $session } from "../../../../stores/session";
import { useState } from "react";

const messages = i18n("AdministrationExportIndexRoute", {
  title: "Carers",
  studyLabel: "Study",
  studyPlaceholder: "Select a study",
  formatLabel: "File format",
  csvLabel: "Comma-separated values (CSV)",
  sqlLabel: "Database export (SQL)",
  formAction: "Download",
});

type FormValues = Pick<NonNullable<operations["ExportController_get"]["parameters"]["query"]>, "studyId">;

function AdministrationExportIndex() {
  const t = useStore(messages);

  const session = useStore($session);

  const [type, setType] = useState<components["schemas"]["ExportType"]>("csv");

  const f = useForm<FormValues>({
    mode: "uncontrolled",
    validate: {
      studyId(value) {
        if (type === "csv") return isNotEmpty()(value);
      },
    },
  });

  const studies = useSuspenseQuery($api.queryOptions("get", "/studies"));
  const { isDownloading, downloadFile } = $api.useDownload("/export", "dump.sql", { params: { query: { ...f.getValues(), type } } });

  return (
    <form onSubmit={f.onSubmit(downloadFile)}>
      <Table>
        <Table.Tbody>
          <Table.Tr>
            <Table.Th>{t.csvLabel}</Table.Th>
            <Table.Td>
              <Select
                {...f.getInputProps("studyId")}
                placeholder={t.studyPlaceholder}
                data={studies.data.map((s) => ({ label: s.title, value: s.id.toString() }))}
              />
            </Table.Td>
            <Table.Td>
              <Button type="submit" onClick={() => setType("csv")} loading={isDownloading}>
                {t.formAction}
              </Button>
            </Table.Td>
          </Table.Tr>
          {session.role === "ADMIN" && (
            <Table.Tr>
              <Table.Th>{t.sqlLabel}</Table.Th>
              <Table.Td></Table.Td>
              <Table.Td>
                <Button type="submit" onClick={() => setType("sql")} loading={isDownloading}>
                  {t.formAction}
                </Button>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </form>
  );
}

export const Route = createFileRoute("/_auth/administration/export/")({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData($api.queryOptions("get", "/studies"));
  },
  component: AdministrationExportIndex,
});
