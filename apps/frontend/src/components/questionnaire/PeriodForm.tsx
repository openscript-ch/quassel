import { Button, Flex, formatDate, InputError, MonthPicker, Stack, TextInput, useForm } from "@quassel/ui";
import { i18n } from "../../stores/i18n";
import { useStore } from "@nanostores/react";
import { useEffect } from "react";
import { params } from "@nanostores/i18n";

export type PeriodFormValues = {
  title: string;
  range: [Date | null, Date | null];
};

type PeriodFormProps = {
  onSave: (form: PeriodFormValues) => void;
  period?: PeriodFormValues;
  startDate: Date;
  actionLabel: string;
};

const messages = i18n("periodForm", {
  labelTitle: "Title",
  defaultTitle: params("Period ({start} - {end})"),
  validationStartDate: "There are no gaps allowed between questionnaires. The questionnaire must start when the previous ended.",
});

export function PeriodForm({ onSave, actionLabel, period, startDate }: PeriodFormProps) {
  const t = useStore(messages);

  const f = useForm<PeriodFormValues>({
    initialValues: {
      range: [startDate, null],
      title: "",
    },
    validate: {
      range([start]) {
        if (+startDate !== +start!) {
          return t.validationStartDate;
        }
      },
    },
    onValuesChange(newValues, prevValues) {
      const [newStart, newEnd] = newValues.range ?? [];
      const [prevStart, prevEnd] = prevValues.range ?? [];
      if ((!prevStart || !prevEnd) && newStart && newEnd) {
        f.setFieldValue("title", t.defaultTitle({ start: formatDate(newStart, "M/YY"), end: formatDate(newEnd, "M/YY") }));
      }
    },
  });

  useEffect(() => {
    if (period) {
      f.initialize(period);
    }
  }, [period]);

  useEffect(() => {
    if (startDate) f.setValues({ range: [startDate, null] });
  }, [startDate]);

  return (
    <form onSubmit={f.onSubmit(onSave)}>
      <Stack>
        <Flex justify="center">
          <Stack>
            <MonthPicker
              {...f.getInputProps("range")}
              size="md"
              type="range"
              minDate={startDate}
              maxDate={new Date()}
              defaultDate={startDate}
              numberOfColumns={2}
              columnsToScroll={1}
              allowSingleDateInRange
              selectEndOfMonth
            />
            <InputError>{f.getInputProps("range").error}</InputError>
          </Stack>
        </Flex>
        <TextInput {...f.getInputProps("title")} label={t.labelTitle} />
        <Button type="submit">{actionLabel}</Button>
      </Stack>
    </form>
  );
}
