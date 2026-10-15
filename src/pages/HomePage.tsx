import { useEffect, useRef, type Ref } from "react"
import { Link } from "react-router-dom"
import { ChevronRight, Heart } from "lucide-react"
import { getCity } from "@/data/cities"
import { TRIPS, tripEnd, tripPath, tripStart, tripStatus } from "@/data/itinerary"
import type { Trip } from "@/data/types"
import { Badge } from "@/components/Badge"
import { TimelineRail } from "@/components/TimelineRail"
import { useNow } from "@/hooks/useNow"
import { useLang } from "@/i18n/LanguageProvider"
import { dayCount, inDays, translate } from "@/i18n/strings"
import type { TimelineStatus } from "@/lib/blocks"
import { daysBetween, formatDateSpan, formatFullDate } from "@/lib/date"
import { cn } from "@/lib/utils"

type Row = { kind: "trip"; trip: Trip; status: TimelineStatus } | { kind: "today" }

/**
 * The trips in date order down one rail. Past trips fade back and a trip
 * underway gets the pulsing dot, as moments do on a day's timeline; between
 * trips, a marker shows where today falls. However long the list grows, the
 * page opens on that point.
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

  const rows: Row[] = TRIPS.map((trip) => ({
    kind: "trip",
    trip,
    status: tripStatus(trip, today),
  }))
  if (!rows.some((row) => row.kind === "trip" && row.status === "current")) {
    const next = rows.findIndex((row) => row.kind === "trip" && row.status === "future")
    rows.splice(next < 0 ? rows.length : next, 0, { kind: "today" })
  }

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
          return row.kind === "today" ? (
            <TodayMarker
              key="today"
              ref={nowRef}
              today={today}
              isFirst={isFirst}
              isLast={isLast}
            />
          ) : (
            <TripItem
              key={row.trip.id}
              ref={row.status === "current" ? nowRef : undefined}
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

function TodayMarker({
  ref,
  today,
  isFirst,
  isLast,
}: {
  ref?: Ref<HTMLLIElement>
  today: string
  isFirst: boolean
  isLast: boolean
}) {
  const { lang, ui } = useLang()
  return (
    <li ref={ref} className="relative flex gap-4">
      <TimelineRail
        status="future"
        isFirst={isFirst}
        isLast={isLast}
        dotClassName="border-accent bg-accent ring-4 ring-accent/25"
      />
      {/* Padded so the pill sits level with the dot. */}
      <div className="-ml-3 mb-6 flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-1 pt-[0.9375rem] sm:-ml-4 sm:pt-[1.1875rem]">
        <Badge variant="accent">{ui("today")}</Badge>
        <span className="text-sm font-semibold text-muted-foreground">
          {formatFullDate(today, lang)}
        </span>
      </div>
    </li>
  )
}

const CARD: Record<TimelineStatus, string> = {
  current: "border-primary/60 bg-card shadow-xl ring-1 ring-primary/25",
  future: "border-primary/30 bg-card/80",
  past: "border-border/70 bg-card/45 opacity-75 hover:opacity-100",
}

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
  const { lang, ui, tx } = useLang()
  const start = tripStart(trip)
  const untilStart = daysBetween(today, start)

  const badge =
    status === "current"
      ? { variant: "secondary" as const, label: ui("underway") }
      : status === "past"
        ? { variant: "muted" as const, label: ui("pastTrip") }
        : {
            variant: "accent" as const,
            label: untilStart === 1 ? ui("startsTomorrow") : inDays(untilStart, lang),
          }

  // Each place once, in the order the trip reaches it.
  const places = [...new Set(trip.days.map((day) => day.cityId))]
    .map((cityId) => getCity(cityId))
    .filter((city) => city !== undefined)
    .map((city) => tx(city.name))
    .join(lang === "ja" ? "・" : " · ")

  return (
    <li ref={ref} className="relative flex gap-4">
      <TimelineRail status={status} isFirst={isFirst} isLast={isLast} />
      <Link
        to={tripPath(trip)}
        className={cn(
          "relative -ml-3 mr-1 mb-8 block w-full min-w-0 flex-1 rounded-2xl border px-3 py-4 shadow-lg backdrop-blur-xl transition-[box-shadow,transform,opacity] hover:-translate-y-0.5 hover:shadow-xl sm:-ml-4 sm:mr-0 sm:px-4 sm:py-5",
          CARD[status],
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <p className="text-base font-semibold tabular-nums text-muted-foreground">
            {formatDateSpan(start, tripEnd(trip), lang)}
          </p>
          <Badge variant={badge.variant} className="shrink-0 tabular-nums">
            {badge.label}
          </Badge>
        </div>
        <h2 className="mt-1 text-xl leading-snug font-bold sm:text-2xl">
          {tx(trip.title)}
        </h2>
        <p className="mt-1 text-base leading-relaxed text-muted-foreground">
          {tx(trip.subtitle)}
        </p>
        <div className="mt-3 flex items-end justify-between gap-2">
          <p className="text-sm font-semibold text-primary">
            {dayCount(trip.days.length, lang)}
            {places ? <span className="font-medium text-muted-foreground"> · {places}</span> : null}
          </p>
          <ChevronRight className="no-print size-5 shrink-0 text-primary" aria-hidden />
        </div>
      </Link>
    </li>
  )
}
