import { AppText } from "@/components/ui/app-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Screen } from "@/components/ui/screen";
import { useGetUserProfile } from "@/data/queries/user/use-get-user-profile";
import { useUpdateUserProfile } from "@/data/queries/user/use-update-user-profile";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const { profile, isProfileError, isProfileLoaded, isProfileLoading } =
    useGetUserProfile();
  const { updateProfile } = useUpdateUserProfile();

  useEffect(() => {
    if (isProfileLoaded && profile?.name !== "Пользователь") {
      router.replace("/");
    }
  }, [profile, isProfileLoaded]);

  function handlePress() {
    if (name) {
      updateProfile(name, {
        onSuccess: () => router.navigate("/"),
      });
    }
  }

  return (
    <Screen>
      <View style={{ flex: 1, gap: 24, width: "100%" }}>
        <AppText
          style={{ paddingBottom: "25%", paddingTop: "25%" }}
          variant="hero"
        >
          Приветствую!
        </AppText>
        <Input
          size="lg"
          variant="default"
          value={name}
          onChangeText={setName}
          placeholder="Как к вам обращаться?"
        />
      </View>
      <Button onPress={handlePress} label="Сохранить" />
    </Screen>
  );
}
