import { Card } from "@/components/ui/card";
import { useAppTheme } from "@/theme/theme-provider";
import { Image } from "react-native";

type TreeCardProps = {
  onPress?: () => void;
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
};

export function TreeCard({ onPress, icon, title, subtitle }: TreeCardProps) {
  const { colors, radius, spacing } = useAppTheme();

  return (
    <Card
      style={{
        aspectRatio: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: spacing.md,
        gap: spacing.sm,
      }}
    >
      <Image
        source={require("@/assets/images/trees/4.jpg")}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
        resizeMode="cover"
      />
    </Card>
  );
}
