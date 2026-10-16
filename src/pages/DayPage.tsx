import { useEffect, useId, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { MapPin } from "lucide-react"
import { dayPath, getTrip, isPlanned, tripPath } from "@/data/itinerary"
import { mapsSearch } from "@/data/trips/shared"
import type { Day } from "@/data/types"
import { DayHero } from "@/components/DayHero"
import { DaySelector } from "@/components/DaySelector"
import { DAY_MAP_ID, DayMap } from "@/components/DayMap"
import { DayTimeline } from "@/components/DayTimeline"
import { useLang } from "@/i18n/LanguageProvider"
import { dayLabel } from "@/i18n/strings"
import { MAPS_ENABLED, dayJourneys, dayPlaces, revealMap } from "@/lib/maps"
import { cn } from "@/lib/utils"

const NAV_LINK =
  "inline-flex min-h-11 items-center justify-center rounded-full border border-border px-4 py-2.5 text-sm font-bold transition-colors hover:border-primary/60 hover:text-primary"

export function DayPage() {
  const { tripId, date = "" } = useParams()
  const { lang, ui, tx } = useLang()
  const trip = getTrip(tripId)
  // A trip not planned yet has no days to show.
  const days = trip && isPlanned(trip) ? trip.days : []
  const index = days.findIndex((day) => day.date === date)
  const day = days[index]
  // The journey on the day's map, kept with its date so another day opens on its own first journey.
  const [onMap, setOnMap] = useState<{ date: string; key: string }>()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [date])

  useEffect(() => {
    if (!trip) return
    const title = trip.title[lang]
    document.title = day ? `${dayLabel(index, lang)} · ${title}` : title
  }, [trip, day, index, lang])

  if (!trip || !isPlanned(trip) || !day) {
    return (
      <div className="mx-auto max-w-[480px] px-4 pt-40 pb-16 text-center sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight">
          {ui("dayNotFound")}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {ui("dayNotFoundBody")}{" "}
          <span className="font-semibold">{date || ui("thatDate")}</span>
        </p>
        <Link
          to={trip ? tripPath(trip) : "/"}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-base font-bold text-primary-foreground transition-opacity hover:opacity-90"
        >
          {ui("backToItinerary")}
        </Link>
      </div>
    )
  }

  const previous = index > 0 ? trip.days[index - 1] : undefined
  const next = index < trip.days.length - 1 ? trip.days[index + 1] : undefined

  const journeys = dayJourneys(day)
  // Without a maps key there is no map, so no journey offers to show itself on one.
  const mapKeys = MAPS_ENABLED ? journeys.map(({ block }) => block.start) : []
  const mapKey = onMap?.date === day.date ? onMap.key : mapKeys[0]
  const hasMap = MAPS_ENABLED && (journeys.length > 0 || dayPlaces(day).length > 0)

  return (
    <div className="relative flex flex-col">
      <div className="h-(--header-height) shrink-0" aria-hidden />

      <div className="no-print sticky top-(--header-height) z-40 mx-auto w-full max-w-[480px] px-4 sm:px-6">
        <DaySelector trip={trip} activeDate={day.date} className="w-full" />
      </div>

      {/* Pull the hero up so the sunset sits behind the header and day selector. */}
      <div className="relative -mt-[calc(var(--header-height)+var(--selector-height))]">
        <DayHero trip={trip} day={day} />

        {/*
          On a phone the map comes first, then the timeline. On a wide screen
          the map sits beside the timeline, on the right; it comes first in the
          page so that it is first when the two stack.
        */}
        <div className="mx-auto mt-6 flex w-full max-w-[480px] flex-col gap-9 px-4 pb-16 sm:px-6 lg:max-w-[1120px] lg:flex-row-reverse lg:items-start lg:gap-10">
          {hasMap || journeys.length > 0 ? (
            <aside
              className={cn(
                "flex flex-col gap-7 lg:w-[400px] lg:shrink-0 xl:w-[440px]",
                // Without a map, all that is left here is the list of places, which is for wide screens.
                !hasMap && "hidden lg:flex",
              )}
            >
              <DayMap
                day={day}
                selected={mapKey}
                onSelect={(key) => setOnMap({ date: day.date, key })}
                className="scroll-mt-[calc(var(--header-height)+var(--selector-height)+1rem)]"
              />
              {journeys.length > 0 ? <DayPlaces day={day} className="hidden lg:block" /> : null}
            </aside>
          ) : null}

          <div className="min-w-0 flex-1">
            <h2 className="text-title font-extrabold tracking-tight">{ui("theDay")}</h2>
            {/* Keyed by date so an open detail sheet never carries over to another day. */}
            <DayTimeline
              key={day.date}
              day={day}
              mapKeys={mapKeys}
              mapKey={mapKey}
              onShowOnMap={(key) => {
                setOnMap({ date: day.date, key })
                revealMap(DAY_MAP_ID)
              }}
              className="mt-4"
            />

            <nav
              aria-label={ui("otherDays")}
              className="no-print flex flex-wrap items-center justify-between gap-3"
            >
              {previous ? (
                <Link to={dayPath(trip, previous.date)} className={NAV_LINK}>
                  ← {tx(previous.title)}
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link to={dayPath(trip, next.date)} className={NAV_LINK}>
                  {tx(next.title)} →
                </Link>
              ) : null}
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

/** The day's places, each a link to Google Maps, under the map on a wide screen. */
function DayPlaces({ day, className }: { day: Day; className?: string }) {
  const { ui, tx } = useLang()
  const headingId = useId()
  const places = dayPlaces(day)
  if (places.length === 0) return null

  return (
    <section aria-labelledby={headingId} className={cn("no-print", className)}>
      <h2
        id={headingId}
        className="text-xs font-extrabold tracking-[0.08em] text-muted-foreground uppercase"
      >
        {ui("placesToday")}
      </h2>
      <ul className="mt-2.5 list-none overflow-hidden rounded-2xl border border-border bg-card/70 p-0">
        {places.map(({ block, place }) => (
          <li key={block.start} className="border-t border-border/70 first:border-t-0">
            <a
              href={block.map ?? mapsSearch(place)}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-12 items-center gap-2.5 px-4 py-2 text-[15px] font-semibold transition-colors hover:bg-muted/60 hover:text-primary"
            >
              <MapPin className="size-4 shrink-0 text-primary" aria-hidden />
              <span className="min-w-0 flex-1">{tx(block.location ?? block.title)}</span>
              <span className="text-sm font-semibold tabular-nums text-muted-foreground">
                {block.start}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
