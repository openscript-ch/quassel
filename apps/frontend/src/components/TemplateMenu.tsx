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

      <Menu.Dropdown maw={400}>
        {templates.map((t) => {
          const label = `${t.carer.name}: ${t.entryLanguages.map(({ language, ratio }) => `${ratio}% ${language.name}`).join(", ")}`;
          return (
            <Menu.Item
              key={label}
              onClick={() => onSelect(t)}
              leftSection={<ColorSwatch size={20} color={t.carer.color ?? theme.colors[theme.primaryColor][4]} />}
            >
              {label}
            </Menu.Item>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
}
