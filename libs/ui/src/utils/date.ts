import dayjs from "dayjs";

export function formatDate(date: Date, dayjsFormatTemplate: string) {
  return dayjs(date).format(dayjsFormatTemplate);
}

export const getTime = (date: Date) => formatDate(date, "HH:mm");

export function getDateFromTimeAndWeekday(time: string, weekday: number) {
  const startOfWeek = dayjs().startOf("week");

  return dayjs(time, "HH:mm:ss").set("date", startOfWeek.date()).add(weekday, "days").toDate();
}
