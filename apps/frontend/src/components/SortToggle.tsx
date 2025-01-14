import { ActionIcon, IconChevronDown, IconChevronUp, IconSelector } from "@quassel/ui";
import { components } from "../api.gen";

type SortToggleProps = {
  onToggle?: () => void;
  sortOrder?: components["schemas"]["SortOrder"];
};

export function SortToggle({ onToggle, sortOrder }: SortToggleProps) {
  return (
    <ActionIcon variant="white" onClick={onToggle}>
      {sortOrder ? sortOrder === "ASC" ? <IconChevronUp /> : <IconChevronDown /> : <IconSelector />}
    </ActionIcon>
  );
}
