import { AppText } from "@/components/ui/app-text";
import { Screen } from "@/components/ui/screen";
import { useGetUserProfile } from "@/data/queries/user/use-get-user-profile";
import { UserSettingsForm } from "@/features/user/ui/user-settings-form";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function WelcomeScreen() {
  const router = useRouter();
  const { profile, isProfileError, isProfileLoaded, isProfileLoading } =
    useGetUserProfile();

  useEffect(() => {
    if (isProfileLoaded && profile && profile?.name !== "Пользователь") {
      router.replace("/");
    }
  }, [profile, isProfileLoaded]);

  return (
    <Screen>
      <AppText
        style={{ paddingBottom: "25%", paddingTop: "25%" }}
        variant="hero"
      >
        Приветствую!
      </AppText>
      <UserSettingsForm
        userName={profile?.name}
        onSuccess={() => router.navigate("/")}
        style={{ flex: 1 }}
      />
    </Screen>
  );
}
