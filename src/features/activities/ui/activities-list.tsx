import { Divider } from "@/components/ui/divider";
import { SectionHeader } from "@/components/ui/section-header";
import { Activity } from "@/data/types/activities.types";
import { ActivityIndicator, View } from "react-native";
import { AppText } from "../../../components/ui/app-text";
import { ActivityCard } from "./activity-card";

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
  const oneOffs = activities.filter((activity) => activity.type === "one_off");
  const habits = activities.filter((acitivity) => acitivity.type === "habit");
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
    <View style={{ gap: 16 }}>
      <View style={{ gap: 12 }}>
        <SectionHeader title="Привычки" />
        {habits.map((habit) => (
          <ActivityCard key={habit.id} activity={habit} />
        ))}
      </View>
      <Divider />

      <View style={{ gap: 12 }}>
        <SectionHeader title="Активности" />
        {oneOffs.map((oneOff) => (
          <ActivityCard key={oneOff.id} activity={oneOff} />
        ))}
      </View>
    </View>
  );
}
