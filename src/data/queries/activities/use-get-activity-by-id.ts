import { activityRepository } from "@/data/repositories/activity-repository";
import { useQuery } from "@tanstack/react-query";

export function useGetActivityById(id: number) {
  const {
    data: activity,
    isLoading: isActivityLoading,
    isSuccess: isActivityLoaded,
    isError: isActivityError,
  } = useQuery({
    queryKey: ["get activity by id", id],
    queryFn: () => activityRepository.getById(id),
    refetchOnMount: true,
  });
  return {
    activity,
    isActivityLoading,
    isActivityLoaded,
    isActivityError,
  };
}
