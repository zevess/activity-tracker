import { activityLogsRepository } from "@/data/repositories/activity-logs-repository";
import { activityRepository } from "@/data/repositories/activity-repository";
import { ActivityType } from "@/data/types/activities.types";
import { appToast } from "@/lib/toast/app-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useRouter } from "expo-router";

export function useMarkActivityAsCompleted() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    mutate: markActivity,
    isPending: isActivityMarking,
    isError: isMarkError,
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
        await activityRepository.markOneOffCompleted(activityId);
      }
      return await activityLogsRepository.markDone(activityId, date);
    },
    onSuccess: (_, { activityId, date }) => {
      const dateStr = format(date ?? new Date(), "yyyy-MM-dd");
      queryClient.invalidateQueries({
        queryKey: ["get activity status", activityId, dateStr],
      });
      queryClient.invalidateQueries({ queryKey: ["get activities"] });
      router.push("/activities");
      appToast.success("Активность отмечена");
    },
    onError: (error) => {
      console.error(error);
      appToast.error("Ошибка при отметке");
    },
  });
  return { markActivity, isMarkError, isActivityMarking };
}
