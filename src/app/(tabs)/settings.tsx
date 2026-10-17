import { Screen } from "@/components/ui/screen";
import { useRouter } from "expo-router";
import { Button, Text } from "react-native";

export default function SettingsScreen() {
  const router = useRouter();
  return (
    <Screen>
      <Text style={{ fontSize: 24, fontWeight: "semibold" }}>Настройки</Text>
      {__DEV__ && (
        <Button title="Тест ДБ" onPress={() => router.push("/dev")} />
      )}
    </Screen>
  );
}
