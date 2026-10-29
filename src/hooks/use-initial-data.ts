import { CreateActivitySchema } from "@/data/schema/activity.schema";
import { Activity } from "@/data/types/activities.types";
import { getTomorrowDate } from "@/lib/date";
import { useMemo } from "react";

export const defaultInitialData: CreateActivitySchema = {
  type: "habit",
  title: "",
  description: "",
  scheduleType: "daily",
  priority: "medium",
  targetDays: [1, 2, 3, 4, 5, 6, 7],
  reminderTime: "09:00",
  dueDate: getTomorrowDate(),
};

export function useInitialData(activity?: Activity) {
  const initialData = useMemo<CreateActivitySchema>(
    () => ({
      type: activity?.type ? activity?.type : "habit",
      title: activity?.title ? activity.title : "",
      description: activity?.description ?? "",
      categoryId: activity?.categoryId,
      scheduleType: activity?.scheduleType ?? "daily",
      targetDays: activity?.targetDays
        ? JSON.parse(String(activity.targetDays))
        : [1, 2, 3, 4, 5, 6, 7],
      reminderTime: activity?.reminderTime ?? "09:00",
      dueDate: activity?.dueDate ?? getTomorrowDate(),
      priority: activity?.priority ?? "medium",
    }),
    [activity],
  );
  return { initialData };
}
