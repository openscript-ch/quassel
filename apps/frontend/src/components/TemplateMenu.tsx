import { Button, ColorSwatch, IconChevronDown, Menu, useMantineTheme } from "@quassel/ui";
import { components } from "../api.gen";

type TemplateSelectProps = {
  label: string;
  templates: components["schemas"]["EntryTemplateDto"][];
  onSelect: (value: components["schemas"]["EntryTemplateDto"]) => void;
};

export function TemplateMenu({ label, templates, onSelect }: TemplateSelectProps) {
  const theme = useMantineTheme();

  return (
    <Menu position="bottom-end">
      <Menu.Target>
        <Button variant="outline" rightSection={<IconChevronDown />}>
          {label}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {templates.map((t) => (
          <>
            <Menu.Item
              onClick={() => onSelect(t)}
              leftSection={<ColorSwatch color={t.carer.color ?? theme.colors[theme.primaryColor][4]} />}
            >{`${t.carer.name}: ${t.entryLanguages.map(({ language, ratio }) => `${ratio} ${language.name}`).join(", ")}`}</Menu.Item>
          </>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
