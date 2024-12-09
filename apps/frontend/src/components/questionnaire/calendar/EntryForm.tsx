import { isInRange, isNotEmpty, useForm } from "@mantine/form";
import { Button, Group, Stack, TimeInput, NumberInput, ActionIcon, IconMinus } from "@quassel/ui";
import { i18n } from "../../../stores/i18n";
import { useStore } from "@nanostores/react";
import { useEffect } from "react";
import { CarerSelect } from "../../CarerSelect";
import { LanguageSelect } from "../../LanguageSelect";

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
  validationRatio: "Ratio must be between 1 and 100.",
  validationTotalRatio: "Total Ratio must always be 100%.",
  validationNotEmpty: "Field must not be empty.",
});

type EntityFormProps = {
  onSave: (entity: FormValues) => void;
  entry?: Partial<FormValues>;
  actionLabel: string;
};

export function EntityForm({ onSave, actionLabel, entry }: EntityFormProps) {
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
    validate: {
      startedAt: isNotEmpty(t.validationNotEmpty),
      endedAt: isNotEmpty(t.validationNotEmpty),
      carerId: isNotEmpty(t.validationNotEmpty),
      languageEntries: {
        ratio: (value) => {
          const fieldError = isInRange({ min: 1, max: 100 }, t.validationRatio)(value);
          if (fieldError) return fieldError;

          const listError = getTotalRatio() !== 100;
          if (listError) return t.validationTotalRatio;
        },
        languageId: isNotEmpty(t.validationNotEmpty),
      },
    },
  });

  useEffect(() => {
    if (entry) {
      f.setValues(entry);
      f.resetDirty();
    }
  }, [entry]);

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
        <CarerSelect {...f.getInputProps("carerId")} />

        {f.getValues().languageEntries.map((_, index) => (
          // TODO: make key either languageId or name of new language entry
          <Group key={`entry-${index}`}>
            <NumberInput {...f.getInputProps(`languageEntries.${index}.ratio`)} max={100} min={1} />
            <LanguageSelect {...f.getInputProps(`languageEntries.${index}.languageId`)} />
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

        <Button type="submit">{actionLabel}</Button>
      </Stack>
    </form>
  );
}
