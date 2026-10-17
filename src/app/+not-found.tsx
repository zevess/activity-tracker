import { Card } from "@/components/ui/card";
import { Screen } from "@/components/ui/screen";
import { Link } from "expo-router";
import { Text } from "react-native";

export default function NotFoundPage() {
  return (
    <Screen contentStyle={{ justifyContent: "center" }}>
      <Card>
        <Text style={{ fontSize: 24 }}>Такого экрана нету</Text>
        <Link href={"/"} style={{ textDecorationLine: "underline" }}>
          На главную
        </Link>
      </Card>
    </Screen>
    // <>
    //   <Stack.Screen options={{ title: "Не найдено" }} />
    //   <View
    //     style={{
    //       flex: 1,
    //       alignItems: "center",
    //       justifyContent: "center",
    //       gap: 3,
    //     }}
    //   >
    //     <Text style={{ fontSize: 24 }}>Такого экрана нету</Text>
    //     <Link href={"/"} style={{ textDecorationLine: "underline" }}>
    //       На главную
    //     </Link>
    //   </View>
    // </>
  );
}
