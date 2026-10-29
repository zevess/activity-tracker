import { CreateActivitySchema } from "@/data/schema/activity.schema";
import { CreateActivityInput } from "@/data/types/activities.types";
import { CategoryOption } from "@/data/types/categories.types";

export function getActivityPayload(
  data: CreateActivitySchema,
  defaultCategory?: CategoryOption,
) {
  const payload: CreateActivityInput = {
    title: data.title,
    description: data.description,
    categoryId: data.categoryId ?? defaultCategory?.id,
    type: data.type,
    reminderTime: data.reminderTime,
    ...(data.type === "habit" && {
      scheduleType:
        data.targetDays?.length === 7
          ? (data.scheduleType = "daily")
          : data.scheduleType,
      targetDays:
        data.scheduleType === "custom"
          ? data.targetDays
          : [1, 2, 3, 4, 5, 6, 7],
      dueDate: null,
      priority: null,
    }),
    ...(data.type === "one_off" && {
      dueDate: data.dueDate,
      priority: data.priority,
      targetDays: null,
      scheduleType: null,
    }),
  };
  return payload;
}
