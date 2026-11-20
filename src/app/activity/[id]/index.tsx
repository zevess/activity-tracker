import { Divider } from "@/components/ui/divider";
import { EditButton } from "@/components/ui/edit-icon";
import { Screen } from "@/components/ui/screen";
import { ScreenTitle } from "@/components/ui/screen-title";
import { SectionHeader } from "@/components/ui/section-header";
import { StatusMessage } from "@/components/ui/status-message";
import { useGetActivityById } from "@/data/queries/activities/use-get-activity-by-id";
import { getFormatedType } from "@/features/activities/lib/get-formated-type";
import { ActivityCompleteButton } from "@/features/activities/ui/activity-complete-button";
import { ActivityScreenDetails } from "@/features/activities/ui/activity-screen-details";
import { ActivityStatistics } from "@/features/activities/ui/activity-statistics";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function ActivityScreen() {
  const { id } = useLocalSearchParams();
  const activityId = Number(id);
  const { activity, isActivityLoading, isActivityError } =
    useGetActivityById(activityId);
  const activityType = getFormatedType(activity?.type);

  if (isActivityLoading) {
    return <StatusMessage isLoading />;
  }

  if (isActivityError) {
    return <StatusMessage text="Ошибка при получении активности" />;
  }

  return (
    <Screen>
      <ScreenTitle
        withBack
        title={activityType?.label ? activityType.label : ""}
      >
        {!activity?.completedAt ? (
          <EditButton id={activityId} />
        ) : (
          <View style={{ width: 46 }} />
        )}
      </ScreenTitle>
      <ActivityScreenDetails activity={activity} />
      <Divider />
      {activity?.type === "habit" && (
        <View style={{ gap: 12 }}>
          <SectionHeader title="Статистика" />
          <ActivityStatistics activityId={activityId} />
        </View>
      )}
      <ActivityCompleteButton activity={activity} activityId={activityId} />
    </Screen>
  );
}
