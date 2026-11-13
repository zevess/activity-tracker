import { AppText } from "@/components/ui/app-text";
import { BackButton } from "@/components/ui/back-button";
import { Divider } from "@/components/ui/divider";
import { EditButton } from "@/components/ui/edit-icon";
import { Screen } from "@/components/ui/screen";
import { SectionHeader } from "@/components/ui/section-header";
import { StatusMessage } from "@/components/ui/status-message";
import { useGetActivityById } from "@/data/queries/activities/use-get-activity-by-id";
import { getFormatedType } from "@/features/activities/lib/get-formated-type";
import { ActivityMarkButton } from "@/features/activities/ui/activity-mark-button";
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <BackButton />
        <AppText variant="title">{activityType?.label}</AppText>
        {!activity?.completedAt ? (
          <EditButton id={activityId} />
        ) : (
          <View style={{ width: 46 }} />
        )}
      </View>
      <ActivityScreenDetails activity={activity} />
      <Divider />
      {activity?.type === "habit" && (
        <View style={{ gap: 12 }}>
          <SectionHeader title="Статистика" />
          <ActivityStatistics activityId={activityId} />
        </View>
      )}
      <ActivityMarkButton activity={activity} activityId={activityId} />
    </Screen>
  );
}
