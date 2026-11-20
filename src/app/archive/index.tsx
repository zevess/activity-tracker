import { Screen } from "@/components/ui/screen";
import { ScreenTitle } from "@/components/ui/screen-title";
import { useGetArchivedActivities } from "@/data/queries/activities/use-get-archived-activities";
import { ActivitiesList } from "@/features/activities/ui/activities-list";

export default function ArchiveScreen() {
  const {
    archivedActivities,
    isArchivedError,
    isArchivedLoaded,
    isArchivedLoading,
  } = useGetArchivedActivities();
  return (
    <Screen>
      <ScreenTitle withBack title="Архив" />
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
