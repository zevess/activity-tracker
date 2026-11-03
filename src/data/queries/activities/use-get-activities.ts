import { activityRepository } from "@/data/repositories/activity-repository";
import { useQuery } from "@tanstack/react-query";

export function useGetActivities() {
  const {
    data: activities,
    isLoading: isActivitiesLoading,
    isSuccess: isActivitiesLoaded,
    isError: isActivitiesError,
  } = useQuery({
    queryKey: ["get activities"],
    queryFn: () => activityRepository.getAll(),
  });
  return {
    activities,
    isActivitiesLoading,
    isActivitiesLoaded,
    isActivitiesError,
  };
}
