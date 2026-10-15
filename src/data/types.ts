import type { Localized } from "@/i18n/types"

export type BlockType =
  | "commute"
  | "meal"
  | "activity"
  | "lodging"
  | "meeting"
  | "logistics"

export interface Block {
  /** 24h "HH:MM" */
  start: string
  /** 24h "HH:MM", or null when the block runs to the end of the day */
  end: string | null
  type: BlockType
  title: Localized
  /** Where the block happens, when it adds something beyond the title */
  location?: Localized
  /** Free-form detail from the itinerary's Memo column */
  note?: Localized
  /** Google Maps link for the location or route */
  map?: string
  /** Reference page for the place, such as its Tabelog listing */
  link?: string
}

export interface City {
  id: string
  name: Localized
  lat: number
  lon: number
}

export interface Day {
  /** ISO "YYYY-MM-DD" */
  date: string
  cityId: string
  title: Localized
  summary: Localized
  blocks: Block[]
}

/** Which drawing sits at the foot of a trip's day heroes. */
export type HeroSceneVariant = "fukui" | "plain"

export interface Trip {
  /** URL slug, e.g. "fukui-2026" → /fukui-2026/2026-11-22 */
  id: string
  title: Localized
  subtitle: Localized
  scene: HeroSceneVariant
  /** In date order; the first and last days are the trip's start and end. */
  days: Day[]
}
