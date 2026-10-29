import { AppText } from "@/components/ui/app-text";
import { BackButton } from "@/components/ui/back-button";
import { Screen } from "@/components/ui/screen";
import { useGetActivityById } from "@/data/queries/activities.queries";
import { ActivityForm } from "@/features/activities/ui/activity-form";
import { useInitialData } from "@/hooks/use-initial-data";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function EditActivityScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const activityId = Number(id);
  const { activity, isActivityLoading } = useGetActivityById(activityId);
  const { initialData } = useInitialData(activity);

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
        <AppText variant="hero">Изменить активность</AppText>
      </View>
      <ActivityForm
        key={activityId}
        initialData={initialData}
        activityId={activity?.id}
        mode="edit"
      />
    </Screen>
  );
}
