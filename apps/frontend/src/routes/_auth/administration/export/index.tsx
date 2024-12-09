import { Button } from "@quassel/ui";
import { createFileRoute } from "@tanstack/react-router";
import { useDownload } from "../../../../hooks/useDownload";

function AdministrationExportIndex() {
  const { downloadFile } = useDownload("/export", "dump.sql");
  return (
    <div>
      <Button onClick={() => downloadFile()}>Download</Button>
    </div>
  );
}

export const Route = createFileRoute("/_auth/administration/export/")({
  component: AdministrationExportIndex,
});
