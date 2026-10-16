import { useEffect, useRef, type Ref } from "react"
import { Link } from "react-router-dom"
import { ChevronRight, Heart, NotebookPen } from "lucide-react"
import {
  TRIPS,
  isPlanned,
  tripDayCount,
  tripEnd,
  tripPath,
  tripPlaces,
  tripStart,
  tripStatus,
} from "@/data/itinerary"
import type { Trip } from "@/data/types"
import { Badge } from "@/components/Badge"
import { TimelineRail } from "@/components/TimelineRail"
import { TodayMarker } from "@/components/TodayMarker"
import { TripBadge } from "@/components/TripBadge"
import { useNow } from "@/hooks/useNow"
import { useLang } from "@/i18n/LanguageProvider"
import { dayCount, dayOfTrip, daysToGo, placeList, translate } from "@/i18n/strings"
import type { TimelineStatus } from "@/lib/blocks"
import { daysBetween, formatDateSpan, formatDayDate, formatShortSpan } from "@/lib/date"
import { tripStops } from "@/lib/maps"
import { cn } from "@/lib/utils"

type Row =
  | { kind: "trip"; trip: Trip; status: TimelineStatus }
  | { kind: "today" }
  | { kind: "year"; year: string; status: TimelineStatus }

/**
 * The trips in date order down one rail, under a heading for each year. Past
 * trips shrink to a line or two and fade back; the trip underway, or else the
 * next one, gets a card of its own with a countdown and the way it goes; and
 * between trips a marker shows where today falls. However long the list
 * grows, the page opens on that point.
 */
export function HomePage() {
  const { lang, ui } = useLang()
  const { today } = useNow()
  // The trip underway, or else the today marker.
  const nowRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    document.title = translate("siteName", lang)
  }, [lang])

  // Open on now rather than on the oldest trip. While it is already on screen,
  // as it is until the list outgrows the viewport, leave the page at the top.
  useEffect(() => {
    const row = nowRef.current
    if (!row) return
    const root = getComputedStyle(document.documentElement)
    // The fixed header covers the top of the viewport; --header-height is in rem.
    const headerHeight =
      parseFloat(root.getPropertyValue("--header-height")) * parseFloat(root.fontSize)
    const { top, bottom } = row.getBoundingClientRect()
    if (top >= headerHeight && bottom <= window.innerHeight) return
    row.scrollIntoView({ block: "center" })
  }, [])

  const rows = timelineRows(today)
  const featured =
    TRIPS.find((trip) => tripStatus(trip, today) === "current") ??
    TRIPS.find((trip) => tripStatus(trip, today) === "future")

  return (
    <div className="mx-auto w-full max-w-[480px] px-4 pt-[calc(var(--header-height)+1.625rem)] pb-16 sm:px-6">
      <header>
        <p className="flex items-center gap-1.5 text-xs font-bold tracking-wide text-primary uppercase">
          <Heart className="size-3.5 fill-current" aria-hidden />
          {ui("ourTrips")}
        </p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
          {ui("siteName")}
        </h1>
        <p className="mt-2 text-lg leading-relaxed text-muted-foreground">
          {ui("homeSubtitle")}
        </p>
      </header>

      <ol className="mt-8 list-none p-0">
        {rows.map((row, index) => {
          const isFirst = index === 0
          const isLast = index === rows.length - 1
          if (row.kind === "year") {
            return (
              <YearMarker
                key={`year-${row.year}`}
                year={row.year}
                status={row.status}
                isFirst={isFirst}
                isLast={isLast}
              />
            )
          }
          if (row.kind === "today") {
            return (
              <TodayMarker
                key="today"
                ref={nowRef}
                today={today}
                isFirst={isFirst}
                isLast={isLast}
              />
            )
          }
          const ref = row.status === "current" ? nowRef : undefined
          return row.trip === featured ? (
            <FeaturedTripItem
              key={row.trip.id}
              ref={ref}
              trip={row.trip}
              status={row.status}
              today={today}
              isFirst={isFirst}
              isLast={isLast}
            />
          ) : (
            <TripItem
              key={row.trip.id}
              ref={ref}
              trip={row.trip}
              status={row.status}
              today={today}
              isFirst={isFirst}
              isLast={isLast}
            />
          )
        })}
      </ol>
    </div>
  )
}

