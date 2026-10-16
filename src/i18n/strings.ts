import type { Lang, Localized } from "./types"

const UI = {
  siteName: { en: "Akiko & Brandon", ja: "Akiko & Brandon" },
  ourTrips: { en: "Our trips", ja: "ふたりの旅" },
  homeSubtitle: {
    en: "Every trip, past and to come, in order. Open one for the day-by-day plan.",
    ja: "これまでの旅とこれからの旅を日付順に。開くと毎日の予定が見られます。",
  },
  notPlannedYet: { en: "Not planned yet", ja: "プランはこれから" },
  notPlannedBody: {
    en: "We have the dates and where we are going. The day-by-day plan comes next.",
    ja: "日程と行き先は決まりました。毎日の予定はこれから考えます。",
  },
  allTrips: { en: "All trips", ja: "旅の一覧" },
  today: { en: "Today", ja: "今日" },
  underway: { en: "Underway", ja: "旅行中" },
  pastTrip: { en: "Past", ja: "終了" },
  startsTomorrow: { en: "Tomorrow", ja: "明日から" },
  plans: { en: "Plans", ja: "予定" },
  start: { en: "Start", ja: "開始" },
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
  note: { en: "Note", ja: "メモ" },
  openMap: { en: "Open in Google Maps", ja: "Googleマップで開く" },
  dayMap: { en: "Map of the day", ja: "この日の地図" },
  tripMap: { en: "Map of the trip", ja: "旅の地図" },
  showOnMap: { en: "Show on the map", ja: "地図で見る" },
  expandMap: { en: "Expand the map", ja: "地図を大きく表示" },
  closeMap: { en: "Close the map", ja: "地図を閉じる" },
  theDay: { en: "The day", ja: "この日の予定" },
  dayByDay: { en: "Day by day", ja: "毎日の予定" },
  otherDays: { en: "Other days", ja: "ほかの日" },
  travelTime: { en: "Travel", ja: "移動時間" },
  nextUp: { en: "Next up", ja: "次の旅" },
  firstUp: { en: "First up", ja: "最初の予定" },
  open: { en: "Open", ja: "開く" },
  dayBarKey: { en: "What the day bars show", ja: "バーの色の見方" },
  keyTravel: { en: "Travel", ja: "移動" },
  keyMeal: { en: "Meal", ja: "食事" },
  keyActivity: { en: "Sightseeing", ja: "観光" },
  keyHotel: { en: "Hotel", ja: "宿泊" },
  keyOther: { en: "Other", ja: "その他" },
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

/** "Day 2" / "2日目", or "Days 2–3" / "2–3日目" for a run of them. */
export function dayRangeLabel(first: number, last: number, lang: Lang) {
  if (first === last) return dayLabel(first, lang)
  return lang === "ja" ? `${first + 1}–${last + 1}日目` : `Days ${first + 1}–${last + 1}`
}

/** "In 36 days" / "あと36日" */
export function inDays(days: number, lang: Lang) {
  return lang === "ja" ? `あと${days}日` : `In ${days} days`
}

/** "Yokohama · Tsuruga · Fukui" / "横浜・敦賀・福井" */
export function placeList(places: Localized[], lang: Lang) {
  return places.map((place) => place[lang]).join(lang === "ja" ? "・" : " · ")
}

/** "5 days" / "5日間" */
export function dayCount(days: number, lang: Lang) {
  if (lang === "ja") return `${days}日間`
  return days === 1 ? "1 day" : `${days} days`
}

/** "days to go" / "日後に出発", beside a count of them in large type. */
export function daysToGo(days: number, lang: Lang) {
  if (lang === "ja") return "日後に出発"
  return days === 1 ? "day to go" : "days to go"
}

/** "Day 3 of 5" / "5日間の3日目" */
export function dayOfTrip(index: number, days: number, lang: Lang) {
  return lang === "ja" ? `${days}日間の${index + 1}日目` : `Day ${index + 1} of ${days}`
}

/** "8 plans" / "予定8件" */
export function planCount(plans: number, lang: Lang) {
  if (lang === "ja") return `予定${plans}件`
  return plans === 1 ? "1 plan" : `${plans} plans`
}

/** "3 places" / "3か所" */
export function placeCount(places: number, lang: Lang) {
  if (lang === "ja") return `${places}か所`
  return places === 1 ? "1 place" : `${places} places`
}
