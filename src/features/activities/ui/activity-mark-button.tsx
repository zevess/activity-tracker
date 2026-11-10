import { AppText } from "@/components/ui/app-text";
import { Button } from "@/components/ui/button";
import { useGetActivityStatus } from "@/data/queries/activities/use-get-activity-status";
import { useMarkActivityAsCompleted } from "@/data/queries/activities/use-mark-activity";
import { Activity } from "@/data/types/activities.types";
import { getISODay } from "date-fns";
import { View } from "react-native";
import { getFormatedStatus } from "../lib/get-formated-status";

type ActivityMarkButtonProps = {
  activity?: Activity | null;
  activityId: number;
};

export function ActivityMarkButton({
  activity,
  activityId,
}: ActivityMarkButtonProps) {
  const date = new Date();
  const isoDayNumber = getISODay(date);
  const { activityStatus } = useGetActivityStatus(activityId, date);
  const { markActivity, isActivityMarking } = useMarkActivityAsCompleted();
  const status = getFormatedStatus(activityStatus);
  const isScheduledToday = activity?.targetDays?.includes(isoDayNumber);
  const isCompleted = status?.value === "done";

  const shouldShowMarkButton =
    (activity?.type === "habit" && isScheduledToday && !isCompleted) ||
    (activity?.type === "one_off" && !isCompleted);
  const shouldShowCompletedMessage = isCompleted;
  const shouldShowNotScheduledMessage =
    activity?.type === "habit" && !isScheduledToday;

  function handlePress() {
    if (activity) {
      markActivity({
        type: activity?.type,
        activityId,
        date,
      });
    }
  }
  return (
    <View>
      {shouldShowMarkButton && (
        <Button
          disabled={isActivityMarking}
          loading={isActivityMarking}
          onPress={handlePress}
          label={"Завершить"}
        />
      )}
      {shouldShowCompletedMessage && (
        <AppText style={{ alignSelf: "center" }} tone="muted" variant="title">
          {status.label ?? "Выполнено"}
        </AppText>
      )}
      {shouldShowNotScheduledMessage && (
        <AppText style={{ alignSelf: "center" }} tone="muted" variant="title">
          День еще не наступил
        </AppText>
      )}
    </View>
  );
}
