import { useAppTheme } from "@/theme/theme-provider";
import { View } from "react-native";
import { AppText } from "./app-text";
import { Card } from "./card";

type HeroPanelProps = {
  eyebrow: string;
  title: string;
  body: string;
  meta?: string;
};

export function HeroPanel({ eyebrow, title, body, meta }: HeroPanelProps) {
  const { colors, radius, spacing } = useAppTheme();
  return (
    <Card
      style={{
        gap: spacing.lg,
        padding: spacing.xl,
        backgroundColor: colors.surfaceStrong,
        borderColor: colors.border,
      }}
    >
      <View style={{ gap: spacing.md }}>
        <AppText variant="eyebrow">{eyebrow}</AppText>
        <AppText variant="hero">{title}</AppText>
        <AppText tone="muted">{body}</AppText>
      </View>
      {meta ? (
        <View
          style={{
            alignSelf: "flex-start",
            borderRadius: radius.pill,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.md,
            backgroundColor: colors.primarySoft,
          }}
        >
          <AppText
            style={{ color: colors.primary, fontWeight: "900" }}
            variant="caption"
          >
            {meta}
          </AppText>
        </View>
      ) : null}
    </Card>
  );
}
