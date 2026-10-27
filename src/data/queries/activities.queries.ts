import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { activityRepository } from "../repositories/activity-repository";
import { CreateActivityInput } from "../types/activities.types";

const activitiesKeys = {
  all: ["activities"] as const,
};

export function useGetActivities() {
  const {
    data: activities,
    isLoading: isActivitiesLoading,
    isSuccess: isActivitiesLoaded,
    isError: isActivitiesError,
  } = useQuery({
    queryKey: activitiesKeys.all,
    queryFn: () => activityRepository.getAll(),
  });
  return {
    activities,
    isActivitiesLoading,
    isActivitiesLoaded,
    isActivitiesError,
  };
}

export function useCreateActivity() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: createActivity } = useMutation({
    mutationFn: (data: CreateActivityInput) => activityRepository.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: activitiesKeys.all });
      router.push("/activities");
    },
    onError: (error) => {
      console.error(error);
    },
  });
  return { createActivity };
}
