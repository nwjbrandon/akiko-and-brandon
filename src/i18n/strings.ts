import type { Lang, Localized } from "./types"

const UI = {
  siteName: { en: "Akiko & Brandon", ja: "Akiko & Brandon" },
  ourTrips: { en: "Our trips", ja: "ふたりの旅" },
  homeSubtitle: {
    en: "Every trip we have planned, in order. Open one for the day-by-day plan.",
    ja: "ふたりで計画した旅を日付順に。開くと毎日の予定が見られます。",
  },
  allTrips: { en: "All trips", ja: "旅の一覧" },
  today: { en: "Today", ja: "今日" },
  underway: { en: "Underway", ja: "旅行中" },
  pastTrip: { en: "Past", ja: "終了" },
  startsTomorrow: { en: "Tomorrow", ja: "明日から" },
  plans: { en: "Plans", ja: "予定" },
  start: { en: "Start", ja: "開始" },
  end: { en: "End", ja: "終了" },
  forecastUnavailable: {
    en: "Forecast not yet available",
    ja: "天気予報はまだ取得できません",
  },
  noWeatherRecord: {
    en: "No weather record for this day",
    ja: "この日の天気の記録はありません",
  },
  loading: { en: "Loading…", ja: "読み込み中…" },
  route: { en: "Route", ja: "経路" },
  openMap: { en: "Open in Google Maps", ja: "Googleマップで開く" },
  openReference: { en: "Open reference", ja: "リンクを開く" },
  closeDetails: { en: "Close details", ja: "閉じる" },
  dayNotFound: { en: "Day not found", ja: "該当する日程がありません" },
  dayNotFoundBody: {
    en: "There is no itinerary entry for",
    ja: "この日付の日程はありません:",
  },
  thatDate: { en: "that date", ja: "指定の日付" },
  backToItinerary: { en: "Back to the itinerary", ja: "日程一覧に戻る" },
  print: { en: "Print or save as PDF", ja: "印刷・PDF保存" },
  toLight: { en: "Switch to light theme", ja: "ライトテーマに切り替え" },
  toDark: { en: "Switch to dark theme", ja: "ダークテーマに切り替え" },
  switchLanguage: { en: "日本語に切り替え", ja: "Switch to English" },

  typeCommute: { en: "travel", ja: "移動" },
  typeMeal: { en: "meal", ja: "食事" },
  typeActivity: { en: "activity", ja: "観光" },
  typeLodging: { en: "hotel", ja: "宿泊" },
  typeMeeting: { en: "meet", ja: "集合" },
  typeLogistics: { en: "logistics", ja: "荷物" },
} satisfies Record<string, Localized>

export type UiKey = keyof typeof UI

export function translate(key: UiKey, lang: Lang) {
  return UI[key][lang]
}

/** "Day 1" / "1日目" */
export function dayLabel(index: number, lang: Lang) {
  return lang === "ja" ? `${index + 1}日目` : `Day ${index + 1}`
}

/** "In 36 days" / "あと36日" */
export function inDays(days: number, lang: Lang) {
  return lang === "ja" ? `あと${days}日` : `In ${days} days`
}

/** "5 days" / "5日間" */
export function dayCount(days: number, lang: Lang) {
  if (lang === "ja") return `${days}日間`
  return days === 1 ? "1 day" : `${days} days`
}
