import { SegmentedControl } from "@quassel/ui";
import { i18n } from "../stores/i18n";
import { useStore } from "@nanostores/react";

type WeekdayPickerProps = {
  value?: number;
  onChange?: (weekday: number) => void;
};

const messages = i18n("WeekdayPicker", {
  mondayLabel: "Mo",
  tusedayLabel: "Tu",
  wednesdayLabel: "We",
  thrusdayLabel: "Th",
  fridayLabel: "Fr",
  saturdayLabel: "Sa",
  sundayLabel: "Su",
});

export function WeekdayPicker({ onChange, value }: WeekdayPickerProps) {
  const t = useStore(messages);

  return (
    <SegmentedControl
      value={value?.toString()}
      onChange={(value) => onChange?.(parseInt(value))}
      data={[
        { value: "1", label: t.mondayLabel },
        { value: "2", label: t.tusedayLabel },
        { value: "3", label: t.wednesdayLabel },
        { value: "4", label: t.thrusdayLabel },
        { value: "5", label: t.fridayLabel },
        { value: "6", label: t.saturdayLabel },
        { value: "0", label: t.sundayLabel },
      ]}
    />
  );
}
