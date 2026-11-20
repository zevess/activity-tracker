import { ScreenTitle } from "@/components/ui/screen-title";
import { useGetActivities } from "@/data/queries/activities/use-get-activities";
import { useAppTheme } from "@/theme/theme-provider";
import { FlatList, View } from "react-native";
import { TreeCard } from "./tree-card";

export function TreesGarden() {
  const { spacing } = useAppTheme();
  const { activities } = useGetActivities();
  return (
    <FlatList
      data={activities}
      keyExtractor={(item) => String(item.id)}
      numColumns={2}
      contentContainerStyle={{ gap: spacing.md }}
      columnWrapperStyle={{ gap: spacing.md }}
      ListHeaderComponent={
        <ScreenTitle style={{ paddingBottom: spacing.xs }} title="Сад" />
      }
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={{ flex: 1, maxWidth: "50%" }}>
          <TreeCard
            title={item.title}
            onPress={() => console.log(item.title)}
          />
        </View>
      )}
    />
  );
}
