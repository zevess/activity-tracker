import { activityLogsRepository } from "@/data/repositories/activity-logs-repository";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

export function useActivityStatus(activityId: number, date: Date = new Date()) {
  const dateStr = format(date, "yyyy-MM-dd");
  const {
    data: activityStatus,
    isLoading: isStatusLoading,
    isSuccess: isStatusLoaded,
    isError: isStatusError,
  } = useQuery({
    queryKey: ["get activity status", activityId, dateStr],
    queryFn: () => activityLogsRepository.getStatus(activityId, date),
  });
  return {
    activityStatus,
    isStatusLoading,
    isStatusLoaded,
    isStatusError,
  };
}
