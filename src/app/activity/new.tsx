import { ActivityForm } from "@/components/activity-form/activity-form";
import { AppText } from "@/components/ui/app-text";
import { IconButton } from "@/components/ui/icon-button";
import { Screen } from "@/components/ui/screen";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function NewActivityScreen() {
  const router = useRouter();
  return (
    <Screen>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton
          onPress={() => router.back()}
          name="arrow-back"
          variant="primary"
        />
        <AppText variant="hero">Новая активность</AppText>
      </View>
      <ActivityForm />
    </Screen>
  );
}
