import { Button, Flex, InputError, MonthPicker, Stack, TextInput, useForm } from "@quassel/ui";
import { formatDate, getStartOf, isSame } from "@quassel/utils";
import { i18n } from "../../stores/i18n";
import { useStore } from "@nanostores/react";
import { useEffect } from "react";
import { params } from "@nanostores/i18n";

export type PeriodFormValues = {
  title: string;
  range: [string | null, string | null];
};

type PeriodFormProps = {
  onSave: (form: PeriodFormValues) => void;
  period?: PeriodFormValues;
  actionLabel: string;
};

const messages = i18n("periodForm", {
  labelTitle: "Title",
  defaultTitle: params("Period ({start} - {end})"),
  validationStartDate: "There are no gaps allowed between questionnaires. The questionnaire must start when the previous ended.",
});

export function PeriodForm({ onSave, actionLabel, period }: PeriodFormProps) {
  const t = useStore(messages);

  const f = useForm<PeriodFormValues>({
    initialValues: {
      range: [null, null],
      title: "",
    },
    validate: {
      range([start]) {
        if (period?.range[0] && !isSame("day", new Date(period.range[0]), new Date(start!))) {
          return t.validationStartDate;
        }
      },
    },
    onValuesChange(newValues, prevValues) {
      const [newStart, newEnd] = newValues.range ?? [];
      const [prevStart, prevEnd] = prevValues.range ?? [];
      if ((!prevStart || !prevEnd) && newStart && newEnd) {
        f.setFieldValue("title", t.defaultTitle({ start: formatDate(new Date(newStart), "M/YY"), end: formatDate(new Date(newEnd), "M/YY") }));
      }
    },
  });

  useEffect(() => {
    if (period) {
      const [start, end] = period.range;

      f.setValues({
        ...period,
        range: [start, end ? getStartOf("day", new Date(end)).toISOString() : null],
      });
    }
  }, [period]);

  return (
    <form onSubmit={f.onSubmit(onSave)}>
      <Stack>
        <Flex justify="center">
          <Stack>
            <MonthPicker
              {...f.getInputProps("range")}
              size="md"
              type="range"
              minDate={period?.range[0] ?? undefined}
              maxDate={new Date()}
              defaultDate={period?.range[0] ?? undefined}
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
