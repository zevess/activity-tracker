import { activityStatusOptions, Status } from "@/data/types/activities.types";

export function getFormatedStatus(activityStatus?: Status | null) {
  if (!activityStatus) return;
  const formatedStatus = activityStatusOptions.find(
    (type) => type.value === activityStatus,
  );
  return formatedStatus;
}
