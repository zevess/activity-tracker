import { useCreateActivity } from "@/data/queries/activities.queries";
import { useGetCategories } from "@/data/queries/categories.queries";
import {
  ActivityType,
  activityTypeOptions,
  ScheduleType,
  scheduleTypeOptions,
} from "@/data/types/activities.types";
import { days } from "@/data/types/days.types";
import { useState } from "react";
import { View } from "react-native";
import { Button } from "./button";
import { CategoryPicker } from "./category-picker";
import { DayPicker } from "./day-picker";
import { Input } from "./input";
import { RadioButtonGroup } from "./radio-button-group";
import { TimePicker } from "./time-picker";

export function ActivityForm() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedType, setSelectedType] = useState<ActivityType>("habit");
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const [selectedDays, setSelectedDays] = useState<number[]>([1, 2, 3, 4, 5]);
  const [scheduleType, setScheduleType] = useState<ScheduleType>("daily");
  const [selectedTime, setSelectedTime] = useState<string>("09:00");

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
    <View style={{ justifyContent: "space-between", flex: 1, gap: 16 }}>
      <View style={{ gap: 16 }}>
        <RadioButtonGroup
          label="Тип"
          value={selectedType}
          onChange={setSelectedType}
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
          multiline
          onChangeText={setDescription}
          label="Описание"
          variant="default"
        />
        <CategoryPicker
          label="Категория"
          options={categories ?? []}
          value={selectedCategory}
          onChange={setSelectedCategory}
        />
        <RadioButtonGroup
          label="Расписание"
          value={scheduleType}
          onChange={setScheduleType}
          options={scheduleTypeOptions}
        />
        {scheduleType === "custom" && (
          <DayPicker
            options={days}
            label="Дни"
            values={selectedDays}
            onChange={setSelectedDays}
          />
        )}

        <TimePicker
          label="Время"
          value={selectedTime}
          onChange={setSelectedTime}
        />
      </View>

      <Button disabled={!title} onPress={onSubmit} label="Добавить" />
    </View>
  );
}
