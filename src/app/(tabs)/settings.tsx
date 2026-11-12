import { AppText } from "@/components/ui/app-text";
import { Screen } from "@/components/ui/screen";
import { useGetUserProfile } from "@/data/queries/user/use-get-user-profile";
import { SettingsOption } from "@/features/settings/ui/settings-option";
import { UserSettingsForm } from "@/features/user/ui/user-settings-form";
import { useAppTheme } from "@/theme/theme-provider";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function SettingsScreen() {
  const router = useRouter();
  const { profile } = useGetUserProfile();
  const { colors, radius, spacing, motion } = useAppTheme();
  const [isNameChanging, setIsNameChanging] = useState(false);

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
      <View
        style={{
          backgroundColor: colors.surface,
          borderRadius: radius.md,
        }}
      >
        <SettingsOption
          onPress={() => setIsNameChanging(!isNameChanging)}
          label="Имя"
          sublabel={profile?.name}
        />
        {isNameChanging && (
          <UserSettingsForm
            style={{ gap: spacing.sm, padding: spacing.md }}
            userName={profile?.name}
            onSuccess={() => setIsNameChanging(!isNameChanging)}
          />
        )}
        <SettingsOption
          onPress={() => router.navigate("/archive")}
          label="Архив"
        />
      </View>
    </Screen>
  );
}
