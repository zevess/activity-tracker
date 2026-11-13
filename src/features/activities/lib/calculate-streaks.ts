import {
    addDays,
    format,
    getISODay,
    isAfter,
    startOfDay,
    subDays,
} from "date-fns";

type CalculateStreaksParams = {
  targetDays: number[];
  completedDates: string[];
  createdAt: Date;
  now?: Date;
};

type StreakResult = {
  currentStreak: number;
  bestStreak: number;
  totalCompletions: number;
};

export function calculateStreaks({
  targetDays,
  completedDates,
  createdAt,
  now = new Date(),
}: CalculateStreaksParams) {
  const days = targetDays.length > 0 ? targetDays : [1, 2, 3, 4, 5, 6, 7];
  const completedSet = new Set(completedDates);

  const sortedDates = [...completedDates].sort();
  const totalCompletions = sortedDates.length;

  let currentStreak = 0;
  let checkDate = startOfDay(now);

  const todayIsoDay = getISODay(checkDate);
  const todayStr = format(checkDate, "yyyy-MM-dd");
  const isTodayScheduled = days.includes(todayIsoDay);
  const isTodayCompleted = completedSet.has(todayStr);

  if (isTodayScheduled && !isTodayCompleted) {
    currentStreak = 0;
  } else {
    if (isTodayCompleted) {
      currentStreak = 1;
    }

    let searchDate = isTodayCompleted ? subDays(checkDate, 1) : checkDate;

    for (let i = 0; i < 365; i++) {
      if (isAfter(startOfDay(createdAt), searchDate)) break;

      const dateStr = format(searchDate, "yyyy-MM-dd");
      const isoDay = getISODay(searchDate);

      if (days.includes(isoDay)) {
        if (completedSet.has(dateStr)) {
          currentStreak++;
        } else {
          break;
        }
      }
      searchDate = subDays(searchDate, 1);
    }
  }

  let bestStreak = 0;
  let tempStreak = 0;

  let cursor = startOfDay(createdAt);
  const endDate = startOfDay(now);

  while (!isAfter(cursor, endDate)) {
    const dateStr = format(cursor, "yyyy-MM-dd");
    const isoDay = getISODay(cursor);

    if (days.includes(isoDay)) {
      if (completedSet.has(dateStr)) {
        tempStreak++;
        bestStreak = Math.max(bestStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    }
    cursor = addDays(cursor, 1);
  }
  return {
    currentStreak,
    bestStreak: Math.max(bestStreak, currentStreak),
    totalCompletions,
  };
}
