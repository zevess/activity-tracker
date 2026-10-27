import { CategoryOption } from "./categories.types";

export const ACTIVITY_TYPES = ["habit", "one_off"] as const;
export type ActivityType = (typeof ACTIVITY_TYPES)[number];

export const SCHEDULE_TYPES = ["daily", "custom"] as const;
export type ScheduleType = (typeof SCHEDULE_TYPES)[number];

export const PRIORITY = ["low", "medium", "high"] as const;
export type Priority = (typeof PRIORITY)[number];

export type SelectOption<T extends string = string> = {
  value: T;
  label: string;
};

export const activityTypeOptions = [
  {
    value: "habit",
    label: "Привычка",
  },
  {
    value: "one_off",
    label: "Активность",
  },
] satisfies SelectOption<ActivityType>[];

export const scheduleTypeOptions = [
  {
    value: "daily",
    label: "Ежедневно",
  },
  {
    value: "custom",
    label: "Другое",
  },
] satisfies SelectOption<ScheduleType>[];

export const priorityOptions = [
  {
    value: "low",
    label: "Низкий",
  },
  {
    value: "medium",
    label: "Средний",
  },
  {
    value: "high",
    label: "Высокий",
  },
] satisfies SelectOption<Priority>[];

export interface Activity {
  id: number;
  type: ActivityType;
  title: string;
  description: string | null;

  categoryId: number | null;
  scheduleType: ScheduleType | null;
  targetDays: number[] | null;
  reminderTime: string | null;

  dueDate: string | null;
  priority: Priority | null;
  completedAt: Date | null;

  category: CategoryOption | null;
}

export type CreateActivityInput = {
  type: ActivityType;
  title: string;
  description?: string | null;
  categoryId?: number | null;

  scheduleType?: ScheduleType | null;
  targetDays?: number[] | null;
  reminderTime?: string | null;

  dueDate?: string | null;
  priority?: Priority | null;
};
