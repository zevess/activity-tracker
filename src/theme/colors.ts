export const colors = {
  light: {
    // Базовые
    background: "#FAFCF8", // Очень светлый зелёный фон (не чисто белый — мягче)
    backgroundHigh: "#FFFFFF", // Чистый белый для контраста
    surface: "#FFFFFF", // Карточки
    surfaceStrong: "#F3F7F0", // Выделенные области (чуть темнее)
    border: "rgba(14, 15, 12, 0.12)", // Тонкая граница

    // Текст
    text: "#0E0F0C", // Основной текст (почти чёрный)
    textMuted: "#5A5D58", // Вторичный текст (чуть светлее для контраста)

    // Primary — глубокий зелёный (как тёмная листва)
    primary: "#1B4D1B", // Тёмно-зелёный (кнопки, заголовки)
    primarySoft: "rgba(27, 77, 27, 0.08)", // Фон для primary-элементов
    primaryForeground: "#FFFFFF", // Текст на primary

    // Accent — свежий зелёный (молодая листва, акценты)
    accent: "#7DD85F", // Яркий зелёный (иконки, прогресс)
    accentForeground: "#1B4D1B", // Текст на accent

    // Secondary — тёплый коричневый (кора дерева)
    secondary: "#6B4423", // Коричневый (альтернативные кнопки)
    secondarySoft: "rgba(107, 68, 35, 0.08)",
    secondaryForeground: "#FFFFFF",

    // Muted
    muted: "rgba(27, 77, 27, 0.06)",
    mutedForeground: "#6B6E68",

    // Информационные
    info: "#2563EB", // Синий (информация)
    infoSoft: "#DBEAFE",
    warning: "#D97706", // Янтарный (предупреждение)
    warningSoft: "#FEF3C7",
    success: "#16A34A", // Зелёный (успех)
    successSoft: "#DCFCE7",
    danger: "#DC2626", // Красный (ошибка)
    dangerSoft: "#FEE2E2",

    // Пастельные (для категорий активностей / типов деревьев)
    mint: "#D1FAE5", // Мятный (здоровье, рост)
    aqua: "#CFFAFE", // Голубой (вода, спокойствие)
    peach: "#FED7AA", // Персиковый (энергия, тепло)
    lavender: "#E9D5FF", // Лавандовый (отдых, творчество)
    lemon: "#FEF9C3", // Лимонный (радость, энергия)

    // Ink — для специальных элементов (можно использовать для иконок)
    ink: "#1B4D1B",
    transparent: "transparent",
  },

  dark: {
    // Базовые
    background: "#0F1410", // Очень тёмный зелёный (почти чёрный)
    backgroundHigh: "#1A231A", // Чуть светлее для контраста
    surface: "#1E2A1E", // Карточки
    surfaceStrong: "#2A3A2A", // Выделенные области
    border: "rgba(255, 255, 255, 0.12)",

    // Текст
    text: "#F5F7F3", // Светлый текст (не чисто белый — мягче)
    textMuted: "#A8B0A3", // Вторичный текст

    // Primary — яркий зелёный (в dark теме primary становится светлее)
    primary: "#7DD85F", // Тот же accent из light
    primarySoft: "rgba(125, 216, 95, 0.16)",
    primaryForeground: "#0F1410", // Тёмный текст на светлом primary

    // Accent — свежий зелёный
    accent: "#7DD85F",
    accentForeground: "#0F1410",

    // Secondary — тёплый коричневый (светлее для dark темы)
    secondary: "#A67C52", // Светло-коричневый
    secondarySoft: "rgba(166, 124, 82, 0.16)",
    secondaryForeground: "#0F1410",

    // Muted
    muted: "rgba(255, 255, 255, 0.08)",
    mutedForeground: "#A8B0A3",

    // Информационные (светлее для dark темы)
    info: "#60A5FA", // Светло-синий
    infoSoft: "#1E3A5F",
    warning: "#FBBF24", // Светло-янтарный
    warningSoft: "#4A3520",
    success: "#4ADE80", // Светло-зелёный
    successSoft: "#1A3A1A",
    danger: "#F87171", // Светло-красный
    dangerSoft: "#3A1A1A",

    // Пастельные (тёмные версии для dark темы)
    mint: "#1A3A2A", // Тёмно-мятный
    aqua: "#1A2A3A", // Тёмно-голубой
    peach: "#3A2A1A", // Тёмно-персиковый
    lavender: "#2A1A3A", // Тёмно-лавандовый
    lemon: "#3A3A1A", // Тёмно-лимонный

    // Ink
    ink: "#7DD85F",
    transparent: "transparent",
  },
} as const;
