import { Priority, priorityOptions } from "@/data/types/activities.types";

export function getFormatedPriority(priority?: Priority | null) {
  if (!priority) return;
  const formatedPriority =
    priority &&
    priorityOptions.find((priorityOption) => priorityOption.value === priority);
  return formatedPriority;
}
