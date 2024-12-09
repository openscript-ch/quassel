import { $api } from "../stores/api";
import { EntitySelect, EntitySelectProps } from "./EntitySelect";

type CarerSelectProps = EntitySelectProps;

export function CarerSelect({ value, onChange, ...rest }: CarerSelectProps) {
  const { data } = $api.useQuery("get", "/carers");

  return <EntitySelect value={value} onChange={onChange} {...rest} data={data} buildLabel={(carer) => carer.name} />;
}
