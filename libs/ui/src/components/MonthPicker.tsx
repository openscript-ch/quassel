import {
  DatePickerType,
  DatesRangeValue,
  DateValue,
  MonthPicker as MantineMonthPicker,
  MonthPickerProps as MantineMonthPickerProps,
} from "@mantine/dates";
import dayjs from "dayjs";

interface MonthPickerProps<Type extends DatePickerType = "default"> extends MantineMonthPickerProps<Type> {
  selectEndOfMonth?: boolean;
}

function isRangeValue(date: DateValue | DatesRangeValue | Date[]): date is DatesRangeValue {
  return Array.isArray(date) && date.length === 2;
}

export function MonthPicker<Type extends DatePickerType = "default">({ selectEndOfMonth, ...rest }: MonthPickerProps<Type>) {
  const onChange: MonthPickerProps<Type>["onChange"] = (date) => {
    if (rest.type === "range" && isRangeValue(date) && selectEndOfMonth) {
      const [start, end] = date;
      const newDate = [start, end ? dayjs(end).utc().endOf("month").toDate() : undefined];
      date = newDate as typeof date;
    }
    rest.onChange!(date);
  };

  return <MantineMonthPicker {...rest} onChange={rest.onChange ? onChange : undefined} />;
}
