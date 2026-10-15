import type { TimelineStatus } from "@/lib/blocks"
import { FIRST_DATE_2026 } from "./trips/first-date-2026"
import { FUKUI_2026 } from "./trips/fukui-2026"
import { MATSUMOTO_2026 } from "./trips/matsumoto-2026"
import type { Trip } from "./types"

/** Every trip on the site, in date order. A new trip is added by listing it here. */
export const TRIPS: Trip[] = [FIRST_DATE_2026, MATSUMOTO_2026, FUKUI_2026].sort((a, b) =>
  tripStart(a).localeCompare(tripStart(b)),
)

export function tripStart(trip: Trip) {
  return trip.days[0].date
}

export function tripEnd(trip: Trip) {
  return trip.days[trip.days.length - 1].date
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
