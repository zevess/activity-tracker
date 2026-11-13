import { addDays, format, getISODay, isAfter, startOfDay } from "date-fns";

type CalculateCompletionRateParams = {
  targetDays: number[];
  completedDates: string[];
  startDate: Date;
  endDate: Date;
  createdAt: Date;
};

export function calculateCompletionRate({
  targetDays,
  completedDates,
  startDate,
  endDate,
  createdAt,
}: CalculateCompletionRateParams) {
  const days = targetDays.length > 0 ? targetDays : [1, 2, 3, 4, 5, 6, 7];
  const completedSet = new Set(completedDates);

  let scheduledCount = 0;
  let completedCount = 0;

  let cursor = startOfDay(startDate < createdAt ? createdAt : startDate);
  const end = startOfDay(endDate);

  while (!isAfter(cursor, end)) {
    const dateStr = format(cursor, "yyyy-MM-dd");
    const isoDay = getISODay(cursor);

    if (days.includes(isoDay)) {
      scheduledCount++;
      if (completedSet.has(dateStr)) {
        completedCount++;
      }
    }
    cursor = addDays(cursor, 1);
  }

  if (scheduledCount === 0) return 0;
  return Math.round((completedCount / scheduledCount) * 100);
}
