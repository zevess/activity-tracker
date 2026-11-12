import { getISODay, isAfter, startOfDay, subDays } from "date-fns";

type GetMissedDaysParams = {
  targetDays: number[];
  createdAt: Date;
  completedDates: string[];
  now?: Date;
};

export function getMissedDays({
  targetDays,
  createdAt,
  completedDates,
  now = new Date(),
}: GetMissedDaysParams) {
  const days = targetDays.length > 0 ? targetDays : [1, 2, 3, 4, 5, 6, 7];
  const completedSet = new Set(completedDates);

  let missedCount = 0;
  let lastMissedDate: Date | null = null;

  for (let i = 1; i <= 7; i++) {
    const dateToCheck = subDays(now, i);
    const dateStr = dateToCheck.toISOString().slice(0, 10);
    const isoDay = getISODay(dateToCheck);

    if (isAfter(createdAt, startOfDay(dateToCheck))) continue;

    if (days.includes(isoDay)) {
      if (!completedSet.has(dateStr)) {
        missedCount++;
        if (!lastMissedDate) {
          lastMissedDate = dateToCheck;
        }
      }
    }
  }
  return { count: missedCount, lastMissedDate };
}
