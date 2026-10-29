import { AppText } from "@/components/ui/app-text";
import { Card } from "@/components/ui/card";
import { Screen } from "@/components/ui/screen";
import { Link } from "expo-router";

export default function NotFoundPage() {
  return (
    <Screen contentStyle={{ justifyContent: "center" }}>
      <Card>
        <AppText variant="subtitle" tone="muted">
          Такого экрана нету
        </AppText>
        <Link href={"/"} style={{ textDecorationLine: "underline" }}>
          На главную
        </Link>
      </Card>
    </Screen>
  );
}
