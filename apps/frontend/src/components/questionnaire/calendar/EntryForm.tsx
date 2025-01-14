import { Button, Group, Stack, TimeInput, NumberInput, ActionIcon, IconMinus, isInRange, isNotEmpty, useForm, Switch, Flex } from "@quassel/ui";
import { i18n } from "../../../stores/i18n";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import { CarerSelect } from "../../CarerSelect";
import { LanguageSelect } from "../../LanguageSelect";
import { components } from "../../../api.gen";
import { TemplateMenu } from "../../TemplateMenu";

export type EntryFormValues = {
  carer?: number;
  entryLanguages: {
    id?: number;
    ratio: number;
    language?: number;
  }[];
  weeklyRecurring?: number;
  startedAt: string;
  endedAt: string;
};

const messages = i18n("entityForm", {
  actionAddLanguage: "Add language",
  actionAddRecurringRule: "Add recurring rule",
  actionDelete: "Delete",
  labelCarer: "Carer",
  labelLanguage: "Language",
  labelRecurringRulePrefix: "Recurs every",
  labelRecurringRuleSuffix: "weeks.",
  labelTemplate: "From template",
  validationRatio: "Ratio must be between 1 and 100.",
  validationTotalRatio: "Total Ratio must always be 100%.",
  validationNotEmpty: "Field must not be empty.",
});

type EntityFormProps = {
  onSave: (entity: EntryFormValues) => void;
  onDelete?: () => void;
  onAddCarer: (value: string) => Promise<number>;
  onAddLanguage: (value: string) => Promise<number>;
  entry?: Partial<EntryFormValues>;
  carers: components["schemas"]["CarerDto"][];
  languages: components["schemas"]["LanguageDto"][];
  templates: components["schemas"]["EntryTemplateDto"][];
  actionLabel: string;
};

export function EntityForm({ onSave, onDelete, onAddCarer, onAddLanguage, actionLabel, entry, carers, languages, templates }: EntityFormProps) {
  const t = useStore(messages);
  const f = useForm<EntryFormValues>({
    initialValues: {
      startedAt: "",
      endedAt: "",
      entryLanguages: [
        {
          ratio: 100,
        },
      ],
    },
    validate: {
      startedAt: isNotEmpty(t.validationNotEmpty),
      endedAt: isNotEmpty(t.validationNotEmpty),
      carer: isNotEmpty(t.validationNotEmpty),
      entryLanguages: {
        ratio: (value) => {
          const fieldError = isInRange({ min: 1, max: 100 }, t.validationRatio)(value);
          if (fieldError) return fieldError;

          const listError = getTotalRatio() !== 100;
          if (listError) return t.validationTotalRatio;
        },
        language: isNotEmpty(t.validationNotEmpty),
      },
    },
  });

  const [showRecurringRule, setShowRecurringRule] = useState(false);

  useEffect(() => {
    if (entry) {
      f.setValues(entry);
      f.resetDirty();

      if (entry.weeklyRecurring && entry.weeklyRecurring > 1) {
        setShowRecurringRule(true);
      }
    }
  }, [entry]);

  const getTotalRatio = () => f.getValues().entryLanguages.reduce((acc, cur) => (acc += cur.ratio), 0);

  const updateRatios = () => {
    const currentEntries = f.getValues().entryLanguages;
    const lastEntryIndex = currentEntries.length - 1;

    const avarageRatio = Math.round(100 / currentEntries.length);

    f.setValues({
      entryLanguages: currentEntries.map((entry, index) => ({
        ...entry,
        ratio: index === lastEntryIndex ? 100 - lastEntryIndex * avarageRatio : avarageRatio,
      })),
    });
  };

  return (
    <form
      onSubmit={(event) => {
        f.onSubmit(onSave)(event);
        event.stopPropagation();
      }}
    >
      <Stack>
        <Flex>
          <CarerSelect data={carers} {...f.getInputProps("carer")} onAddNew={onAddCarer} placeholder={t.labelCarer} flex={1} />
          <TemplateMenu
            label={t.labelTemplate}
            templates={templates}
            onSelect={({ carer, entryLanguages }) => {
              f.setValues({
                carer: carer.id,
                entryLanguages: entryLanguages.map(({ language, ratio }) => ({ language: language.id, ratio })),
              });
            }}
          />
        </Flex>

        {f.getValues().entryLanguages.map((value, index, array) => (
          <Group key={value.language ? `l-${value.language}` : `i-${index}`} justify="stretch">
            <NumberInput {...f.getInputProps(`entryLanguages.${index}.ratio`)} max={100} min={1} w={80} rightSection="%" />
            <LanguageSelect
              data={languages.filter(({ id }) => id === value.language || !array.some(({ language }) => language === id))}
              onAddNew={onAddLanguage}
              {...f.getInputProps(`entryLanguages.${index}.language`)}
              flex={1}
              placeholder={t.labelLanguage}
            />
            {!!index && (
              <ActionIcon
                variant="light"
                onClick={() => {
                  f.removeListItem("entryLanguages", index);
                  updateRatios();
                }}
              >
                <IconMinus />
              </ActionIcon>
            )}
          </Group>
        ))}
        <Button
          ml="auto"
          onClick={() => {
            const currentRatio = getTotalRatio();

            if (currentRatio < 100) {
              f.insertListItem("entryLanguages", { ratio: 100 - currentRatio });
            } else {
              f.insertListItem("entryLanguages", { ratio: 0 });
              updateRatios();
            }
          }}
          variant="light"
        >
          {t.actionAddLanguage}
        </Button>
        <Group>
          <TimeInput flex={1} {...f.getInputProps("startedAt")} />
          -
          <TimeInput flex={1} {...f.getInputProps("endedAt")} />
        </Group>

        <Switch
          checked={showRecurringRule}
          onClick={() => {
            f.setValues({ weeklyRecurring: showRecurringRule ? 1 : 2 });
            setShowRecurringRule(!showRecurringRule);
          }}
          label={t.actionAddRecurringRule}
        ></Switch>
        {showRecurringRule && (
          <Group>
            {t.labelRecurringRulePrefix}
            <NumberInput {...f.getInputProps("weeklyRecurring")} min={2} w={60} />
            {t.labelRecurringRuleSuffix}
          </Group>
        )}

        <Group justify="flex-end">
          {onDelete && (
            <Button onClick={onDelete} variant="outline" color="uzhOrange">
              {t.actionDelete}
            </Button>
          )}
          <Button type="submit">{actionLabel}</Button>
        </Group>
      </Stack>
    </form>
  );
}
