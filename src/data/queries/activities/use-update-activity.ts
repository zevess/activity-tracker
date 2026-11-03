import { activityRepository } from "@/data/repositories/activity-repository";
import { CreateActivityInput } from "@/data/types/activities.types";
import { appToast } from "@/lib/toast/app-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

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
