import { MonthPicker as MantineMonthPicker, MonthPickerProps as MantineMonthPickerProps } from "@mantine/dates";

type MonthPickerProps = MantineMonthPickerProps;

export function MonthPicker(props: MonthPickerProps) {
  return <MantineMonthPicker {...props} />;
}
