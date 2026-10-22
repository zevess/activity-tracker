import { AppThemeProvider } from "@/theme/theme-provider";
import { SQLiteProvider } from "expo-sqlite";
import { DatabaseProvider } from "./database-provider";
import QueryProvider from "./query-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SQLiteProvider databaseName="tracker.db">
      <DatabaseProvider>
        <QueryProvider>
          <AppThemeProvider>{children}</AppThemeProvider>
        </QueryProvider>
      </DatabaseProvider>
    </SQLiteProvider>
  );
}
