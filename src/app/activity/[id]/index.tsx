import { AppText } from "@/components/ui/app-text";
import { BackButton } from "@/components/ui/back-button";
import { EditButton } from "@/components/ui/edit-icon";
import { Screen } from "@/components/ui/screen";
import { useGetActivityById } from "@/data/queries/activities/use-get-activity-by-id";
import { getFormatedType } from "@/features/activities/lib/get-formated-type";
import { ActivityMarkButton } from "@/features/activities/ui/activity-mark-button";
import { ActivityScreenDetails } from "@/features/activities/ui/activity-screen-details";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function ActivityScreen() {
  const { id } = useLocalSearchParams();
  const activityId = Number(id);
  const { activity, isActivityLoading } = useGetActivityById(activityId);
  const activityType = getFormatedType(activity?.type);

  if (isActivityLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
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
      <ActivityMarkButton activity={activity} activityId={activityId} />
    </Screen>
  );
}
