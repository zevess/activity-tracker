import { AppText } from "@/components/ui/app-text";
import { BackButton } from "@/components/ui/back-button";
import { Screen } from "@/components/ui/screen";
import { StatusMessage } from "@/components/ui/status-message";
import { useGetActivityById } from "@/data/queries/activities/use-get-activity-by-id";
import { ActivityForm } from "@/features/activities/ui/activity-form";
import { useInitialData } from "@/hooks/use-initial-data";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function EditActivityScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const activityId = Number(id);
  const { activity, isActivityLoading } = useGetActivityById(activityId);
  const { initialData } = useInitialData(activity);

  if (isActivityLoading) {
    return <StatusMessage isLoading />;
  }

  return (
    <Screen>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 24,
        }}
      >
        <BackButton />
        <AppText variant="title">Изменить</AppText>
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
