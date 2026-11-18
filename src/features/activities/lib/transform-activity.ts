import { Activity } from "@/data/db/schema";

export function transformActivity(activity: Activity) {
  const transformed = {
    ...activity,
    targetDays: activity.targetDays
      ? (JSON.parse(activity.targetDays) as number[])
      : null,
  };
  return transformed;
}
