import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(utc);
dayjs.extend(customParseFormat);

export function formatDate(date: Date, dayjsFormatTemplate: string) {
  return dayjs(date).format(dayjsFormatTemplate);
}

export const getTime = (date: Date) => formatDate(date, "HH:mm");

export const getNext = (unit: dayjs.ManipulateType, date: Date) => dayjs(date).utc().add(1, unit).startOf(unit).toDate();

export const getStartOf = (unit: dayjs.ManipulateType, date: Date) => dayjs(date).utc().startOf(unit).toDate();

export const isSame = (unit: dayjs.ManipulateType, left: Date, right = new Date()) => dayjs(left).isSame(right, unit);
export const isSameOrAfter = (left: Date, right: Date, unit: dayjs.ManipulateType) => dayjs(left).isAfter(dayjs(right).startOf(unit));

export function getDateFromTimeAndWeekday(time: string, weekday: number) {
  return dayjs(time, "HH:mm")
    .set("day", weekday)
    .add(weekday === 0 ? 1 : 0, "week")
    .toDate();
}
