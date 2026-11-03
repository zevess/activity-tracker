import {
  ActivityType,
  activityTypeOptions,
} from "@/data/types/activities.types";

export function getFormatedType(activityType?: ActivityType) {
  if (!activityType) return;
  const formatedType = activityTypeOptions.find(
    (type) => type.value === activityType,
  );
  return formatedType;
}
