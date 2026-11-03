import { AppText } from "@/components/ui/app-text";
import { Button } from "@/components/ui/button";
import { useActivityStatus } from "@/data/queries/activities/use-get-activity-status";
import { useMarkActivityAsCompleted } from "@/data/queries/activities/use-mark-activity";
import { Activity } from "@/data/types/activities.types";
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

  const { activityStatus } = useActivityStatus(activityId, date);
  const { markActivity, isActivityMarking } = useMarkActivityAsCompleted();
  const status = getFormatedStatus(activityStatus);
  const isSameDate = activity?.targetDays?.includes(date.getDay());

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
      {status?.value !== "done" && (
        <Button
          disabled={isActivityMarking}
          loading={isActivityMarking}
          onPress={handlePress}
          label={"Завершить"}
        />
      )}
      {status?.value === "done" && isSameDate && (
        <AppText style={{ alignSelf: "center" }} tone="muted" variant="title">
          {status.label}
        </AppText>
      )}
      {activity?.type === "habit" && !isSameDate && (
        <AppText style={{ alignSelf: "center" }} tone="muted" variant="title">
          День еще не наступил
        </AppText>
      )}
    </View>
  );
}