/** The trips, the today marker between them unless a trip is underway, and each year's heading. */
function timelineRows(today: string) {
  const rows: Exclude<Row, { kind: "year" }>[] = TRIPS.map((trip) => ({
    kind: "trip",
    trip,
    status: tripStatus(trip, today),
  }))
  if (!rows.some((row) => row.kind === "trip" && row.status === "current")) {
    const next = rows.findIndex((row) => row.kind === "trip" && row.status === "future")
    rows.splice(next < 0 ? rows.length : next, 0, { kind: "today" })
  }

  const withYears: Row[] = []
  rows.forEach((row) => {
    const year = (row.kind === "trip" ? tripStart(row.trip) : today).slice(0, 4)
    const previous = withYears.findLast((item) => item.kind !== "year")
    const previousYear = previous
      ? (previous.kind === "trip" ? tripStart(previous.trip) : today).slice(0, 4)
      : undefined
    if (year !== previousYear) {
      withYears.push({ kind: "year", year, status: row.kind === "trip" ? row.status : "future" })
    }
    withYears.push(row)
  })
  return withYears
}

function YearMarker({
  year,
  status,
  isFirst,
  isLast,
}: {
  year: string
  status: TimelineStatus
  isFirst: boolean
  isLast: boolean
}) {
  return (
    <li className="relative flex gap-4">
      <TimelineRail
        status={status}
        isFirst={isFirst}
        isLast={isLast}
        marker={<span className="block h-0.5 w-2 rounded-full bg-muted-foreground/50" />}
      />
      {/* Padded so the year sits level with the tick on the rail. */}
      <p className="-ml-3 mb-3 flex min-w-0 flex-1 items-center gap-2.5 pt-[1.0625rem] text-[13px] leading-5 font-extrabold tracking-[0.1em] tabular-nums text-muted-foreground sm:-ml-4 sm:pt-[1.3125rem]">
        {year}
        <span className="h-px flex-1 bg-border" aria-hidden />
      </p>
    </li>
  )
}

const CARD: Record<TimelineStatus, string> = {
  current: "border-primary/60 bg-card shadow-xl ring-1 ring-primary/25",
  future: "border-primary/30 bg-card/80 shadow-lg",
  past: "border-border/70 bg-card/45 opacity-75 hover:opacity-100",
}

const CARD_BASE =
  "relative -ml-3 mr-1 block w-full min-w-0 flex-1 rounded-2xl border px-3 py-4 backdrop-blur-xl transition-[box-shadow,transform,opacity] hover:-translate-y-0.5 hover:shadow-xl sm:-ml-4 sm:mr-0 sm:px-4 sm:py-5"

