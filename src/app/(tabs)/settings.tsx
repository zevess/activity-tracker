import { AppText } from "@/components/ui/app-text";
import { Screen } from "@/components/ui/screen";
import { Link } from "expo-router";
import { View } from "react-native";

export default function SettingsScreen() {
  return (
    <Screen>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <AppText variant="hero">Настройки</AppText>
      </View>
      <View>
        <Link href={"/archive"}>Архив</Link>
      </View>
    </Screen>
  );
}
