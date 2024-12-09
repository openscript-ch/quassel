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

  const getTotalRatio = () => f.getValues().languageEntries.reduce((acc, cur) => (acc += cur.ratio), 0);

  const updateRatios = () => {
    const currentEntries = f.getValues().languageEntries;
    const lastEntryIndex = currentEntries.length - 1;

    const avarageRatio = Math.round(100 / currentEntries.length);

    f.setValues({
      languageEntries: currentEntries.map((entry, index) => ({
        ...entry,
        ratio: index === lastEntryIndex ? 100 - lastEntryIndex * avarageRatio : avarageRatio,
      })),
    });
  };

  return (
    <form onSubmit={f.onSubmit(onSave)}>
      <Stack align="flex-start">
        <Select {...f.getInputProps("carerId")} />

        {f.getValues().languageEntries.map((_, index) => (
          // TODO: make key either languageId or name of new language entry
          <Group key={`entry-${index}`}>
            <NumberInput {...f.getInputProps(`languageEntries.${index}.ratio`)} max={100} min={0} />
            <Select {...f.getInputProps(`languageEntries.${index}.languageId`)} />
            {!!index && (
              <ActionIcon
                variant="light"
                onClick={() => {
                  f.removeListItem("languageEntries", index);
                  updateRatios();
                }}
              >
                <IconMinus />
              </ActionIcon>
            )}
          </Group>
        ))}
        <Button
          onClick={() => {
            const currentRatio = getTotalRatio();

            if (currentRatio < 100) {
              f.insertListItem("languageEntries", { ratio: 100 - currentRatio });
            } else {
              f.insertListItem("languageEntries", { ratio: 0 });
              updateRatios();
            }
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
