export const ACTIVITY_TYPES = ["habit", "one_off"] as const;
export type ActivityType = (typeof ACTIVITY_TYPES)[number];

export const SCHEDULE_TYPES = ["daily", "weekly", "custom"] as const;
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
    value: "weekly",
    label: "Еженедельно",
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
  type: ActivityType;
  title: string;
  description?: string;
  categoryId?: number;

  scheduleType: ScheduleType;
  targetDaye: number[];
  reminderTime: string | null;

  dueTime: string | null;
  priority?: Priority;
  completedAt: string | null;
}

// export interface ActivityBase {
//   //   type: "habit" | "one_off";
//   title: string;
//   description?: string;
//   categoryId?: number;
//   //   scheduleType?: "daily" | "weekly" | "custom";
//   //   targetDays?: string;
//   //   reminderTime?: string;
//   //   dueTime?: Date;
//   //   priority?: "low" | "medium" | "high";
// }

// export interface HabitActivity extends ActivityBase {
//   type: "habit";
//   scheduleType: ScheduleType;
//   targetDaye: number[];
//   reminderTime: string | null;
// }

// export interface OneOffActivity extends ActivityBase {
//   type: "one_off";
//   dueTime: string | null;
//   priority?: Priority;
//   completedAt: string | null;
// }

// export type Activity = HabitActivity | OneOffActivity;

export type CreateActivityInput =
  | {
      type: "habit";
      title: string;
      description?: string;
      categoryId?: number;
      scheduleType: ScheduleType;
      targetDays?: number[];
      reminderTime?: string;
    }
  | {
      type: "one_off";
      title: string;
      description?: string;
      categoryId?: number;
      dueTime?: string;
      priority: Priority;
    };
