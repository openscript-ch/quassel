import { Button } from "@quassel/ui";
import { createFileRoute } from "@tanstack/react-router";
import { $api } from "../../../../stores/api";

function AdministrationExportIndex() {
  const { downloadFile } = $api.useDownload("/export", "dump.sql");
  return (
    <div>
      <Button onClick={() => downloadFile()}>Download</Button>
    </div>
  );
}

export const Route = createFileRoute("/_auth/administration/export/")({
  component: AdministrationExportIndex,
});
