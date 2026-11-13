import { activityRepository } from "@/data/repositories/activity-repository";
import { useQuery } from "@tanstack/react-query";

export function useGetActivityStatistics(activityId: number) {
  const {
    data: statistics,
    isError: isStatisticsError,
    isSuccess: isStatisticsLoaded,
    isLoading: isStatisticsLoading,
  } = useQuery({
    queryKey: ["get activity statistics", activityId],
    queryFn: () => activityRepository.getStatistics(activityId),
  });

  return {
    statistics,
    isStatisticsError,
    isStatisticsLoaded,
    isStatisticsLoading,
  };
}
