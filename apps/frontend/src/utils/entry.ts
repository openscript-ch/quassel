import { components } from "../api.gen";

export type Entry = components["schemas"]["EntryResponseDto"];
export type Gap = [string, string];
export type GapsPerDay = [Gap[], Gap[], Gap[], Gap[], Gap[], Gap[], Gap[]];

export const groupByWeekday = (entries: Entry[]) =>
  entries.reduce<Entry[][]>((acc, cur) => {
    acc[cur.weekday] = [...(acc[cur.weekday] ?? []), cur];
    return acc;
  }, []);

const groupEntriesByStartAndEnd = (entries: Entry[]) => {
  return entries.reduce<Record<string, Entry[]>>((acc, entry) => {
    acc[entry.startedAt] = [...(acc[entry.startedAt] ?? []), entry];
    acc[entry.endedAt] = [...(acc[entry.endedAt] ?? []), entry];
    return acc;
  }, {});
};

const entriesByInterval = (entries: Entry[]) => {
  const entriesByInterval = new Map<[string, string], Entry[]>();

  const timeEntriesMap = groupEntriesByStartAndEnd(entries);

  const sortedTimes = Object.keys(timeEntriesMap).sort((a, b) => a.localeCompare(b));
  let onGoingEntries: Entry[] = [];

  sortedTimes.forEach((start, index) => {
    const end = sortedTimes[index + 1];

    if (!end) return;

    const entriesInInterval = [...onGoingEntries, ...timeEntriesMap[start]].filter((entry) => entry.endedAt !== start);
    onGoingEntries = entriesInInterval.filter((e) => e.endedAt > end);

    entriesByInterval.set([start, end], entriesInInterval);
  });

  return entriesByInterval;
};

export const resolveGaps = (entries: Entry[]) => groupByWeekday(entries).map(resolveGapsInDay) as GapsPerDay;

export const resolveGapsInDay = (entriesOfSameDay: Entry[]) => {
  const gaps: Gap[] = [];

  entriesByInterval(entriesOfSameDay).forEach((entries, [start, end]) => {
    const supervisonRatio = entries.reduce((acc, entry) => acc + 1 / (entry.weeklyRecurring ?? 1), 0);

    if (supervisonRatio < 1) gaps.push([start, end]);
  });

  return gaps;
};
