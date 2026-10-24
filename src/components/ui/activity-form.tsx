import { useCreateActivity } from "@/data/queries/activities.queries";
import { useGetCategories } from "@/data/queries/categories.queries";
import {
  ActivityType,
  activityTypeOptions,
} from "@/data/types/activities.types";
import { useState } from "react";
import { View } from "react-native";
import { Button } from "./button";
import { CategoryPicker } from "./category-picker";
import { Input } from "./input";
import { RadioButtonGroup } from "./radio-button-group";

export function ActivityForm() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedType, setSelectedType] = useState<ActivityType>("habit");
  const [selectedCategory, setSelectedCategory] = useState<number>();

  const { createActivity } = useCreateActivity();
  const { categories } = useGetCategories();

  async function onSubmit() {
    if (!title.trim()) return;
    createActivity(
      {
        title,
        type: selectedType,
        scheduleType: "custom",
        description,
        categoryId: null,
        targetDays: null,
        reminderTime: null,
        dueTime: null,
        priority: null,
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
          value={description}
          onChangeText={setDescription}
          label="Описание"
          variant="default"
        />
        {selectedType === "habit" && (
          <CategoryPicker
            label="Категория"
            options={categories ?? []}
            selectedOption={selectedCategory}
            onSelectOption={setSelectedCategory}
          />
        )}
      </View>

      <Button disabled={!title} onPress={onSubmit} label="Добавить" />
    </View>
  );
}
