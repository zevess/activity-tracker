import { AppText } from "@/components/ui/app-text";
import { BackButton } from "@/components/ui/back-button";
import { Screen } from "@/components/ui/screen";
import { ActivityForm } from "@/features/activities/ui/activity-form";
import { View } from "react-native";

export default function NewActivityScreen() {
  return (
    <Screen>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 24,
        }}
      >
        <BackButton />
        <AppText variant="title">Новая активность</AppText>
      </View>
      <ActivityForm mode="create" />
    </Screen>
  );
}
