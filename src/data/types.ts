import type { Localized } from "@/i18n/types"

export type BlockType =
  | "commute"
  | "meal"
  | "activity"
  | "lodging"
  | "meeting"
  | "logistics"

/** How a journey is made. */
export type TravelBy = "train" | "bus" | "walk" | "plane"

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
  /** For a journey: how we go, for its icon and its map. Unset means by train. */
  by?: TravelBy
  /**
   * For a journey: where it starts and ends on the map, as Google Maps
   * searches. Only needed when the places either side of it do not say, as
   * when two journeys run back to back or the day ends on one.
   */
  from?: string
  to?: string
  /**
   * For a journey: marks it as the one that takes us on to the trip's next
   * city, so the trip page can give each hop between cities its date and time
   * and route it on the map the way we go. Mark one journey per hop, or none.
   */
  hop?: boolean
}

export interface City {
  id: string
  name: Localized
  lat: number
  lon: number
  /** IANA time zone, e.g. "Asia/Tokyo"; a day's times are read in its city's zone. */
  timeZone: string
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

interface TripBase {
  /** URL slug, e.g. "fukui-2026" → /fukui-2026/2026-11-22 */
  id: string
  title: Localized
  subtitle: Localized
}

/** A trip with its day-by-day plan written. */
export interface PlannedTrip extends TripBase {
  scene: HeroSceneVariant
  /** In date order; the first and last days are the trip's start and end. */
  days: Day[]
}

/**
 * A trip whose dates and places are settled but whose days are not planned
 * yet. Once they are, it becomes a PlannedTrip: `start`, `end` and `cityIds`
 * give way to `days`, and it gains a hero `scene`.
 */
export interface UnplannedTrip extends TripBase {
  /** ISO "YYYY-MM-DD" */
  start: string
  /** ISO "YYYY-MM-DD" */
  end: string
  /** The places it takes in, as ids in cities.ts */
  cityIds: string[]
}

export type Trip = PlannedTrip | UnplannedTrip
