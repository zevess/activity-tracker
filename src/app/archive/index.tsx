import { AppText } from "@/components/ui/app-text";
import { BackButton } from "@/components/ui/back-button";
import { Screen } from "@/components/ui/screen";
import { useGetArchivedActivities } from "@/data/queries/activities/use-get-archived-activities";
import { ActivitiesList } from "@/features/activities/ui/activities-list";
import { View } from "react-native";

export default function ArchiveScreen() {
  const {
    archivedActivities,
    isArchivedError,
    isArchivedLoaded,
    isArchivedLoading,
  } = useGetArchivedActivities();
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
      {isArchivedLoaded && (
        <ActivitiesList
          isError={isArchivedError}
          isLoading={isArchivedLoading}
          activities={archivedActivities ?? []}
        />
      )}
    </Screen>
  );
}
