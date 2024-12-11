import { useForm } from "@mantine/form";
import { Button, Flex, formatDate, getNext, InputError, MonthPicker, Stack, TextInput } from "@quassel/ui";
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
  prevEndDate?: Date;
  actionLabel: string;
};

const messages = i18n("periodForm", {
  labelTitle: "Title",
  defaultTitle: params("Period ({start} - {end})"),
  validationStartDate: "There are no gaps allowed between questionnaires. The questionnaire must start when the previous ended.",
});

export function PeriodForm({ onSave, actionLabel, period, prevEndDate }: PeriodFormProps) {
  const t = useStore(messages);

  const f = useForm<PeriodFormValues>({
    initialValues: {
      range: [prevEndDate ? getNext("month", prevEndDate) : null, null],
      title: "",
    },
    validate: {
      range([start]) {
        console.log(start);
        console.log(prevEndDate && getNext("month", prevEndDate));

        if (prevEndDate && +getNext("month", prevEndDate) !== +start!) {
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
      f.setValues(period);
      f.resetDirty();
    }
  }, [period]);

  return (
    <form onSubmit={f.onSubmit((values) => onSave(values))}>
      <Stack>
        <Flex justify="center">
          <Stack>
            <MonthPicker
              {...f.getInputProps("range")}
              size="md"
              type="range"
              minDate={prevEndDate}
              defaultDate={prevEndDate}
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
