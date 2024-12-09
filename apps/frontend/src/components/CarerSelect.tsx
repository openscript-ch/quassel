import { $api } from "../stores/api";
import { EntitySelect, EntitySelectProps } from "./EntitySelect";

type CarerSelectProps = EntitySelectProps;

export function CarerSelect({ value, onChange }: CarerSelectProps) {
  const { data } = $api.useQuery("get", "/carers");

  return <EntitySelect value={value} onChange={onChange} data={data} buildLabel={(carer) => carer.name} />;
}
