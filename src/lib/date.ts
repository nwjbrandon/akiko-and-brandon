import type { Lang } from "@/i18n/types"

const TZ = "Asia/Tokyo"

const LOCALES: Record<Lang, string> = { en: "en-GB", ja: "ja-JP" }

/** Parse an ISO "YYYY-MM-DD" as a local calendar date, free of UTC drift. */
function parseISODate(date: string) {
  const [year, month, day] = date.split("-").map(Number)
  return new Date(year, month - 1, day)
}

/** "Saturday, 21 November 2026" / "2026年11月21日(土)" */
export function formatFullDate(date: string, lang: Lang) {
  const value = parseISODate(date)
  if (lang === "ja") {
    const weekday = value.toLocaleDateString("ja-JP", { weekday: "short" })
    return `${value.getFullYear()}年${value.getMonth() + 1}月${value.getDate()}日(${weekday})`
  }
  return value.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

/** "21 Nov" / "11月21日" */
export function formatShortDate(date: string, lang: Lang) {
  const value = parseISODate(date)
  if (lang === "ja") return `${value.getMonth() + 1}月${value.getDate()}日`
  return value.toLocaleDateString("en-GB", { day: "numeric", month: "short" })
}

/** "20 Nov – 24 Nov · 2026" / "11月20日 – 11月24日 · 2026", or one date for a single day. */
export function formatDateSpan(start: string, end: string, lang: Lang) {
  const year = parseISODate(start).getFullYear()
  if (start === end) return `${formatShortDate(start, lang)} · ${year}`
  return `${formatShortDate(start, lang)} – ${formatShortDate(end, lang)} · ${year}`
}

/** Whole calendar days from `from` to `to`, both "YYYY-MM-DD". */
export function daysBetween(from: string, to: string) {
  const ms = parseISODate(to).getTime() - parseISODate(from).getTime()
  // Rounded, so a daylight-saving shift in the viewer's timezone cannot skew it.
  return Math.round(ms / 86_400_000)
}

/** "SAT" / "土" — the weekday cap on the day-selector pill. */
export function formatWeekdayShort(date: string, lang: Lang) {
  const value = parseISODate(date).toLocaleDateString(LOCALES[lang], {
    weekday: "short",
  })
  return lang === "ja" ? value : value.toUpperCase()
}

/** "21" — the day-of-month on the day-selector pill. */
export function formatDayOfMonth(date: string) {
  return String(parseISODate(date).getDate())
}

/** Today in Japan, as "YYYY-MM-DD". */
export function todayInJapan() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date())
}

/** Current wall-clock minutes since midnight in Japan. */
export function nowMinutesInJapan() {
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date())
  return toMinutes(time)
}

export function toMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number)
  return hours * 60 + minutes
}

/** "3h 9m" / "3時間9分" */
export function formatDuration(
  startMinutes: number,
  endMinutes: number,
  lang: Lang,
) {
  const total = Math.max(0, endMinutes - startMinutes)
  const hours = Math.floor(total / 60)
  const minutes = total % 60

  if (lang === "ja") {
    if (hours && minutes) return `${hours}時間${minutes}分`
    if (hours) return `${hours}時間`
    return `${minutes}分`
  }
  if (hours && minutes) return `${hours}h ${minutes}m`
  if (hours) return `${hours}h`
  return `${minutes}m`
}
