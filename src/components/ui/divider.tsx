import { useAppTheme } from "@/theme/theme-provider";
import { View } from "react-native";

export function Divider() {
  const { colors } = useAppTheme();
  return <View style={{ height: 1, backgroundColor: colors.border }} />;
}
