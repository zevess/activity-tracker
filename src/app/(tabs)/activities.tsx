import { IconButton } from "@/components/ui/icon-button";
import { Screen } from "@/components/ui/screen";
import { ScreenTitle } from "@/components/ui/screen-title";
import { useGetActivities } from "@/data/queries/activities/use-get-activities";
import { ActivitiesList } from "@/features/activities/ui/activities-list";
import { Link } from "expo-router";

export default function ActivitiesScreen() {
  const {
    activities,
    isActivitiesLoading,
    isActivitiesLoaded,
    isActivitiesError,
  } = useGetActivities();

  return (
    <Screen>
      <ScreenTitle title="Активности">
        <Link href={"/activity/new"} asChild>
          <IconButton name="add" variant="primary" />
        </Link>
      </ScreenTitle>

      {isActivitiesLoaded && (
        <ActivitiesList
          isError={isActivitiesError}
          isLoading={isActivitiesLoading}
          activities={activities ?? []}
        />
      )}
    </Screen>
  );
}
