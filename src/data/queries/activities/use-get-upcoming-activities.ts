import { activityRepository } from "@/data/repositories/activity-repository";
import { useQuery } from "@tanstack/react-query";

export function useGetUpcomingActivities(limit: number = 5) {
  const {
    data: upcomingActivities,
    isLoading: isUpcomingLoading,
    isError: isUpcomingError,
    isSuccess: isUpcomingSuccess,
  } = useQuery({
    queryKey: ["get upcoming activities", limit],
    queryFn: () => activityRepository.getUpcoming(limit),
    refetchInterval: 1000 * 60,
  });
  return {
    upcomingActivities,
    isUpcomingError,
    isUpcomingLoading,
    isUpcomingSuccess,
  };
}
