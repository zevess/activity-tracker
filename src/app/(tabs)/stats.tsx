import { Screen } from "@/components/ui/screen";
import { ScreenTitle } from "@/components/ui/screen-title";
import { ActivitiesGlobalStats } from "@/features/activities/ui/activities-global-stats";

export default function StatsScreen() {
  return (
    <Screen>
      <ScreenTitle title="Статистика" />
      <ActivitiesGlobalStats />
    </Screen>
  );
}
