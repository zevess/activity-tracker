import { AppThemeProvider } from "@/theme/theme-provider";
import { DatabaseProvider } from "./database-provider";
import QueryProvider from "./query-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <DatabaseProvider>
      <QueryProvider>
        <AppThemeProvider>{children}</AppThemeProvider>
      </QueryProvider>
    </DatabaseProvider>
  );
}
