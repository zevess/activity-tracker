import { activityRepository } from "@/data/repositories/activity-repository";
import { useQuery } from "@tanstack/react-query";

export function useGetCompletedActivitiesToday() {
  const {
    data: completedToday,
    isLoading: isCompletedTodayLoading,
    isSuccess: isCompletedTodayLoaded,
    isError: isCompletedTodayError,
  } = useQuery({
    queryKey: ["get completed today activities"],
    queryFn: () => activityRepository.getCompletedToday(),
  });
  return {
    completedToday,
    isCompletedTodayLoading,
    isCompletedTodayLoaded,
    isCompletedTodayError,
  };
}
