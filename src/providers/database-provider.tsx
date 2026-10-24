import { db } from "@/data/db";
import { seedDatabase } from "@/data/db/seed";
import migrations from "@/drizzle/migrations";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const { success, error } = useMigrations(db, migrations);
  const [isSeeded, setIsSeeded] = useState(false);

  useEffect(() => {
    if (success && !isSeeded) {
      seedDatabase().finally(() => setIsSeeded(true));
    }
  }, [success, isSeeded]);

  const expoDb = useSQLiteContext();
  useDrizzleStudio(expoDb);
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
        <Text>Ошибка миграции</Text>
      </View>
    );
  }
  if (!success) {
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return <>{children}</>;
}
