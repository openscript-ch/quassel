import { ColumnType, DSVImport, ImportInput, ImportPreview } from "@quassel/ui";
import { createFileRoute } from "@tanstack/react-router";

type BasicType = { childId: string; birthday: string };

const columns: ColumnType<BasicType>[] = [
  { key: "childId", label: "Child ID" },
  { key: "birthday", label: "Birthday" },
];

function AdministrationParticipantsImport() {
  return (
    <div>
      <DSVImport<BasicType> columns={columns}>
        <ImportInput />
        <ImportPreview />
      </DSVImport>
    </div>
  );
}

export const Route = createFileRoute("/_auth/administration/participants/import")({
  component: AdministrationParticipantsImport,
});
