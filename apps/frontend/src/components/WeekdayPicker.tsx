import { Chip, Group, Select } from "@quassel/ui";
import { i18n } from "../stores/i18n";
import { useStore } from "@nanostores/react";

type WeekdayPickerProps =
  | { value?: number; onChange?: (weekday?: number) => void; multiple?: false }
  | { value?: number[]; onChange?: (weekday: number[]) => void; multiple: true };

const messages = i18n("WeekdayPicker", {
  mondayShortLabel: "Mo",
  mondayLabel: "Monday",
  tusedayShortLabel: "Tu",
  tusedayLabel: "Tuesday",
  wednesdayShortLabel: "We",
  wednesdayLabel: "Wednesday",
  thursdayShortLabel: "Th",
  thursdayLabel: "Thursday",
  fridayShortLabel: "Fr",
  fridayLabel: "Friday",
  saturdayShortLabel: "Sa",
  saturdayLabel: "Saturday",
  sundayShortLabel: "Su",
  sundayLabel: "Sunday",
});

export function WeekdayPicker({ onChange, value, multiple }: WeekdayPickerProps) {
  const t = useStore(messages);

  const weekdayOptions = [
    { value: "1", label: t.mondayLabel, short: t.mondayShortLabel },
    { value: "2", label: t.tusedayLabel, short: t.tusedayShortLabel },
    { value: "3", label: t.wednesdayLabel, short: t.wednesdayShortLabel },
    { value: "4", label: t.thursdayLabel, short: t.thursdayShortLabel },
    { value: "5", label: t.fridayLabel, short: t.fridayShortLabel },
    { value: "6", label: t.saturdayLabel, short: t.saturdayShortLabel },
    { value: "0", label: t.sundayLabel, short: t.sundayShortLabel },
  ];

  if (multiple)
    return (
      <Chip.Group multiple value={value?.map(String)} onChange={(values) => onChange?.(values.map(Number))}>
        <Group gap={"xs"}>
          {weekdayOptions.map(({ value, short }) => (
            <Chip key={value} value={value}>
              {short}
            </Chip>
          ))}
        </Group>
      </Chip.Group>
    );

  return <Select data={weekdayOptions} value={value?.toString()} onChange={(v) => onChange?.(v ? parseInt(v) : undefined)} />;
}
