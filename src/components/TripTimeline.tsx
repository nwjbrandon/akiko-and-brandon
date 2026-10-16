import { useId } from "react"
import { Link } from "react-router-dom"
import { ChevronRight, TrainFront } from "lucide-react"
import { getCity } from "@/data/cities"
import { dayPath } from "@/data/itinerary"
import type { PlannedTrip } from "@/data/types"
import { useNow } from "@/hooks/useNow"
import { useLang } from "@/i18n/LanguageProvider"
import { dayLabel, inDays, planCount } from "@/i18n/strings"
import { blockDuration, blockIcon, dayBounds, timeRange, type TimelineStatus } from "@/lib/blocks"
import { daysBetween, formatDayDate } from "@/lib/date"
import type { TripLeg } from "@/lib/maps"
import { cn } from "@/lib/utils"
import { Badge } from "./Badge"
import { DayBar, DayBarKey } from "./DayBar"
import { TimelineRail } from "./TimelineRail"
import { TodayMarker } from "./TodayMarker"

type Row = { kind: "today" } | { kind: "day"; index: number } | { kind: "hop"; index: number }

const CARD: Record<TimelineStatus, string> = {
  current: "border-primary/60 bg-card shadow-xl ring-1 ring-primary/25",
  future: "border-primary/30 bg-card/80",
  past: "border-border/70 bg-card/45 opacity-75 hover:opacity-100",
}

function statusOn(date: string, today: string): TimelineStatus {
  if (date < today) return "past"
  if (date > today) return "future"
  return "current"
}

/**
 * The trip's days down one rail, as on the home page and a day's page: a card
 * per day leading to its timeline and, before the first day in each new city,
 * the hop that gets us there. Before the
 * trip a marker at the top counts down to it; during it, today's card gets the
 * pulsing dot.
 */
export function TripTimeline({
  trip,
  legs,
  className,
}: {
  trip: PlannedTrip
  /** The hops between the trip's cities, from `tripLegs`. */
  legs: TripLeg[]
  className?: string
}) {
  const { lang, ui } = useLang()
  const { today } = useNow()
  const headingId = useId()
  const start = trip.days[0].date

  const rows: Row[] = today < start ? [{ kind: "today" }] : []
  trip.days.forEach((_, index) => {
    legs.forEach((leg, legIndex) => {
      if (leg.arrivalDay === index) rows.push({ kind: "hop", index: legIndex })
    })
    rows.push({ kind: "day", index })
  })

  return (
    <section aria-labelledby={headingId} className={className}>
      <h2 id={headingId} className="text-title font-extrabold tracking-tight">
        {ui("dayByDay")}
      </h2>
      <DayBarKey className="mt-2.5" />

      <ol className="mt-5 list-none p-0">
        {rows.map((row, position) => {
          const isFirst = position === 0
          const isLast = position === rows.length - 1
          if (row.kind === "today") {
            return (
              <TodayMarker
                key="today"
                today={today}
                note={inDays(daysBetween(today, start), lang)}
                isFirst={isFirst}
                isLast={isLast}
              />
            )
          }
          if (row.kind === "hop") {
            return (
              <HopItem
                key={`hop-${row.index}`}
                hop={legs[row.index]}
                status={statusOn(trip.days[legs[row.index].arrivalDay ?? 0].date, today)}
                isFirst={isFirst}
                isLast={isLast}
              />
            )
          }
          const day = trip.days[row.index]
          return (
            <DayItem
              key={day.date}
              trip={trip}
              index={row.index}
              status={statusOn(day.date, today)}
              isFirst={isFirst}
              isLast={isLast}
            />
          )
        })}
      </ol>
    </section>
  )
}

/** A day's card: its date and title, the start of its summary, its shape, and how full it is. */
function DayItem({
  trip,
  index,
  status,
  isFirst,
  isLast,
}: {
  trip: PlannedTrip
  index: number
  status: TimelineStatus
  isFirst: boolean
  isLast: boolean
}) {
  const { lang, tx } = useLang()
  const day = trip.days[index]
  const { start, end } = dayBounds(day.blocks)
  const plans = planCount(day.blocks.length, lang)
  const hours = timeRange(start, end, lang)
  const city = getCity(day.cityId)

  return (
    <li className="relative flex gap-4">
      <TimelineRail status={status} isFirst={isFirst} isLast={isLast} />
      <Link
        to={dayPath(trip, day.date)}
        className={cn(
          "relative -ml-3 mr-1 mb-6 block w-full min-w-0 flex-1 rounded-2xl border px-3 py-4 shadow-lg backdrop-blur-xl transition-[box-shadow,transform,opacity] hover:-translate-y-0.5 hover:shadow-xl sm:-ml-4 sm:mr-0 sm:px-4 sm:py-5",
          CARD[status],
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <p className="text-base font-semibold tabular-nums text-muted-foreground">
            {formatDayDate(day.date, lang)}
          </p>
          <Badge variant={status === "current" ? "accent" : "secondary"} className="shrink-0">
            {dayLabel(index, lang)}
          </Badge>
        </div>
        <h3 className="mt-1 text-xl leading-snug font-bold sm:text-2xl">{tx(day.title)}</h3>
        <p className="mt-1 line-clamp-3 text-base leading-relaxed text-muted-foreground">
          {tx(day.summary)}
        </p>
        <DayBar blocks={day.blocks} label={`${plans} · ${hours}`} className="mt-3" />
        <div className="mt-3 flex items-end justify-between gap-2">
          <p className="text-sm font-semibold tabular-nums text-primary">
            {hours}
            <span className="font-medium text-muted-foreground">
              {" · "}
              {plans}
              {city ? ` · ${tx(city.name)}` : null}
            </span>
          </p>
          <ChevronRight className="no-print size-5 shrink-0 text-primary" aria-hidden />
        </div>
      </Link>
    </li>
  )
}

/** A hop to the next city, between the days: where from and to, and when, if the days say. */
function HopItem({
  hop,
  status,
  isFirst,
  isLast,
}: {
  hop: TripLeg
  status: TimelineStatus
  isFirst: boolean
  isLast: boolean
}) {
  const { lang, tx } = useLang()
  const { journey } = hop
  const Icon = journey ? blockIcon(journey.block) : TrainFront
  const duration = journey ? blockDuration(journey.block, lang) : null

  return (
    <li className="relative flex gap-4">
      <TimelineRail
        status={status}
        isFirst={isFirst}
        isLast={isLast}
        marker={
          <span className="grid size-6 place-items-center rounded-full border-2 border-primary/30 bg-background text-primary">
            <Icon className="size-3" aria-hidden />
          </span>
        }
      />
      <div className="-ml-3 mr-1 mb-6 flex min-h-[3.375rem] w-full min-w-0 flex-1 items-center rounded-2xl border border-border/70 bg-card/45 px-3 py-2 sm:-ml-4 sm:mr-0 sm:min-h-[3.875rem] sm:px-4">
        <p className="min-w-0">
          <span className="block text-sm font-bold">
            {tx(hop.from.name)} → {tx(hop.to.name)}
          </span>
          {journey ? (
            <span className="block text-sm font-medium tabular-nums text-muted-foreground">
              {formatDayDate(journey.day.date, lang, "short")} · {journey.block.start}
              {duration ? ` · ${duration}` : null}
            </span>
          ) : null}
        </p>
      </div>
    </li>
  )
}
