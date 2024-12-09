import { Select, SelectProps } from "@quassel/ui";

export type EntitySelectProps = Omit<SelectProps, "value" | "onChange"> & {
  value?: number;
  onChange?: (id?: number) => void;
};

type Props<T extends { id: number }> = Omit<EntitySelectProps, "data"> & {
  data?: T[];
  buildLabel: (value: T) => string;
};

export function EntitySelect<T extends { id: number }>({ value, onChange, data, buildLabel, ...rest }: Props<T>) {
  return (
    <Select
      value={value?.toString()}
      onChange={(value) => onChange?.(value ? parseInt(value) : undefined)}
      data={data?.map((entity) => ({ value: entity.id.toString(), label: buildLabel(entity) })) ?? []}
      {...rest}
    />
  );
}
