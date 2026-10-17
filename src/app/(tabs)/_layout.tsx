import { tabs } from "@/components/app-tabs";
import { useAppTheme } from "@/theme/theme-provider";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  const { colors, spacing } = useAppTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: {
          fontSize: spacing.md,
        },
      }}
    >
      {tabs.map(({ name, title, icon }) => (
        <Tabs.Screen
          name={name}
          options={{
            title,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={icon}
                size={spacing.xl}
                color={focused ? colors.accent : colors.text}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