/** A trip's card: a short one for a trip behind us, a full one for a trip to come. */
function TripItem({
  ref,
  trip,
  status,
  today,
  isFirst,
  isLast,
}: {
  ref?: Ref<HTMLLIElement>
  trip: Trip
  status: TimelineStatus
  today: string
  isFirst: boolean
  isLast: boolean
}) {
  const { lang, tx } = useLang()
  const places = placeList(tripPlaces(trip), lang)
  const planned = isPlanned(trip)
  const dates = formatDateSpan(tripStart(trip), tripEnd(trip), lang)

  if (status === "past") {
    return (
      <li ref={ref} className="relative flex gap-4">
        <TimelineRail status={status} isFirst={isFirst} isLast={isLast} />
        <Link to={tripPath(trip)} className={cn(CARD_BASE, "mb-4", CARD.past)}>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold tabular-nums text-muted-foreground">{dates}</p>
            <TripBadge trip={trip} today={today} className="shrink-0" />
          </div>
          <div className="mt-0.5 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <h2 className="text-lg leading-snug font-bold">{tx(trip.title)}</h2>
              <p className="mt-0.5 text-sm font-medium text-muted-foreground">
                {dayCount(tripDayCount(trip), lang)}
                {places ? ` · ${places}` : null}
              </p>
            </div>
            <ChevronRight className="no-print size-5 shrink-0 text-primary" aria-hidden />
          </div>
        </Link>
      </li>
    )
  }

  return (
    <li ref={ref} className="relative flex gap-4">
      <TimelineRail
        status={status}
        isFirst={isFirst}
        isLast={isLast}
        dotClassName={planned ? undefined : "border-dashed border-primary/45 bg-transparent"}
      />
      <Link
        to={tripPath(trip)}
        className={cn(
          CARD_BASE,
          "mb-8",
          CARD[status],
          // A dashed edge for a trip still to be filled in.
          !planned && "border-dashed",
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <p className="text-base font-semibold tabular-nums text-muted-foreground">{dates}</p>
          <TripBadge trip={trip} today={today} className="shrink-0" />
        </div>
        <h2 className="mt-1 text-xl leading-snug font-bold sm:text-2xl">{tx(trip.title)}</h2>
        <p className="mt-1 text-base leading-relaxed text-muted-foreground">
          {tx(trip.subtitle)}
        </p>
        {planned ? null : <NotPlannedBadge className="mt-3" />}
        <div className="mt-3 flex items-end justify-between gap-2">
          <p className="text-sm font-semibold text-primary">
            {dayCount(tripDayCount(trip), lang)}
            {places ? <span className="font-medium text-muted-foreground"> · {places}</span> : null}
          </p>
          <ChevronRight className="no-print size-5 shrink-0 text-primary" aria-hidden />
        </div>
      </Link>
    </li>
  )
}

/**
 * The trip underway, or else the next one: a card of its own, with how long
 * there is to go and what comes first, or which day of it this is, and the way
 * it goes from city to city.
 */
function FeaturedTripItem({
  ref,
  trip,
  status,
  today,
  isFirst,
  isLast,
}: {
  ref?: Ref<HTMLLIElement>
  trip: Trip
  status: TimelineStatus
  today: string
  isFirst: boolean
  isLast: boolean
}) {
  const { lang, ui, tx } = useLang()
  const start = tripStart(trip)
  const planned = isPlanned(trip)
  const places = placeList(tripPlaces(trip), lang)
  const stops = tripStops(trip)
  const underway = status === "current"

  return (
    <li ref={ref} className="relative flex gap-4">
      <TimelineRail
        status={status}
        isFirst={isFirst}
        isLast={isLast}
        dotClassName={
          underway
            ? undefined
            : cn("border-primary bg-background ring-4 ring-primary/15", !planned && "border-dashed")
        }
      />
      <Link
        to={tripPath(trip)}
        className={cn(
          "relative -ml-3 mr-1 mb-8 block w-full min-w-0 flex-1 rounded-3xl border border-primary/55 bg-card px-4 py-4 shadow-xl ring-4 ring-primary/8 transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-2xl sm:-ml-4 sm:mr-0 sm:px-5 sm:py-5",
          !planned && "border-dashed",
        )}
      >
        <p className="text-sm font-bold tabular-nums text-primary">
          {underway ? ui("underway") : ui("nextUp")} · {formatDateSpan(start, tripEnd(trip), lang)}
        </p>
        <h2 className="mt-1.5 text-2xl leading-tight font-extrabold tracking-tight sm:text-[1.75rem]">
          {tx(trip.title)}
        </h2>
        <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">
          {tx(trip.subtitle)}
        </p>
        {planned ? null : <NotPlannedBadge className="mt-3" />}

        {underway ? (
          <TodayOnTrip trip={trip} today={today} />
        ) : (
          <Countdown trip={trip} today={today} />
        )}

        {stops.length > 1 ? (
          <ol
            className="relative mt-4 grid list-none gap-1 p-0"
            style={{ gridTemplateColumns: `repeat(${stops.length}, minmax(0, 1fr))` }}
          >
            {/* The way, from the first stop's dot to the last one's. */}
            <span
              className="absolute top-1.5 h-0.5 bg-primary/30"
              style={{
                left: `calc(100% / ${stops.length * 2})`,
                right: `calc(100% / ${stops.length * 2})`,
              }}
              aria-hidden
            />
            {stops.map((stop, index) => {
              const end = index === 0 || index === stops.length - 1
              return (
                <li
                  key={`${stop.city.id}-${index}`}
                  className="relative flex min-w-0 flex-col items-center text-center"
                >
                  <span
                    className={cn(
                      "size-3 rounded-full border-2 border-primary",
                      end ? "bg-card" : "bg-primary",
                    )}
                    aria-hidden
                  />
                  <span className="mt-1.5 w-full truncate text-xs font-bold">
                    {tx(stop.city.name)}
                  </span>
                  {stop.days ? (
                    <span className="text-xs font-medium tabular-nums text-muted-foreground">
                      {formatShortSpan(stop.days.start, stop.days.end, lang)}
                    </span>
                  ) : null}
                </li>
              )
            })}
          </ol>
        ) : null}

        <div className="mt-4 flex items-center justify-between gap-2 border-t border-border/70 pt-3">
          <p className="text-sm font-bold text-primary">
            {dayCount(tripDayCount(trip), lang)}
            {places ? <span className="font-medium text-muted-foreground"> · {places}</span> : null}
          </p>
          <span className="no-print inline-flex shrink-0 items-center gap-0.5 text-sm font-bold text-primary">
            {ui("open")}
            <ChevronRight className="size-4.5" aria-hidden />
          </span>
        </div>
      </Link>
    </li>
  )
}

/** How many days until the trip, and its first plan when it has one. */
function Countdown({ trip, today }: { trip: Trip; today: string }) {
  const { lang, ui, tx } = useLang()
  const untilStart = daysBetween(today, tripStart(trip))
  const firstDay = isPlanned(trip) ? trip.days[0] : undefined
  const first = firstDay?.blocks[0]

  return (
    <div className="mt-4 flex items-center gap-3.5 rounded-2xl bg-accent/15 px-3.5 py-3">
      <p className="text-[2.5rem] leading-none font-extrabold tracking-tight tabular-nums">
        {untilStart}
      </p>
      <div className="min-w-0 text-sm leading-snug">
        <p className="font-bold">{daysToGo(untilStart, lang)}</p>
        {firstDay && first ? (
          <p className="mt-0.5 text-muted-foreground">
            {ui("firstUp")}: {tx(first.title)}
            {first.location ? ` · ${tx(first.location)}` : null}
            <span className="block tabular-nums">
              {formatDayDate(firstDay.date, lang, "short")} · {first.start}
            </span>
          </p>
        ) : null}
      </div>
    </div>
  )
}

/** Which day of the trip today is, and that day's title. */
function TodayOnTrip({ trip, today }: { trip: Trip; today: string }) {
  const { lang, tx } = useLang()
  if (!isPlanned(trip)) return null
  const index = trip.days.findIndex((day) => day.date === today)
  // Between planned days of a trip still underway, there is no day to name.
  if (index < 0) return null

  return (
    <div className="mt-4 rounded-2xl bg-secondary px-3.5 py-3 text-sm leading-snug">
      <p className="font-bold">{dayOfTrip(index, trip.days.length, lang)}</p>
      <p className="mt-0.5 text-muted-foreground">{tx(trip.days[index].title)}</p>
    </div>
  )
}

function NotPlannedBadge({ className }: { className?: string }) {
  const { ui } = useLang()
  return (
    <Badge variant="muted" className={cn("gap-1.5", className)}>
      <NotebookPen className="size-3.5 shrink-0" aria-hidden />
      {ui("notPlannedYet")}
    </Badge>
  )
}
