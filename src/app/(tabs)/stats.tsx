import { AppText } from "@/components/ui/app-text";
import { Screen } from "@/components/ui/screen";
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
    </Screen>
  );
}
