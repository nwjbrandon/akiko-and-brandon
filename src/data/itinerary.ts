import type { TimelineStatus } from "@/lib/blocks"
import { daysBetween } from "@/lib/date"
import { getCity } from "./cities"
import { FIRST_DATE_2026 } from "./trips/first-date-2026"
import { FUKUI_2026 } from "./trips/fukui-2026"
import { MALAYSIA_SINGAPORE_2027 } from "./trips/malaysia-singapore-2027"
import { MATSUMOTO_2026 } from "./trips/matsumoto-2026"
import { YAMAGATA_2027 } from "./trips/yamagata-2027"
import type { PlannedTrip, Trip } from "./types"

/** Every trip on the site, in date order. A new trip is added by listing it here. */
export const TRIPS: Trip[] = [
  FIRST_DATE_2026,
  MATSUMOTO_2026,
  FUKUI_2026,
  YAMAGATA_2027,
  MALAYSIA_SINGAPORE_2027,
].sort((a, b) => tripStart(a).localeCompare(tripStart(b)))

/** Whether the trip's days are written, as opposed to only its dates and places. */
export function isPlanned(trip: Trip): trip is PlannedTrip {
  return "days" in trip
}

export function tripStart(trip: Trip) {
  return isPlanned(trip) ? trip.days[0].date : trip.start
}

export function tripEnd(trip: Trip) {
  return isPlanned(trip) ? trip.days[trip.days.length - 1].date : trip.end
}

/** Days on the trip: the planned ones, or every day from start to end. */
export function tripDayCount(trip: Trip) {
  return isPlanned(trip) ? trip.days.length : daysBetween(trip.start, trip.end) + 1
}

/** The names of the trip's places, each once, in the order it reaches them. */
export function tripPlaces(trip: Trip) {
  const cityIds = isPlanned(trip) ? new Set(trip.days.map((day) => day.cityId)) : trip.cityIds
  return [...cityIds]
    .map((cityId) => getCity(cityId))
    .filter((city) => city !== undefined)
    .map((city) => city.name)
}

export function getTrip(id: string | undefined) {
  return TRIPS.find((trip) => trip.id === id)
}

export function tripPath(trip: Trip) {
  return `/${trip.id}`
}

export function dayPath(trip: Trip, date: string) {
  return `/${trip.id}/${date}`
}

/** The trip with a day on `date`, that day, and its place in the trip. */
export function findDay(date: string) {
  for (const trip of TRIPS) {
    if (!isPlanned(trip)) continue
    const index = trip.days.findIndex((day) => day.date === date)
    if (index >= 0) return { trip, day: trip.days[index], index }
  }
  return undefined
}

/** Whether a trip is behind us, underway, or still to come. */
export function tripStatus(trip: Trip, today: string): TimelineStatus {
  if (tripEnd(trip) < today) return "past"
  if (tripStart(trip) > today) return "future"
  return "current"
}
