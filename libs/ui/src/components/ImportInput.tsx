import { Textarea } from "@mantine/core";
import { useDSVImport } from "react-dsv-import";

export function ImportInput() {
  const [, dispatch] = useDSVImport();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: "setRaw", raw: event.target.value });
  };

  return <Textarea rows={15} onChange={handleChange} />;
}
