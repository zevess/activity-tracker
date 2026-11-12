import { activityRepository } from "@/data/repositories/activity-repository";
import { useQuery } from "@tanstack/react-query";

export function useGetMissedActivities(limit: number = 10) {
  const {
    data: missedActivities,
    isLoading: isMissedLoading,
    isError: isMissedError,
    isSuccess: isMissedLoaded,
  } = useQuery({
    queryKey: ["get missed activities"],
    queryFn: () => activityRepository.getMissed(limit),
    refetchInterval: 1000 * 60 * 60,
  });

  return { missedActivities, isMissedLoading, isMissedError, isMissedLoaded };
}
