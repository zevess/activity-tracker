import { AppThemeProvider } from "@/theme/theme-provider";
import { DatabaseProvider } from "./database-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <DatabaseProvider>
      <AppThemeProvider>{children}</AppThemeProvider>
    </DatabaseProvider>
  );
}
