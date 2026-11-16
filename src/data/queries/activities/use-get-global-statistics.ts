import { activityRepository } from "@/data/repositories/activity-repository";
import { useQuery } from "@tanstack/react-query";

export function useGetGlobalStatistics() {
  const {
    data: globalStats,
    isLoading: isGlobalStatsLoading,
    isSuccess: isGlobalStatsLoaded,
    isError: isGlobalStatsError,
  } = useQuery({
    queryKey: ["get global statistics"],
    queryFn: () => activityRepository.getGlobalStatistics(),
    staleTime: 1000 * 60 * 60,
  });
  return {
    globalStats,
    isGlobalStatsError,
    isGlobalStatsLoaded,
    isGlobalStatsLoading,
  };
}
