import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Screen } from "@/components/ui/screen";
import { Text } from "react-native";

export default function HomeScreen() {
  return (
    <Screen>
      <Text style={{ fontSize: 24, fontWeight: "semibold" }}>Home</Text>
      <Card>
        <Button label="Primary" />
        <Button label="Secondary" variant="secondary" />
        <Button label="Outline" variant="outline" />
        <Button label="Ghost" variant="ghost" />
        <Button label="Danger" variant="danger" />
        <Button
          label="With icon"
          variant="secondary"
          icon="arrow-forward"
          iconPosition="right"
        />
        <Button label="Loading" loading />
        <Button
          label="Small inline"
          size="sm"
          fullWidth={false}
          variant="outline"
        />
      </Card>
    </Screen>
  );
}
