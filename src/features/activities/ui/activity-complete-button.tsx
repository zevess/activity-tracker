import { AppText } from "@/components/ui/app-text";
import { Button } from "@/components/ui/button";
import { useCompleteActivity } from "@/data/queries/activities/use-complete-activity";
import { useGetActivityStatus } from "@/data/queries/activities/use-get-activity-status";
import { Activity } from "@/data/types/activities.types";
import { getISODay } from "date-fns";
import { View } from "react-native";
import { getFormatedStatus } from "../lib/get-formated-status";

type ActivityCompleteButtonProps = {
  activity?: Activity | null;
  activityId: number;
};

export function ActivityCompleteButton({
  activity,
  activityId,
}: ActivityCompleteButtonProps) {
  const date = new Date();
  const isoDayNumber = getISODay(date);
  const { activityStatus } = useGetActivityStatus(activityId, date);
  const { completeActivity, isActivityCompleting } = useCompleteActivity();
  const status = getFormatedStatus(activityStatus);
  const isScheduledToday = activity?.targetDays?.includes(isoDayNumber);
  const isCompleted = status?.value === "done" || activity?.completedAt;
  const isArchived = activity?.isArchived;

  const shouldShowMarkButton =
    (activity?.type === "habit" && isScheduledToday && !isCompleted) ||
    (activity?.type === "one_off" && !isCompleted);
  const shouldShowCompletedMessage = isCompleted && !isArchived;
  const shouldShowNotScheduledMessage =
    activity?.type === "habit" && !isScheduledToday && !isArchived;
  const shouldShowArchivedMessage = isArchived;

  function handlePress() {
    if (activity) {
      completeActivity({
        type: activity?.type,
        activityId,
        date,
      });
    }
  }
  return (
    <View style={{ marginTop: "auto" }}>
      {shouldShowMarkButton && (
        <Button
          disabled={isActivityCompleting}
          loading={isActivityCompleting}
          onPress={handlePress}
          label={"Завершить"}
        />
      )}
      {shouldShowCompletedMessage && (
        <AppText style={{ alignSelf: "center" }} tone="muted" variant="title">
          {"Выполнено"}
        </AppText>
      )}
      {shouldShowNotScheduledMessage && (
        <AppText style={{ alignSelf: "center" }} tone="muted" variant="title">
          День еще не наступил
        </AppText>
      )}
      {shouldShowArchivedMessage && (
        <AppText style={{ alignSelf: "center" }} tone="muted" variant="title">
          Архивировано
        </AppText>
      )}
    </View>
  );
}
