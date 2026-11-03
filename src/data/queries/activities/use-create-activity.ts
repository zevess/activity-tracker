import { activityRepository } from "@/data/repositories/activity-repository";
import { CreateActivityInput } from "@/data/types/activities.types";
import { appToast } from "@/lib/toast/app-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

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
