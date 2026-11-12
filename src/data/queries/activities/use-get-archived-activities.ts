import { activityRepository } from "@/data/repositories/activity-repository";
import { useQuery } from "@tanstack/react-query";

export function useGetArchivedActivities() {
  const {
    data: archivedActivities,
    isLoading: isArchivedLoading,
    isSuccess: isArchivedLoaded,
    isError: isArchivedError,
  } = useQuery({
    queryKey: ["get archived activities"],
    queryFn: () => activityRepository.getArchived(),
  });
  return {
    archivedActivities,
    isArchivedLoading,
    isArchivedLoaded,
    isArchivedError,
  };
}
