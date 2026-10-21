import { useCreateActivity } from "@/data/queries/activities.queries";
import { useState } from "react";
import { View } from "react-native";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function ActivityForm() {
  const [name, setName] = useState("");
  const { createActivity } = useCreateActivity();
  async function onPress() {
    if (!name.trim()) return;
    createActivity(
      {
        title: name,
        type: "habit",
        scheduleType: "custom",
      },
      {
        onSuccess: () => {
          setName("");
        },
      },
    );
  }
  return (
    <View style={{ gap: 16, justifyContent: "space-between", flex: 1 }}>
      <Input
        value={name}
        onChangeText={setName}
        label="Название"
        variant="default"
      />
      <Button disabled={!name} onPress={onPress} label="Добавить" />
    </View>
  );
}
