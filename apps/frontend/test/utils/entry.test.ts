import { beforeEach, describe, expect, it } from "vitest";
import { Entry, resolveGaps, resolveGapsInDay } from "../../src/utils/entry";

describe("entry utils", () => {
  let entries: Partial<Entry>[];

  beforeEach(() => {
    entries = [
      { startedAt: "08:00", endedAt: "10:00", weekday: 1 },
      { startedAt: "12:00", endedAt: "14:00", weekday: 1 },
    ];
  });

  it("should detect no gaps if there are no entries", () => {
    const gaps = resolveGapsInDay([]);

    expect(gaps).toEqual([]);
  });

  it("should detect gap between two entries", () => {
    const gaps = resolveGapsInDay(entries as Entry[]);

    expect(gaps).toEqual([["10:00", "12:00"]]);
  });

  it("shouldn't detect gap with overlapping entries", () => {
    entries.push({ startedAt: "09:00", endedAt: "13:00" });

    const gaps = resolveGapsInDay(entries as Entry[]);

    expect(gaps).toEqual([]);
  });

  it("should detect gap with overlapping entries", () => {
    entries.push({ startedAt: "09:00", endedAt: "11:00" });

    const gaps = resolveGapsInDay(entries as Entry[]);

    expect(gaps).toEqual([["11:00", "12:00"]]);
  });

  it("should detect gaps with entries in diffrent sort order", () => {
    entries = entries.toReversed();

    const gaps = resolveGapsInDay(entries as Entry[]);

    expect(gaps).toEqual([["10:00", "12:00"]]);
  });

  it("should detect multiple gaps", () => {
    entries.push({ startedAt: "15:00", endedAt: "16:00" });

    const gaps = resolveGapsInDay(entries as Entry[]);

    expect(gaps.length).toBe(2);
  });

  it("should detect gaps for multiple weekdays", () => {
    entries.push({ startedAt: "08:00", endedAt: "10:00", weekday: 2 });
    entries.push({ startedAt: "12:00", endedAt: "14:00", weekday: 2 });

    const gapsPerDay = resolveGaps(entries as Entry[]);

    expect(gapsPerDay[1]).toHaveLength(1);
    expect(gapsPerDay[2]).toHaveLength(1);
  });
});
