import { useForm } from "@mantine/form";
import { Button, Flex, MonthPicker, Stack, TextInput } from "@quassel/ui";
import { i18n } from "../../stores/i18n";
import { useStore } from "@nanostores/react";
import dayjs from "dayjs";

export type PeriodFormValues = {
  title: string;
  range: [Date, Date];
};

type PeriodFormProps = {
  onSave: (form: PeriodFormValues) => void;
  actionLabel: string;
};

export const messages = i18n("periodForm", {
  labelTitle: "Title",
});

export function PeriodForm({ onSave, actionLabel }: PeriodFormProps) {
  const t = useStore(messages);

  const f = useForm<PeriodFormValues>({
    mode: "uncontrolled",
    transformValues(values) {
      values.range[1] = dayjs(values.range[1]).utc().endOf("month").toDate();

      return values;
    },
  });

  return (
    <form onSubmit={f.onSubmit((values) => onSave(values))}>
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
