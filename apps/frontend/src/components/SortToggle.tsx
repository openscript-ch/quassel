import { ActionIcon, IconChevronDown, IconChevronUp, IconSelector } from "@quassel/ui";
import { SortOrder } from "../hooks/useSort";

type SortToggleProps = {
  onToggle?: () => void;
  sortOrder?: SortOrder;
};

export function SortToggle({ onToggle, sortOrder }: SortToggleProps) {
  return (
    <ActionIcon variant="white" onClick={onToggle}>
      {sortOrder ? sortOrder === "ASC" ? <IconChevronUp /> : <IconChevronDown /> : <IconSelector />}
    </ActionIcon>
  );
}
