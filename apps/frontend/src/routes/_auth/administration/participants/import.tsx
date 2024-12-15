import { createFileRoute } from "@tanstack/react-router";
import { ColumnType, DSVImport } from "react-dsv-import";

type BasicType = { forename: string; surname: string; email: string };

const columns: ColumnType<BasicType>[] = [
  { key: "forename", label: "Forename" },
  { key: "surname", label: "Surname" },
  { key: "email", label: "Email" },
];

function AdministrationParticipantsImport() {
  return (
    <div>
      <DSVImport<BasicType> columns={columns}>
        <DSVImport.TextareaInput />
        <DSVImport.TablePreview />
      </DSVImport>
    </div>
  );
}

export const Route = createFileRoute("/_auth/administration/participants/import")({
  component: AdministrationParticipantsImport,
});
