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

export function useCreateActivity() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: createActivity } = useMutation({
    mutationKey: ["create activity"],
    mutationFn: (data: CreateActivityInput) => activityRepository.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get activities"] });
      router.push("/activities");
    },
    onError: (error) => {
      console.error(error);
    },
  });
  return { createActivity };
}

export function useUpdateActivity(id: number) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: updateActivity, isError: isActivityUpdatingError } =
    useMutation({
      mutationKey: ["update activity"],
      mutationFn: (data: CreateActivityInput) =>
        activityRepository.update(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["get activities"] });
        queryClient.invalidateQueries({ queryKey: ["get activity by id", id] });
        router.push("/activities");
      },
      onError: (error) => {
        console.error(error);
      },
    });
  return { updateActivity, isActivityUpdatingError };
}
