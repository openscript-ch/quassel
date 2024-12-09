import { $api } from "../stores/api";
import { EntitySelect, EntitySelectProps } from "./EntitySelect";

type LanguageSelectProps = EntitySelectProps;

export function LanguageSelect({ value, onChange }: LanguageSelectProps) {
  const { data } = $api.useQuery("get", "/languages");

  return <EntitySelect value={value} onChange={onChange} data={data} buildLabel={(language) => language.name} searchable />;
}
