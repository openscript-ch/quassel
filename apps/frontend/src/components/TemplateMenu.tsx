import { Button, ColorSwatch, IconChevronDown, Menu, ScrollArea, useMantineTheme } from "@quassel/ui";
import { components } from "../api.gen";
import { useState } from "react";
import { C } from "../configuration";

type TemplateSelectProps = {
  label: string;
  templates: components["schemas"]["EntryTemplateDto"][];
  onSelect: (value: components["schemas"]["EntryTemplateDto"]) => void;
};

export function TemplateMenu({ label, templates, onSelect }: TemplateSelectProps) {
  const theme = useMantineTheme();
  const [availableHeight, setAvailbleHeight] = useState(C.ui.maxDropdownHeight);

  return (
    <Menu
      position="bottom-end"
      middlewares={{
        size: {
          apply: ({ availableHeight }) => {
            setAvailbleHeight(availableHeight - 15);
          },
        },
      }}
    >
      <Menu.Target>
        <Button variant="outline" rightSection={<IconChevronDown />}>
          {label}
        </Button>
      </Menu.Target>

      <Menu.Dropdown maw={400}>
        <ScrollArea.Autosize type="scroll" mah={availableHeight && Math.min(availableHeight, C.ui.maxDropdownHeight)}>
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
        </ScrollArea.Autosize>
      </Menu.Dropdown>
    </Menu>
  );
}
