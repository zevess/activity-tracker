import { useCreateActivity } from "@/data/queries/activities.queries";
import {
  ActivityType,
  activityTypeOptions,
} from "@/data/types/activities.types";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { RadioButtonGroup } from "../ui/radio-button-group";

export function ActivityForm() {
  const [title, setTitle] = useState("");
  const [selectedType, setSelectedType] = useState<ActivityType>("habit");

  const { createActivity } = useCreateActivity();

  async function onSubmit() {
    if (!title.trim()) return;
    createActivity(
      {
        title: title,
        type: "habit",
        scheduleType: "custom",
      },
      {
        onSuccess: () => {
          setTitle("");
        },
      },
    );
  }
  return (
    <View style={{ justifyContent: "space-between", flex: 1 }}>
      <View style={{ gap: 16 }}>
        <RadioButtonGroup
          label="Тип"
          selectedOption={selectedType}
          setSelectedOption={setSelectedType}
          options={activityTypeOptions}
        />
        <Input
          size="lg"
          value={title}
          onChangeText={setTitle}
          label="Название"
          variant="default"
        />
        <Input
          size="sm"
          value={title}
          onChangeText={setTitle}
          label="Название"
          variant="default"
        />
      </View>

      <Button disabled={!title} onPress={onSubmit} label="Добавить" />
    </View>
  );
}
