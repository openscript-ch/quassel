import type { ComponentProps } from "astro/types";
import type Accordion from "../components/Accordion.astro";
import type { SVGComponent } from "../types";
import { getEntry, type DataEntryMap } from "astro:content";
import IconCalendarWeek from "~icons/tabler/calendar-week";
import IconCalendarPeriod from "~icons/tabler/calendar-clock";
import IconDetectGaps from "~icons/tabler/arrow-autofit-width";
import IconReccuringEntries from "~icons/tabler/repeat";
import IconStudyEntry from "~icons/tabler/report-search";
import IconUsers from "~icons/tabler/users";
import IconExportData from "~icons/tabler/file-export";
import IconConsolidateData from "~icons/tabler/report-analytics";

type AccordionItemsProp = ComponentProps<typeof Accordion>["items"];

const iconMapping: Record<string, SVGComponent> = {
  "calendar-week": IconCalendarWeek,
  "time-period": IconCalendarPeriod,
  "detect-gaps": IconDetectGaps,
  "recurring-entries": IconReccuringEntries,
  "study-entry": IconStudyEntry,
  "data-management": IconUsers,
  "export-data": IconExportData,
  "consolidate-data": IconConsolidateData,
};

export async function mapFeatures<E extends keyof DataEntryMap["features"]>(id: E) {
  const features = (await getEntry("features", id))!.data;

  const items: AccordionItemsProp = features.map((feature) => ({
    ...feature,
    icon: iconMapping[feature.icon],
  }));

  return items;
}
