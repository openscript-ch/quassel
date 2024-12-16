import { Table, TableData } from "@mantine/core";
import { useDSVImport } from "react-dsv-import";

export function ImportPreview() {
  const [context] = useDSVImport();

  const data: TableData = {
    head: context.columns.map((c) => c.label),
    body: context.parsed?.map((r) => context.columns.map((c) => r[c.key])),
  };

  return <Table data={data} />;
}
