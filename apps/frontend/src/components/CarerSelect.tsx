import { $api } from "../stores/api";
import { EntitySelect, EntitySelectProps } from "./EntitySelect";

type CarerSelectProps = EntitySelectProps;

export function CarerSelect({ value, onChange, onAddNew, ...rest }: CarerSelectProps) {
  const { data } = $api.useQuery("get", "/carers");

  return <EntitySelect value={value} onChange={onChange} onAddNew={onAddNew} {...rest} data={data} inputKey="name" />;
}
