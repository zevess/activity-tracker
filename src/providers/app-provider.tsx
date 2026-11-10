import { AppThemeProvider } from "@/theme/theme-provider";
import { SQLiteProvider } from "expo-sqlite";
import { DatabaseProvider } from "./database-provider";
import { ProfileProvider } from "./profile-provider";
import QueryProvider from "./query-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SQLiteProvider databaseName="tracker.db">
      <DatabaseProvider>
        <QueryProvider>
          <ProfileProvider>
            <AppThemeProvider>{children}</AppThemeProvider>
          </ProfileProvider>
        </QueryProvider>
      </DatabaseProvider>
    </SQLiteProvider>
  );
}
