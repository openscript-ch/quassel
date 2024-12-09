import dayjs from "dayjs";

export function formatDate(date: Date, dayjsFormatTemplate: string) {
  return dayjs(date).format(dayjsFormatTemplate);
}

export const getTime = (date: Date) => formatDate(date, "HH:mm");

export function getDateFromTimeAndWeekday(time: string, weekday: number) {
  return dayjs(time, "HH:mm:ss")
    .set("day", weekday)
    .add(weekday === 0 ? 1 : 0, "week")
    .toDate();
}
