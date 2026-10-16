import { getCity } from "@/data/cities"
import { isPlanned } from "@/data/itinerary"
import { PLACES, type Coordinates } from "@/data/places"
import type { Block, City, Day, Trip } from "@/data/types"

/** Places closer than this share a pin, like a shop inside the building before it. */
const SAME_PLACE_METRES = 75

/**
 * Where a block happens, from its map link. A journey has no single place,
 * and a block without a map link has none to show.
 */
export function blockCoordinates(block: Block): Coordinates | undefined {
  if (!block.map || block.type === "commute") return undefined
  const at = PLACES[block.map]
  if (!at && import.meta.env.DEV) {
    console.warn(`No coordinates for ${block.map}; add them to PLACES in src/data/places.ts`)
  }
  return at
}

/** One pin on the day's map: a place, and the plans there in the day's order. */
export interface DayPin {
  at: Coordinates
  blocks: Block[]
}

/**
 * The day's places, a pin each, in the order the day first reaches them: a
 * hotel left in the morning and come back to at night is one pin.
 */
export function dayPins(day: Day) {
  const pins: DayPin[] = []
  for (const block of day.blocks) {
    const at = blockCoordinates(block)
    if (!at) continue
    const pin = pins.find((other) => metresBetween(other.at, at) < SAME_PLACE_METRES)
    if (pin) pin.blocks.push(block)
    else pins.push({ at, blocks: [block] })
  }
  return pins
}

/** One stay on a trip: a city and, for a planned trip, the run of days there. */
export interface TripStop {
  city: City
  /** The first and last days there, by index into the trip's days and by date. */
  days?: TripStay
}

export interface TripStay {
  first: number
  last: number
  start: string
  end: string
}

/** The trip's stays, in the order it reaches them, coming home included. */
export function tripStops(trip: Trip): TripStop[] {
  if (!isPlanned(trip)) {
    return trip.cityIds
      .filter((cityId, index) => cityId !== trip.cityIds[index - 1])
      .map((cityId) => getCity(cityId))
      .filter((city) => city !== undefined)
      .map((city) => ({ city }))
  }
  const stops: TripStop[] = []
  trip.days.forEach((day, index) => {
    const city = getCity(day.cityId)
    if (!city) return
    const stop = stops.at(-1)
    if (stop?.days && stop.city.id === city.id) {
      stop.days.last = index
      stop.days.end = day.date
    } else {
      stops.push({ city, days: { first: index, last: index, start: day.date, end: day.date } })
    }
  })
  return stops
}

/** One pin on the trip's map: a city, and each stay there. */
export interface TripPin {
  city: City
  /** For a planned trip, each run of days there: coming home is a second stay where it set off. */
  stays: TripStay[]
}

/** The trip's cities, a pin each, in the order it first reaches them. */
export function tripPins(trip: Trip) {
  const pins: TripPin[] = []
  for (const stop of tripStops(trip)) {
    let pin = pins.find((other) => other.city.id === stop.city.id)
    if (!pin) {
      pin = { city: stop.city, stays: [] }
      pins.push(pin)
    }
    if (stop.days) pin.stays.push(stop.days)
  }
  return pins
}

/** A hop from one of the trip's cities to the next. */
export interface TripLeg {
  from: City
  to: City
  /** The journey that makes the hop and its day, when the days mark it with `hop`. */
  journey?: { block: Block; day: Day }
  /** For a planned trip: the index of the first day in `to`. */
  arrivalDay?: number
}

/**
 * Each hop from one of the trip's cities to the next, with the journey that
 * makes it when the days mark one.
 */
export function tripLegs(trip: Trip): TripLeg[] {
  const stops = tripStops(trip)
  const journeys = isPlanned(trip)
    ? trip.days.flatMap((day) =>
        day.blocks.filter((block) => block.hop).map((block) => ({ block, day })),
      )
    : []
  // Paired in order, so a missing or extra mark leaves every hop unpaired rather than wrong.
  const paired = journeys.length === stops.length - 1
  if (journeys.length > 0 && !paired && import.meta.env.DEV) {
    console.warn(
      `${trip.id} marks ${journeys.length} journeys with hop but has ${stops.length - 1} hops between cities`,
    )
  }
  return stops.slice(1).map((stop, index) => ({
    from: stops[index].city,
    to: stop.city,
    journey: paired ? journeys[index] : undefined,
    arrivalDay: stop.days?.first,
  }))
}

/** Scroll a page's map into view, as when a plan elsewhere on the page asks to be shown on it. */
export function revealMap(id: string) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" })
}

/** How far apart two places are, as the crow flies. */
function metresBetween([lat1, lng1]: Coordinates, [lat2, lng2]: Coordinates) {
  const r = Math.PI / 180
  const a =
    Math.sin(((lat2 - lat1) * r) / 2) ** 2 +
    Math.cos(lat1 * r) * Math.cos(lat2 * r) * Math.sin(((lng2 - lng1) * r) / 2) ** 2
  return 12_742_000 * Math.asin(Math.sqrt(a))
}
