import type { ComponentProps } from "astro/types";
import type Accordion from "../components/Accordion.astro";
import type { SVGComponent } from "../types";
import IconCalendarWeek from "~icons/tabler/calendar-week";
import { getEntry, type DataEntryMap } from "astro:content";

type AccordionItemsProp = ComponentProps<typeof Accordion>["items"];

const iconMapping: Record<string, SVGComponent> = {
  "calendar-week": IconCalendarWeek,
};

export async function mapFeatures<E extends keyof DataEntryMap["features"]>(id: E) {
  const features = (await getEntry("features", id))!.data;

  const items: AccordionItemsProp = features.map((feature) => ({
    icon: iconMapping[feature.icon],
    title: feature.title,
    description: feature.description,
    screenshot: feature.screenshot,
  }));

  return items;
}
