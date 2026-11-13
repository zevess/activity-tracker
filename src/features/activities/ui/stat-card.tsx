import { AppText } from "@/components/ui/app-text";
import { IconName } from "@/components/ui/icon";
import { useAppTheme } from "@/theme/theme-provider";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";

type StatCardProps = {
  icon: IconName;
  label: string;
  color: string;
  value: string | number;
};

export function StatCard({ icon, label, color, value }: StatCardProps) {
  const { colors, spacing, radius } = useAppTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        padding: spacing.md,
        alignItems: "center",
        gap: spacing.xs,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: color + "20",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons size={20} color={color} name={icon} />
      </View>
      <AppText variant="body">{value}</AppText>
      <AppText variant="caption">{label}</AppText>
    </View>
  );
}
