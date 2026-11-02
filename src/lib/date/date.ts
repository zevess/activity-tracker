import { daysOptions } from "@/data/types/days.types";

export function getTomorrowDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDate = tomorrow.toISOString().slice(0, 10);
  return tomorrowDate;
}

export function getFormatedDate(date: string) {
  let formatedDate;
  if (date) {
    const dateObj = new Date(date);
    formatedDate = dateObj.toLocaleDateString("ru-RU");
  }
  return formatedDate;
}

export function getConvertedDays(arr: number[] | null) {
  if (!Array.isArray(arr)) return;
  const filteredDays = daysOptions.filter((day) => arr.includes(day.value));
  return filteredDays;
}

export function getTimeDifference(reminderTime?: string | null) {
  const time = reminderTime + ":00";
  const todayStr = new Date().toISOString().split("T")[0];
  const date = new Date(`${todayStr}T${time}`);
  const currentTIme = new Date();
  const timeDifference = currentTIme.getTime() - date.getTime();
  const diffInHours = Math.floor(timeDifference / (1000 * 60 * 60));
  return diffInHours;
}
