import { components } from "../api.gen";

type Entry = components["schemas"]["QuestionnaireEntryDto"];

const groupByWeekday = (entries: Entry[]) =>
  entries.reduce<Entry[][]>((acc, cur) => {
    acc[cur.weekday] = [...(acc[cur.weekday] ?? []), cur];
    return acc;
  }, []);

export const resolveGaps = (entries: Entry[]) => groupByWeekday(entries).map(resolveGapsInDay);

// inspired by: https://cs.stackexchange.com/questions/133276/algorithm-to-compute-the-gaps-between-a-set-of-intervals
const resolveGapsInDay = (entriesOfSameDay: Entry[]) => {
  const entriesSortedByStart = entriesOfSameDay.toSorted((a, b) => a.startedAt.localeCompare(b.startedAt));

  const gaps: [string, string][] = [];
  let lastCoveredTime = entriesSortedByStart[0]?.endedAt;

  for (const entry of entriesSortedByStart) {
    if (entry.startedAt > lastCoveredTime) {
      gaps.push([lastCoveredTime, entry.startedAt]);
    }
    lastCoveredTime = lastCoveredTime > entry.endedAt ? lastCoveredTime : entry.endedAt;
  }

  return gaps;
};
