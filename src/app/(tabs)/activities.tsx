import { ActivitiesList } from "@/components/ui/activities-list";
import { AppText } from "@/components/ui/app-text";
import { Divider } from "@/components/ui/divider";
import { IconButton } from "@/components/ui/icon-button";
import { Screen } from "@/components/ui/screen";
import { SectionHeader } from "@/components/ui/section-header";
import { useGetActivities } from "@/data/queries/activities.queries";
import { Link } from "expo-router";
import { View } from "react-native";

export default function ActivitiesScreen() {
  const {
    activities,
    isActivitiesLoading,
    isActivitiesLoaded,
    isActivitiesError,
  } = useGetActivities();

  return (
    <Screen>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <AppText variant="hero">Активности</AppText>
        <Link href={"/activity/new"} asChild>
          <IconButton name="add" variant="primary" />
        </Link>
      </View>

      <SectionHeader title="Все активности" />
      {isActivitiesLoaded && (
        <ActivitiesList
          isError={isActivitiesError}
          isLoading={isActivitiesLoading}
          activities={activities ?? []}
        />
      )}

      <Divider />
    </Screen>
  );
}
