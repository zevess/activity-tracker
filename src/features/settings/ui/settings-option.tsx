import { AppText } from "@/components/ui/app-text";
import { useAppTheme } from "@/theme/theme-provider";
import { Pressable, View } from "react-native";

export type SettingsOptionType = {
  label: string;
  onPress?: () => void;
  sublabel?: string | null;
};

export function SettingsOption({
  label,
  onPress,
  sublabel,
}: SettingsOptionType) {
  const { colors, spacing, radius, motion } = useAppTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          gap: spacing.md,
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.xl,
          borderRadius: radius.md,
          width: "100%",
          opacity: pressed ? motion.opacity.pressed : 1,
          backgroundColor: pressed ? colors.border : colors.surface,
        },
      ]}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <AppText variant="subtitle">{label}</AppText>
        {sublabel && (
          <AppText tone="muted" variant="subtitle">
            {sublabel}
          </AppText>
        )}
      </View>
    </Pressable>
  );
}
