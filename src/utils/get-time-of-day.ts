import { getHours } from "date-fns";

export function getTimeOfDay(date: Date = new Date()) {
  const hours = getHours(date);
  if (hours >= 4 && hours < 12) return "Доброе утро";
  if (hours >= 12 && hours < 17) return "Добрый день";
  if (hours >= 17 && hours < 24) return "Добрый вечер";
  return "Добрая ночь";
}
