import { Button, Group, Radio, Select, Stack, useForm } from "@quassel/ui";
import { createFileRoute } from "@tanstack/react-router";
import { $api } from "../../../../stores/api";
import { i18n } from "../../../../stores/i18n";
import { useStore } from "@nanostores/react";
import { useSuspenseQuery } from "@tanstack/react-query";

const messages = i18n("AdministrationExportIndexRoute", {
  title: "Carers",
  studyLabel: "Study",
  studyPlaceholder: "Select a study",
  formatLabel: "File format",
  csvLabel: "Comma-separated values (CSV)",
  sqlLabel: "Database export (SQL)",
  formAction: "Download",
});

type FormValues = {
  fileType: "csv" | "sql";
  studyId?: string;
};

function AdministrationExportIndex() {
  const t = useStore(messages);
  const f = useForm<FormValues>({
    mode: "uncontrolled",
    initialValues: {
      fileType: "csv",
    },
  });

  const studies = useSuspenseQuery($api.queryOptions("get", "/studies"));
  const { isDownloading, downloadFile } = $api.useDownload("/export", "dump.sql");
  return (
    <form onSubmit={f.onSubmit(() => downloadFile())}>
      <Stack>
        <Select
          label={t.studyLabel}
          placeholder={t.studyPlaceholder}
          data={studies.data.map((s) => ({ label: s.title, value: s.id.toString() }))}
        />
        <Radio.Group label={t.formatLabel} withAsterisk {...f.getInputProps("fileType")}>
          <Group>
            <Radio checked value="csv" label={t.csvLabel} />
            <Radio value="sql" label={t.sqlLabel} />
          </Group>
        </Radio.Group>
        <Button type="submit" loading={isDownloading}>
          {t.formAction}
        </Button>
      </Stack>
    </form>
  );
}

export const Route = createFileRoute("/_auth/administration/export/")({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData($api.queryOptions("get", "/studies"));
  },
  component: AdministrationExportIndex,
});
