import { activityRepository } from "@/data/repositories/activity-repository";
import { appToast } from "@/lib/toast/app-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

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
