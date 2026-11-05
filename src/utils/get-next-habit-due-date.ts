import { addDays, getISODay, set, startOfDay } from "date-fns";

type GetNextHabitDueDateParams = {
  targetDays: number[];
  reminderTime: string | null;
  isCompletedToday: boolean;
  now?: Date;
};

export function getNextHabitDueDate({
  targetDays,
  reminderTime,
  isCompletedToday,
  now = new Date(),
}: GetNextHabitDueDateParams) {
  const days = targetDays.length > 0 ? targetDays : [1, 2, 3, 4, 5, 6, 7];
  const [hours = 9, minutes = 0] = reminderTime
    ? reminderTime.split(":").map(Number)
    : [9, 0];
  const startDate = isCompletedToday ? addDays(now, 1) : now;
  for (let i = 0; i < 7; i++) {
    const candidate = addDays(startOfDay(startDate), i);
    const isoDay = getISODay(candidate);
    if (days.includes(isoDay)) {
      return set(candidate, { hours, minutes, seconds: 0, milliseconds: 0 });
    }
  }
  return addDays(now, 7);
}
