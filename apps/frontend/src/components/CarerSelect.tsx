import { ColorSwatch, Group, useMantineTheme } from "@quassel/ui";
import { components } from "../api.gen";
import { EntitySelect, EntitySelectProps } from "./EntitySelect";

type CarerSelectProps = EntitySelectProps & {
  data: components["schemas"]["CarerResponseDto"][];
};

export function CarerSelect({ value, onChange, onAddNew, data, ...rest }: CarerSelectProps) {
  const theme = useMantineTheme();

  return (
    <EntitySelect
      value={value}
      onChange={onChange}
      onAddNew={onAddNew}
      {...rest}
      renderOption={({ color, name }) => (
        <Group>
          <ColorSwatch size={20} color={color ?? theme.colors[theme.primaryColor][4]} />
          {name}
        </Group>
      )}
      data={data}
      labelKey="name"
    />
  );
}
