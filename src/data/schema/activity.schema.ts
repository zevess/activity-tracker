import { z } from "zod";
import {
    ACTIVITY_TYPES,
    PRIORITY,
    SCHEDULE_TYPES,
} from "../types/activities.types";
export const createActivitySchema = z.object({
  title: z.string().min(1, "Название обязательно").max(100),
  description: z.string().max(500).optional().nullable(),
  categoryId: z.number().optional().nullable(),

  type: z.enum(ACTIVITY_TYPES),

  scheduleType: z.enum(SCHEDULE_TYPES).optional().nullable(),
  targetDays: z
    .array(z.number().min(1).max(7))
    .min(1, "Выберите хотя бы один день")
    .optional()
    .nullable(),
  reminderTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Формат ЧЧ:мм")
    .optional()
    .nullable(),
  dueDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Формат ГГГГ-ММ-ДД")
    .optional()
    .nullable(),
  priority: z.enum(PRIORITY).optional().nullable(),
});

export type CreateActivitySchema = z.infer<typeof createActivitySchema>;
