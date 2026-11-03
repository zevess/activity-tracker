import { activityRepository } from "@/data/repositories/activity-repository";
import { useQuery } from "@tanstack/react-query";

export function useGetCompletedActivities() {
  const {
    data: completedActivities,
    isLoading: isCompletedActivitiesLoading,
    isSuccess: isCompletedActivitiesLoaded,
    isError: isCompletedActivitiesError,
  } = useQuery({
    queryKey: ["get completed activities"],
    queryFn: () => activityRepository.getCompleted(),
  });
  return {
    completedActivities,
    isCompletedActivitiesLoading,
    isCompletedActivitiesLoaded,
    isCompletedActivitiesError,
  };
}
