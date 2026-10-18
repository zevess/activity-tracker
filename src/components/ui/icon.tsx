import Ionicons from "@expo/vector-icons/Ionicons";
// const iconMap = {
//     add: 'add',
//     alert: 'alert',
//     albums: 'albums',
//     albumsOutline: 'albums-outline',
//     alarm: 'alarm',
//     alarmOutline: 'alarm-outline',
//     arrowBack: 'arrow-back',
//     arrowBackOutline: 'arrow-back-outline',
//     today: 'today',
//     list: 'list',
//     statCharts: 'stat-charts',
//     setting: 'settings'
// } as const satisfies ;

export type IconName = keyof typeof Ionicons.glyphMap;
