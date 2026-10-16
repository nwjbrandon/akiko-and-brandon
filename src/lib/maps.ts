import { getCity } from "@/data/cities"
import { isPlanned } from "@/data/itinerary"
import { SHORT_LINK_PLACES } from "@/data/places"
import { mapsSearch } from "@/data/trips/shared"
import type { Block, City, Day, TravelBy, Trip } from "@/data/types"
import type { Lang } from "@/i18n/types"

const EMBED_ENDPOINT = "https://www.google.com/maps/embed/v1"

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

/** Whether the pages can embed maps at all: without an API key they leave them out. */
export const MAPS_ENABLED = Boolean(API_KEY)

/** The Maps Embed travel mode for each way we go overland. */
const TRAVEL_MODES: Record<Exclude<TravelBy, "plane">, string> = {
  train: "transit",
  bus: "transit",
  walk: "walking",
}

/** Getting from one place to another, as Google Maps searches, and how. */
export interface Leg {
  from: string
  to: string
  by: TravelBy
}

/**
 * Where a block happens, as a search Google Maps can place: the query of its
 * search link, or what its short link points to. A journey has no single
 * place, and a block without a map link has none to show.
 */
export function blockPlace(block: Block) {
  if (!block.map || block.type === "commute") return undefined
  const place =
    SHORT_LINK_PLACES[block.map] ?? new URL(block.map).searchParams.get("query") ?? undefined
  if (!place && import.meta.env.DEV) {
    console.warn(`No place for ${block.map}; add it to SHORT_LINK_PLACES in src/data/places.ts`)
  }
  return place
}

/**
 * The day's journeys that can be mapped: each runs from the place before it
 * to the place after it, unless it gives its own `from` or `to`. A journey
 * with an end that cannot be placed, like a flight home, is left out.
 */
export function dayJourneys(day: Day) {
  const places = day.blocks.map(blockPlace)
  return day.blocks.flatMap((block, index) => {
    if (block.type !== "commute") return []
    const from = block.from ?? places.slice(0, index).findLast((place) => place !== undefined)
    const to = block.to ?? places.slice(index + 1).find((place) => place !== undefined)
    if (!from || !to) return []
    const leg: Leg = { from, to, by: block.by ?? "train" }
    return [{ block, leg }]
  })
}

/** The day's blocks with a place, each run of the same place counted once. */
export function dayPlaces(day: Day) {
  return day.blocks
    .map((block) => ({ block, place: blockPlace(block) }))
    .filter((stop): stop is { block: Block; place: string } => stop.place !== undefined)
    .filter((stop, index, stops) => stop.place !== stops[index - 1]?.place)
}

/** One stay on a trip: a city and, for a planned trip, the run of days there. */
export interface TripStop {
  city: City
  /** The first and last days there, by index into the trip's days and by date. */
  days?: { first: number; last: number; start: string; end: string }
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

/** The trip's cities, in the order it reaches them, coming home included. */
export function tripCities(trip: Trip) {
  return tripStops(trip).map((stop) => stop.city)
}

/** A hop from one of the trip's cities to the next. */
export interface TripLeg {
  from: City
  to: City
  leg: Leg
  /** The journey that makes the hop and its day, when the days mark it with `hop`. */
  journey?: { block: Block; day: Day }
  /** For a planned trip: the index of the first day in `to`. */
  arrivalDay?: number
}

/**
 * Each hop from one of the trip's cities to the next. When the days mark the
 * journey that makes each hop, the hop is routed the way that journey goes;
 * otherwise it runs from city to city by train.
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
  return stops.slice(1).map((stop, index) => {
    const from = stops[index].city
    const journey = paired ? journeys[index] : undefined
    const routed = journey && dayJourneys(journey.day).find(({ block }) => block === journey.block)
    const leg: Leg = routed?.leg ?? {
      from: cityPlace(from),
      to: cityPlace(stop.city),
      by: journey?.block.by ?? "train",
    }
    return { from, to: stop.city, leg, journey, arrivalDay: stop.days?.first }
  })
}

/** Scroll a page's map into view, as when a journey elsewhere on the page asks to be shown on it. */
export function revealMap(id: string) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" })
}

/** Google Maps opened on a leg, routed the way we make it, or on where a flight lands. */
export function legLink({ from, to, by }: Leg) {
  if (by === "plane") return mapsSearch(to)
  const params = new URLSearchParams({
    api: "1",
    origin: from,
    destination: to,
    travelmode: TRAVEL_MODES[by],
  })
  return `https://www.google.com/maps/dir/?${params}`
}

/** A city as a search Google Maps can place. */
export function cityPlace(city: City) {
  return city.name.en
}

/** A map pinning one place. */
export function placeEmbed(place: string, lang: Lang) {
  return embed("place", { q: place }, lang)
}

/**
 * A map of one leg, routed the way we make it: Google's transit plan for a
 * train or bus, or a walking route. Google draws no line for a flight and
 * frames the two airports poorly, so a flight shows where it lands.
 */
export function legEmbed({ from, to, by }: Leg, lang: Lang) {
  if (by === "plane") return placeEmbed(to, lang)
  return embed("directions", { origin: from, destination: to, mode: TRAVEL_MODES[by] }, lang)
}

/** A Google Maps embed, or none without an API key. */
function embed<Mode extends "place" | "directions">(
  mode: Mode,
  query: Record<string, string>,
  lang: Lang,
) {
  if (!API_KEY) return undefined
  const params = new URLSearchParams({ key: API_KEY, language: lang, ...query })
  return { mode, src: `${EMBED_ENDPOINT}/${mode}?${params}` }
}

export type Embed = NonNullable<ReturnType<typeof embed>>
