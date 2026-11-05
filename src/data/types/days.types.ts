export type DayOption = {
  value: number;
  name: string;
  label: string;
};

export const daysOptions: DayOption[] = [
  {
    value: 1,
    name: "Понедельник",
    label: "ПН",
  },
  {
    value: 2,
    name: "Вторник",
    label: "ВТ",
  },
  {
    value: 3,
    name: "Среда",
    label: "СР",
  },
  {
    value: 4,
    name: "Четверг",
    label: "ЧТ",
  },
  {
    value: 5,
    name: "Пятница",
    label: "ПТ",
  },
  {
    value: 6,
    name: "Суббота",
    label: "СБ",
  },
  {
    value: 7,
    name: "Воскресенье",
    label: "ВС",
  },
];
