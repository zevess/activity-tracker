import { Activity } from "@/data/types/activities.types";
import { useAppTheme } from "@/theme/theme-provider";
import { View } from "react-native";
import { AppText } from "../ui/app-text";
import { Card } from "../ui/card";

export function ActivityCard({ title }: Activity) {
  const { colors } = useAppTheme();
  return (
    <Card style={{ backgroundColor: colors.mint }}>
      <AppText variant="subtitle">{title}</AppText>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* <AppText variant="body">{time}</AppText>
        <AppText variant="caption">{category}</AppText> */}
      </View>
    </Card>
  );
}
