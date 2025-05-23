import { components } from "../api.gen";
import { EntitySelect, EntitySelectProps } from "./EntitySelect";

type LanguageSelectProps = EntitySelectProps & {
  data: components["schemas"]["LanguageResponseDto"][];
};

export function LanguageSelect({ value, onChange, data, onAddNew, ...rest }: LanguageSelectProps) {
  return <EntitySelect value={value} onChange={onChange} onAddNew={onAddNew} {...rest} data={data} labelKey="name" />;
}
