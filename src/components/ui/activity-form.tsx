import { useCreateActivity } from "@/data/queries/activities.queries";
import { useGetCategories } from "@/data/queries/categories.queries";
import {
  createActivitySchema,
  CreateActivitySchema,
} from "@/data/schema/activity.schema";
import {
  activityTypeOptions,
  CreateActivityInput,
  priorityOptions,
  scheduleTypeOptions,
} from "@/data/types/activities.types";
import { daysOptions } from "@/data/types/days.types";
import { useTomorrowDate } from "@/hooks/use-tomorrow-date";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { Button } from "./button";
import { CategoryPicker } from "./category-picker";
import { DatePickerWrapper } from "./date-picker";
import { DayPicker } from "./day-picker";
import { Input } from "./input";
import { RadioButtonGroup } from "./radio-button-group";
import { TimePicker } from "./time-picker";

export function ActivityForm() {
  const { createActivity } = useCreateActivity();
  const { categories } = useGetCategories();
  const { tomorrowDate } = useTomorrowDate();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateActivitySchema>({
    resolver: zodResolver(createActivitySchema),
    defaultValues: {
      type: "habit",
      title: "",
      description: "",
      scheduleType: "daily",
      priority: "medium",
      targetDays: [1, 2, 3, 4, 5, 6, 7],
      reminderTime: "09:00",
      dueDate: tomorrowDate,
    },
  });
  const activityType = watch("type");
  const scheduleType = watch("scheduleType");

  function onSubmit(data: CreateActivitySchema) {
    const payload: CreateActivityInput = {
      title: data.title,
      description: data.description,
      categoryId: data.categoryId ?? null,
      type: data.type,
      reminderTime: data.reminderTime,
      ...(data.type === "habit" && {
        scheduleType: data.scheduleType,
        targetDays:
          data.scheduleType === "custom"
            ? data.targetDays
            : [1, 2, 3, 4, 5, 6, 7],
      }),
      ...(data.type === "one_off" && {
        dueDate: data.dueDate,
        priority: data.priority,
      }),
    };
    createActivity(payload);
    // console.log(payload);
  }

  return (
    <View style={{ justifyContent: "space-between", flex: 1, gap: 16 }}>
      <View style={{ gap: 16 }}>
        <Controller
          control={control}
          name="type"
          render={({ field: { onChange, value } }) => (
            <RadioButtonGroup
              label="Тип"
              value={value}
              onChange={onChange}
              options={activityTypeOptions}
            />
          )}
        />
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <Input
              size="lg"
              value={value}
              onChangeText={onChange}
              label="Название"
              variant="default"
              error={errors.title?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <Input
              size="sm"
              value={value ?? ""}
              multiline
              onChangeText={onChange}
              label="Описание"
              variant="default"
            />
          )}
        />
        <Controller
          control={control}
          name="categoryId"
          render={({ field: { onChange, value } }) => (
            <CategoryPicker
              label="Категория"
              options={categories ?? []}
              value={value}
              onChange={onChange}
            />
          )}
        />

        {activityType === "habit" && (
          <Controller
            control={control}
            name="scheduleType"
            render={({ field: { onChange, value } }) => (
              <RadioButtonGroup
                label="Расписание"
                value={scheduleType}
                onChange={onChange}
                options={scheduleTypeOptions}
              />
            )}
          />
        )}

        {scheduleType === "custom" && (
          <Controller
            control={control}
            name="targetDays"
            render={({ field: { onChange, value } }) => (
              <DayPicker
                options={daysOptions}
                label="Дни"
                values={value ?? []}
                onChange={onChange}
                error={errors.targetDays?.message}
              />
            )}
          />
        )}

        {activityType === "one_off" && (
          <View style={{ gap: 16 }}>
            <Controller
              control={control}
              name="priority"
              render={({ field: { onChange, value } }) => (
                <RadioButtonGroup
                  label="Приоритет"
                  value={value}
                  onChange={onChange}
                  options={priorityOptions}
                />
              )}
            />
            <Controller
              control={control}
              name="dueDate"
              render={({ field: { onChange, value } }) => (
                <DatePickerWrapper
                  label="Дата"
                  value={value ?? ""}
                  onChange={onChange}
                />
              )}
            />
          </View>
        )}
        <Controller
          control={control}
          name="reminderTime"
          render={({ field: { onChange, value } }) => (
            <TimePicker label="Время" value={value ?? ""} onChange={onChange} />
          )}
        />
      </View>

      <Button
        disabled={isSubmitting}
        onPress={handleSubmit(onSubmit)}
        label="Добавить"
      />
    </View>
  );
}
