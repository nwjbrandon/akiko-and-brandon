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
  /** Google Maps / Tabelog reference from the Memo column */
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

export interface Trip {
  title: Localized
  startDate: string
  endDate: string
  days: Day[]
}
