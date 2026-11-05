import { AppText } from "@/components/ui/app-text";
import { Screen } from "@/components/ui/screen";
import { useGetUpcomingActivities } from "@/data/queries/activities/use-get-upcoming-activities";
import { ActivitiesList } from "@/features/activities/ui/activities-list";
import { View } from "react-native";

export default function HomeScreen() {
  const { upcomingActivities, isUpcomingError, isUpcomingLoading } =
    useGetUpcomingActivities();
  return (
    <Screen>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <AppText variant="hero">Сегодня</AppText>
      </View>
      {upcomingActivities && (
        <ActivitiesList
          isUpcoming
          isError={isUpcomingError}
          isLoading={isUpcomingLoading}
          activities={upcomingActivities}
        />
      )}
    </Screen>
  );
}
