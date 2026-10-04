import {
  BedDouble,
  Camera,
  Heart,
  Luggage,
  TrainFront,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react"
import type { Block, BlockType } from "@/data/types"
import { translate, type UiKey } from "@/i18n/strings"
import type { Lang } from "@/i18n/types"
import { formatDuration, toMinutes } from "./date"

const ICONS: Record<BlockType, LucideIcon> = {
  commute: TrainFront,
  meal: UtensilsCrossed,
  activity: Camera,
  lodging: BedDouble,
  meeting: Heart,
  logistics: Luggage,
}

const LABEL_KEYS: Record<BlockType, UiKey> = {
  commute: "typeCommute",
  meal: "typeMeal",
  activity: "typeActivity",
  lodging: "typeLodging",
  meeting: "typeMeeting",
  logistics: "typeLogistics",
}

export function blockIcon(block: Block) {
  return ICONS[block.type]
}

export function blockTypeLabel(block: Block, lang: Lang) {
  return translate(LABEL_KEYS[block.type], lang)
}

/** "18:30 – 20:30", or "18:30 onwards" / "18:30 〜" with no end. */
export function timeRange(start: string, end: string | null, lang: Lang) {
  if (end) return `${start} – ${end}`
  return lang === "ja" ? `${start} 〜` : `${start} onwards`
}

export function blockTimeRange(block: Block, lang: Lang) {
  return timeRange(block.start, block.end, lang)
}

export function blockDuration(block: Block, lang: Lang) {
  if (!block.end) return null
  return formatDuration(toMinutes(block.start), toMinutes(block.end), lang)
}

export type TimelineStatus = "past" | "current" | "future"

/**
 * Mark where the two of you are right now. Only the day actually being lived
 * gets a "current" block; other days read as entirely future or entirely past.
 */
export function timelineStatuses(
  blocks: Block[],
  date: string,
  today: string,
  nowMinutes: number,
): TimelineStatus[] {
  if (date > today) return blocks.map(() => "future")
  if (date < today) return blocks.map(() => "past")

  return blocks.map((block) => {
    const start = toMinutes(block.start)
    const end = block.end ? toMinutes(block.end) : 24 * 60
    if (nowMinutes >= end) return "past"
    if (nowMinutes >= start) return "current"
    return "future"
  })
}

/**
 * When the day's plans begin and the last time anything is due to finish. A
 * day made only of open-ended blocks, like a dinner with no fixed end, has no
 * end at all.
 */
export function dayBounds(blocks: Block[]) {
  return {
    start: blocks[0]?.start ?? "—",
    end: blocks.findLast((block) => block.end)?.end ?? null,
  }
}
