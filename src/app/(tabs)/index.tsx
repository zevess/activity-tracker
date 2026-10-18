import { Card } from "@/components/ui/card";
import { Screen } from "@/components/ui/screen";
import { Link } from "expo-router";
import { Text } from "react-native";

export default function HomeScreen() {
  return (
    <Screen>
      <Text style={{ fontSize: 24, fontWeight: "semibold" }}>Home</Text>
    </Screen>
  );
}
