import {
  useCreateActivity,
  useUpdateActivity,
} from "@/data/queries/activities.queries";
import { useGetCategories } from "@/data/queries/categories.queries";
import {
  createActivitySchema,
  CreateActivitySchema,
} from "@/data/schema/activity.schema";
import {
  activityTypeOptions,
  priorityOptions,
  scheduleTypeOptions,
} from "@/data/types/activities.types";
import { daysOptions } from "@/data/types/days.types";
import { getDefaultCategory } from "@/features/categories/lib/get-default-category";
import { defaultInitialData } from "@/hooks/use-initial-data";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { Button } from "../../../components/ui/button";
import { DatePickerWrapper } from "../../../components/ui/date-picker";
import { DayPicker } from "../../../components/ui/day-picker";
import { Input } from "../../../components/ui/input";
import { RadioButtonGroup } from "../../../components/ui/radio-button-group";
import { TimePicker } from "../../../components/ui/time-picker";
import { CategoryPicker } from "../../categories/ui/category-picker";
import { getActivityPayload } from "../lib/activity-payload";

type ActivityFormProps = {
  mode: "create" | "edit";
  activityId?: number;
  initialData?: CreateActivitySchema;
};

export function ActivityForm({
  mode,
  activityId,
  initialData,
}: ActivityFormProps) {
  const { createActivity } = useCreateActivity();
  const { updateActivity } = useUpdateActivity(Number(activityId));
  const { categories } = useGetCategories();
  const defaultCategory = getDefaultCategory(categories);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateActivitySchema>({
    resolver: zodResolver(createActivitySchema),
    mode: "onTouched",
    defaultValues: initialData ?? defaultInitialData,
  });
  const activityType = watch("type");
  const scheduleType = watch("scheduleType");

  useEffect(() => {
    if (initialData && activityId) {
      reset(initialData);
    }
  }, [activityId, initialData, reset]);

  function onSubmit(data: CreateActivitySchema) {
    const payload = getActivityPayload(data, defaultCategory);
    if (mode === "create") {
      createActivity(payload);
    }
    if (mode === "edit") {
      updateActivity(payload);
    }
  }

  function onError(errors: any) {
    console.error(errors);
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

        {activityType === "habit" && scheduleType === "custom" && (
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
        loading={isSubmitting}
        onPress={handleSubmit(onSubmit, onError)}
        label={mode === "create" ? "Добавить" : "Сохранить"}
      />
    </View>
  );
}
