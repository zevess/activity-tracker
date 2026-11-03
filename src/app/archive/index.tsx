import { AppText } from "@/components/ui/app-text";
import { BackButton } from "@/components/ui/back-button";
import { Screen } from "@/components/ui/screen";
import { useGetCompletedActivities } from "@/data/queries/activities/use-get-completed-activities";
import { ActivitiesList } from "@/features/activities/ui/activities-list";
import { View } from "react-native";

export default function ArchiveScreen() {
  const {
    completedActivities,
    isCompletedActivitiesLoaded,
    isCompletedActivitiesLoading,
    isCompletedActivitiesError,
  } = useGetCompletedActivities();
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
        <AppText variant="title">Архив</AppText>
      </View>
      {isCompletedActivitiesLoaded && (
        <ActivitiesList
          isError={isCompletedActivitiesError}
          isLoading={isCompletedActivitiesLoading}
          activities={completedActivities ?? []}
        />
      )}
    </Screen>
  );
}
