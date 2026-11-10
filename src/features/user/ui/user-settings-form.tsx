import { AppText } from "@/components/ui/app-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateUserProfile } from "@/data/queries/user/use-update-user-profile";
import { getTimeOfDay } from "@/utils/get-time-of-day";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export function UserSettingsForm() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const { updateProfile } = useUpdateUserProfile();
  const timeOfDay = getTimeOfDay();

  function handlePress() {
    if (name) {
      updateProfile(name, {
        onSuccess: () => router.navigate("/"),
      });
    }
  }

  return (
    <View style={{ width: "100%" }}>
      <View style={{ flex: 1, alignItems: "center", gap: 24, width: "100%" }}>
        <AppText variant="hero">Приветствую!</AppText>
        <Input
          size="lg"
          variant="default"
          value={name}
          onChange={() => setName}
          placeholder="Как к вам обращаться?"
        />
      </View>
      <Button onPress={handlePress} label="Сохранить" />
    </View>
  );
}
