import {
  BedDouble,
  Bus,
  Camera,
  Footprints,
  Heart,
  Luggage,
  Plane,
  TrainFront,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react"
import type { Block, BlockType, TravelBy } from "@/data/types"
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

const TRAVEL_ICONS: Record<TravelBy, LucideIcon> = {
  train: TrainFront,
  bus: Bus,
  walk: Footprints,
  plane: Plane,
}

export function blockIcon(block: Block) {
  if (block.type === "commute") return TRAVEL_ICONS[block.by ?? "train"]
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

/** Minutes the day spends getting from one place to the next. */
export function travelMinutes(blocks: Block[]) {
  return blocks.reduce((total, block) => {
    if (block.type !== "commute" || !block.end) return total
    return total + Math.max(0, toMinutes(block.end) - toMinutes(block.start))
  }, 0)
}

/** The kinds of time a day's bar tells apart. */
export type ShapeKind = "travel" | "meal" | "activity" | "hotel" | "other"

const SHAPE_KINDS: Record<BlockType, ShapeKind> = {
  commute: "travel",
  meal: "meal",
  activity: "activity",
  lodging: "hotel",
  meeting: "other",
  logistics: "other",
}

export interface ShapeStretch {
  /** What the time is spent on, or "free" for a gap between plans. */
  kind: ShapeKind | "free"
  /** How long it lasts, or null for a last block that runs on with no end. */
  minutes: number | null
}

/**
 * The day as stretches of time, for its bar on the trip page: each block for
 * as long as it lasts, and any gap before it as free time. A block with no end
 * lasts until the next one starts; the last one runs on.
 */
export function dayShape(blocks: Block[]): ShapeStretch[] {
  const stretches: ShapeStretch[] = []
  let reached: number | null = null
  blocks.forEach((block, index) => {
    const start = toMinutes(block.start)
    if (reached !== null && start > reached) {
      stretches.push({ kind: "free", minutes: start - reached })
    }
    const next = blocks[index + 1]
    const end = block.end ? toMinutes(block.end) : next ? toMinutes(next.start) : null
    stretches.push({
      kind: SHAPE_KINDS[block.type],
      minutes: end === null ? null : Math.max(0, end - start),
    })
    if (end !== null) reached = Math.max(reached ?? end, end)
  })
  return stretches
}
