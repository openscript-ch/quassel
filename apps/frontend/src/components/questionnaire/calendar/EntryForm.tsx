import { useForm } from "@mantine/form";
import { Button, Group, Select, Stack, TimeInput, NumberInput, ActionIcon, IconMinus } from "@quassel/ui";
import { i18n } from "../../../stores/i18n";
import { useStore } from "@nanostores/react";

type FormValues = {
  carerId?: number;
  languageEntries: {
    ratio: number;
    languageId?: number;
  }[];
  startedAt: string;
  endedAt: string;
};

const messages = i18n("entityForm", {
  addDialectAction: "Add dialect",
});

type EntityFormProps = {
  onSave: (entity: FormValues) => void;
  actionLabel: string;
};

export function EntityForm({ onSave, actionLabel }: EntityFormProps) {
  const t = useStore(messages);
  const f = useForm<FormValues>({
    initialValues: {
      startedAt: "",
      endedAt: "",
      languageEntries: [
        {
          ratio: 100,
        },
      ],
    },
  });

  return (
    <form onSubmit={f.onSubmit(onSave)}>
      <Stack align="flex-start">
        <Select {...f.getInputProps("carerId")} />

        {f.getValues().languageEntries.map((entry, index) => (
          <Group key={entry.languageId}>
            <NumberInput {...f.getInputProps(`languageEntries.${index}.ratio`)} max={100} min={0} />
            <Select {...f.getInputProps(`languageEntries.${index}.languageId`)} />
            {!!index && (
              <ActionIcon
                variant="light"
                onClick={() => {
                  f.removeListItem("languageEntries", index);
                }}
              >
                <IconMinus />
              </ActionIcon>
            )}
          </Group>
        ))}
        <Button
          onClick={() => {
            f.insertListItem("languageEntries", { ratio: 100 });
          }}
          variant="light"
        >
          {t.addDialectAction}
        </Button>

        <TimeInput {...f.getInputProps("startedAt")} />
        <TimeInput {...f.getInputProps("endedAt")} />

        <Button>{actionLabel}</Button>
      </Stack>
    </form>
  );
}
