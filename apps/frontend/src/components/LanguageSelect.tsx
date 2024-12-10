import { $api } from "../stores/api";
import { EntitySelect, EntitySelectProps } from "./EntitySelect";

type LanguageSelectProps = EntitySelectProps;

export function LanguageSelect({ value, onChange, ...rest }: LanguageSelectProps) {
  const { data } = $api.useQuery("get", "/languages");

  return <EntitySelect value={value} onChange={onChange} searchable {...rest} data={data} buildLabel={(language) => language.name} />;
}
