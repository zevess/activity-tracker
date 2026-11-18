import { activityLogsRepository } from "@/data/repositories/activity-logs-repository";
import { activityRepository } from "@/data/repositories/activity-repository";
import { ActivityType } from "@/data/types/activities.types";
import { appToast } from "@/lib/toast/app-toast";
import { cancelActivityNotifications } from "@/utils/schedule-notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useRouter } from "expo-router";

export function useCompleteActivity() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    mutate: completeActivity,
    isPending: isActivityCompleting,
    isError: isCompleteError,
  } = useMutation({
    mutationKey: ["mark activity"],
    mutationFn: async ({
      type,
      activityId,
      date = new Date(),
    }: {
      type: ActivityType;
      activityId: number;
      date?: Date;
    }) => {
      if (type === "one_off") {
        await activityRepository.completeOneOff(activityId);
      }
      return await activityLogsRepository.complete(activityId, date);
    },
    onSuccess: async (_, { activityId, date, type }) => {
      if (type === "one_off") {
        await cancelActivityNotifications(activityId);
      }
      const dateStr = format(date ?? new Date(), "yyyy-MM-dd");
      queryClient.invalidateQueries({
        queryKey: ["get activity status", activityId, dateStr],
      });
      queryClient.invalidateQueries({ queryKey: ["get activities"] });
      queryClient.invalidateQueries({ queryKey: ["get upcoming activities"] });
      queryClient.invalidateQueries({
        queryKey: ["get completed today activities"],
      });
      queryClient.invalidateQueries({ queryKey: ["get missed activities"] });
      queryClient.invalidateQueries({ queryKey: ["get global statistics"] });

      router.back();
      appToast.success("Активность выполнена");
    },
    onError: (error) => {
      console.error(error);
      appToast.error("Ошибка при отметке");
    },
  });
  return { completeActivity, isActivityCompleting, isCompleteError };
}
