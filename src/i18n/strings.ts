import type { Lang, Localized } from "./types"

const UI = {
  tripSubtitle: {
    en: "Three days along the Sea of Japan, and a dinner in Yokohama either side",
    ja: "日本海沿いの三日間と、その前後の横浜ディナー",
  },
  plans: { en: "Plans", ja: "予定" },
  start: { en: "Start", ja: "開始" },
  end: { en: "End", ja: "終了" },
  forecastUnavailable: {
    en: "Forecast not yet available",
    ja: "天気予報はまだ取得できません",
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
