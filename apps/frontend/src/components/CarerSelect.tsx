import { components } from "../api.gen";
import { EntitySelect, EntitySelectProps } from "./EntitySelect";

type CarerSelectProps = EntitySelectProps & {
  data: components["schemas"]["CarerDto"][];
};

export function CarerSelect({ value, onChange, onAddNew, data, ...rest }: CarerSelectProps) {
  return <EntitySelect value={value} onChange={onChange} onAddNew={onAddNew} {...rest} data={data} inputKey="name" />;
}
