import { Activity } from "@/data/types/activities.types";
import { ActivityIndicator, View } from "react-native";
import { ActivityCard } from "./activity-card";
import { AppText } from "./app-text";

type ActivitiesListProps = {
  activities: Activity[];
  isLoading: boolean;
  isError: boolean;
};

export function ActivitiesList({
  activities,
  isLoading,
  isError,
}: ActivitiesListProps) {
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <AppText variant="title" tone="muted">
          Список активностей пуст
        </AppText>
      </View>
    );
  }
  if (activities.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <AppText variant="title" tone="muted">
          Список активностей пуст
        </AppText>
      </View>
    );
  }
  return (
    <View style={{ gap: 12 }}>
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </View>
  );
}
