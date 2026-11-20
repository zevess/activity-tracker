import { Screen } from "@/components/ui/screen";
import { ScreenTitle } from "@/components/ui/screen-title";
import { StatusMessage } from "@/components/ui/status-message";
import { useGetActivityById } from "@/data/queries/activities/use-get-activity-by-id";
import { ActivityForm } from "@/features/activities/ui/activity-form";
import { useInitialData } from "@/hooks/use-initial-data";
import { useLocalSearchParams } from "expo-router";

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
      <ScreenTitle variant="title" withBack title="Изменить" />
      <ActivityForm
        key={activityId}
        initialData={initialData}
        activityId={activity?.id}
        mode="edit"
      />
    </Screen>
  );
}
