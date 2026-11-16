import { AppText } from "@/components/ui/app-text";
import { Screen } from "@/components/ui/screen";
import { ActivitiesGlobalStats } from "@/features/activities/ui/activities-global-stats";
import { View } from "react-native";

export default function StatsScreen() {
  return (
    <Screen>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <AppText variant="hero">Статистика</AppText>
      </View>
      <ActivitiesGlobalStats />
    </Screen>
  );
}
