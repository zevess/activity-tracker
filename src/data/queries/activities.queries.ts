import { appToast } from "@/lib/toast/app-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { activityRepository } from "../repositories/activity-repository";
import { CreateActivityInput } from "../types/activities.types";

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
      appToast.success("Активность создана");
    },
    onError: (error) => {
      console.error(error);
      appToast.error("Ошибка при создании");
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
        appToast.success("Активность изменена");
      },
      onError: (error) => {
        console.error(error);
        appToast.error("Ошибка при изменении");
      },
    });
  return { updateActivity, isActivityUpdatingError };
}

export function useDeleteActivity() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    mutate: deleteActivity,
    isPending: isActivityDeleting,
    isError: isActivityDeletingError,
  } = useMutation({
    mutationKey: ["delete activity"],
    mutationFn: (id: number) => activityRepository.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get activities"] });
      router.push("/activities");
      appToast.success("Активность удалена");
    },
    onError: (error) => {
      console.error(error);
      appToast.error("Ошибка при удалении");
    },
  });
  return { deleteActivity, isActivityDeletingError, isActivityDeleting };
}
