import { Button, isNotEmpty, Select, Table, useForm } from "@quassel/ui";
import { createFileRoute } from "@tanstack/react-router";
import { i18n } from "../../../../stores/i18n";
import { useStore } from "@nanostores/react";
import { $api } from "../../../../stores/api";
import { operations } from "../../../../api.gen";
import { useSuspenseQuery } from "@tanstack/react-query";

type FormValues = NonNullable<operations["ReportsController_get"]["parameters"]["query"]>;

export const Route = createFileRoute("/_auth/administration/reports/")({
  component: AdministrationReportsIndex,
});

const messages = i18n("AdministrationReportsIndexRoute", {
  exportAction: "Export",
  studyPlaceholder: "Select a study",
});

function AdministrationReportsIndex() {
  const t = useStore(messages);

  const f = useForm<FormValues>({
    validate: {
      studyId: isNotEmpty(),
    },
    initialValues: { studyId: "" },
  });

  const studies = useSuspenseQuery($api.queryOptions("get", "/studies"));
  const { downloadFile, isDownloading } = $api.useDownload("/reports", "bla blab bla", { params: { query: f.getValues() } });

  return (
    <form onSubmit={f.onSubmit(downloadFile)}>
      <Table>
        <Table.Tr>
          <Table.Th>Evaluated language exposure</Table.Th>
          <Table.Td>
            <Select
              {...f.getInputProps("studyId")}
              placeholder={t.studyPlaceholder}
              data={studies.data.map((s) => ({ label: s.title, value: s.id.toString() }))}
            />
          </Table.Td>
          <Table.Td>
            <Button type="submit" loading={isDownloading}>
              {t.exportAction}
            </Button>
          </Table.Td>
        </Table.Tr>
      </Table>
    </form>
  );
}
