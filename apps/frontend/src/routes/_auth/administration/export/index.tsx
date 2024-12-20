import { Button, Group, Radio, Stack, useForm } from "@quassel/ui";
import { createFileRoute } from "@tanstack/react-router";
import { $api } from "../../../../stores/api";
import { i18n } from "../../../../stores/i18n";
import { useStore } from "@nanostores/react";

const messages = i18n("AdministrationExportIndexRoute", {
  title: "Carers",
  formatLabel: "File format",
  csvLabel: "Comma-separated values (CSV)",
  sqlLabel: "Database export (SQL)",
  formAction: "Download",
});

type FormValues = {
  fileType?: "csv" | "sql";
  studyId?: string;
  period?: [Date, Date];
};

function AdministrationExportIndex() {
  const t = useStore(messages);
  const f = useForm<FormValues>({
    mode: "uncontrolled",
    initialValues: {},
  });

  const { isDownloading, downloadFile } = $api.useDownload("/export", "dump.sql");
  return (
    <form onSubmit={f.onSubmit(() => downloadFile())}>
      <Stack>
        <Radio.Group label={t.formatLabel}>
          <Group>
            <Radio value="csv" label={t.csvLabel} />
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
  component: AdministrationExportIndex,
});
