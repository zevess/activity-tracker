import { Card } from "@/components/ui/card";
import { Screen } from "@/components/ui/screen";
import { Link, useRouter } from "expo-router";
import { Button, Text } from "react-native";

export default function SettingsScreen() {
  const router = useRouter();
  return (
    <Screen>
      <Text style={{ fontSize: 24, fontWeight: "semibold" }}>Настройки</Text>
      <Card>
        <Text style={{ fontSize: 24 }}>Такого экрана нету</Text>
        <Link href={"/"} style={{ textDecorationLine: "underline" }}>
          На главную
        </Link>
      </Card>
      {__DEV__ && (
        <Button title="Тест ДБ" onPress={() => router.push("/dev")} />
      )}
    </Screen>
  );
}
