import { useEffect } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { ArrowLeft, ArrowRight, Heart } from "lucide-react"
import { dayPath, getTrip, tripEnd, tripStart } from "@/data/itinerary"
import { Badge } from "@/components/Badge"
import { useLang } from "@/i18n/LanguageProvider"
import { dayLabel } from "@/i18n/strings"
import { dayBounds, timeRange } from "@/lib/blocks"
import { formatDateSpan, formatFullDate } from "@/lib/date"

/** One trip at a glance: a card per day, each leading to its timeline. */
export function TripPage() {
  const { tripId } = useParams()
  const { lang, ui, tx } = useLang()
  const trip = getTrip(tripId)

  useEffect(() => {
    if (trip) document.title = trip.title[lang]
  }, [trip, lang])

  if (!trip) return <Navigate to="/" replace />

  return (
    <div className="mx-auto w-full max-w-[480px] px-4 pt-[calc(var(--header-height)+1.625rem)] pb-16 sm:px-6">
      <Link
        to="/"
        className="no-print inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-4" aria-hidden />
        {ui("allTrips")}
      </Link>

      <header className="mt-5">
        <p className="flex items-center gap-1.5 text-xs font-bold tracking-wide text-primary uppercase">
          <Heart className="size-3.5 fill-current" aria-hidden />
          {formatDateSpan(tripStart(trip), tripEnd(trip), lang)}
        </p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
          {tx(trip.title)}
        </h1>
        <p className="mt-2 text-lg leading-relaxed text-muted-foreground">
          {tx(trip.subtitle)}
        </p>
      </header>

      <ul className="mt-8 list-none space-y-4 p-0">
        {trip.days.map((day, index) => {
          const { start, end } = dayBounds(day.blocks)
          return (
            <li key={day.date}>
              <Link
                to={dayPath(trip, day.date)}
                className="block rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:border-primary/50 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-title font-extrabold tracking-tight">
                      {dayLabel(index, lang)} · {tx(day.title)}
                    </p>
                    <p className="mt-0.5 text-caption font-semibold text-muted-foreground">
                      {formatFullDate(day.date, lang)}
                    </p>
                  </div>
                  <Badge variant="accent" className="shrink-0 tabular-nums">
                    {day.blocks.length}
                  </Badge>
                </div>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {tx(day.summary)}
                </p>
                <p className="mt-3 flex items-center gap-1.5 text-sm font-bold tabular-nums text-primary">
                  {timeRange(start, end, lang)}
                  <ArrowRight className="size-4" aria-hidden />
                </p>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
