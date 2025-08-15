import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(utc);
dayjs.extend(customParseFormat);
dayjs.extend(isoWeek);

export function formatDate(date: Date, dayjsFormatTemplate: string) {
  return dayjs(date).format(dayjsFormatTemplate);
}

export const getTime = (date: Date) => formatDate(date, "HH:mm");
export const toMantineUTCDate = (date: string) => dayjs(date).utc().format("YYYY-MM-DD");

export const getNext = (unit: dayjs.ManipulateType, date: Date) => dayjs(date).utc().add(1, unit).startOf(unit).toDate();

export const getStartOf = (unit: dayjs.ManipulateType, date: Date) => dayjs(date).utc().startOf(unit).toDate();
export const getEndOf = (unit: dayjs.ManipulateType, date: Date) => dayjs(date).utc().endOf(unit).toDate();

export const isSame = (unit: dayjs.ManipulateType, left: Date, right = new Date()) => dayjs(left).isSame(right, unit);
export const isSameOrAfter = (left: Date, right: Date, unit: dayjs.ManipulateType) => dayjs(left).isAfter(dayjs(right).startOf(unit));

export function getDateFromTimeAndWeekday(time: string, weekday: number) {
  return dayjs(time, "HH:mm:ss")
    .isoWeekday(weekday === 0 ? 7 : weekday)
    .toDate();
}
