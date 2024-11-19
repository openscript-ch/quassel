import { useForm } from "@mantine/form";
import { Button, Flex, MonthPicker, Stack, TextInput } from "@quassel/ui";
import { i18n } from "../../stores/i18n";
import { useStore } from "@nanostores/react";
import { components } from "../../api.gen";

type FormValues = {
  title: string;
  range: [Date, Date];
};

type ResultType = Pick<components["schemas"]["QuestionnaireMutationDto"], "startedAt" | "endedAt" | "title">;

type PeriodFormProps = {
  onSave: (questionnaire: ResultType) => void;
  actionLabel: string;
};

const mapValues = ({ range: [startedAt, endedAt], ...rest }: FormValues): ResultType => ({
  ...rest,
  startedAt: startedAt.toISOString(),
  endedAt: endedAt.toISOString(),
});

export const messages = i18n("periodForm", {
  labelTitle: "Title",
});

export function PeriodForm({ onSave, actionLabel }: PeriodFormProps) {
  const f = useForm<FormValues>({});
  const t = useStore(messages);

  return (
    <form onSubmit={f.onSubmit((values) => onSave(mapValues(values)))}>
      <Stack>
        <Flex justify="center">
          <MonthPicker {...f.getInputProps("range")} size="md" type="range" numberOfColumns={2} />
        </Flex>
        <TextInput {...f.getInputProps("title")} label={t.labelTitle} />
        <Button type="submit">{actionLabel}</Button>
      </Stack>
    </form>
  );
}
