import { Divider } from "@/components/ui/divider";
import { SectionHeader } from "@/components/ui/section-header";
import { StatusMessage } from "@/components/ui/status-message";
import { Activity } from "@/data/types/activities.types";
import { View } from "react-native";
import { ActivityCard } from "./activity-card";

type ActivitiesListProps = {
  activities: Activity[];
  isLoading: boolean;
  isError: boolean;
  isUpcoming?: boolean;
};

export function ActivitiesList({
  activities,
  isLoading,
  isError,
  isUpcoming = false,
}: ActivitiesListProps) {
  const oneOffs = activities.filter((activity) => activity.type === "one_off");
  const habits = activities.filter((acitivity) => acitivity.type === "habit");
  if (isLoading) {
    return <StatusMessage isLoading />;
  }

  if (isError) {
    return <StatusMessage text="Список активностей пуст" />;
  }
  if (activities.length === 0) {
    return <StatusMessage text="Список активностей пуст" />;
  }

  return (
    <View style={{ gap: 16 }}>
      {habits.length > 0 && (
        <>
          <View style={{ gap: 12 }}>
            <SectionHeader
              title={isUpcoming ? "Ближайшие привычки" : "Привычки"}
            />
            {habits.map((habit) => (
              <ActivityCard key={habit.id} activity={habit} />
            ))}
          </View>
          <Divider />
        </>
      )}
      {oneOffs.length > 0 && (
        <View style={{ gap: 12 }}>
          <SectionHeader
            title={isUpcoming ? "Ближайшие активности" : "Активности"}
          />
          {oneOffs.map((oneOff) => (
            <ActivityCard key={oneOff.id} activity={oneOff} />
          ))}
        </View>
      )}
    </View>
  );
}
