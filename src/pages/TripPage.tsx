import { useEffect, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { ArrowLeft, Heart, NotebookPen } from "lucide-react"
import {
  getTrip,
  isPlanned,
  tripDayCount,
  tripEnd,
  tripPlaces,
  tripStart,
} from "@/data/itinerary"
import { Badge } from "@/components/Badge"
import { TripBadge } from "@/components/TripBadge"
import { TRIP_MAP_ID, TripMap } from "@/components/TripMap"
import { TripTimeline } from "@/components/TripTimeline"
import { useNow } from "@/hooks/useNow"
import { useLang } from "@/i18n/LanguageProvider"
import { dayCount, placeList } from "@/i18n/strings"
import { formatDateSpan } from "@/lib/date"
import { MAPS_ENABLED, revealMap, tripLegs } from "@/lib/maps"

/**
 * One trip at a glance: the way between its cities on a map, then its days
 * down a rail with the hops between them, each day leading to its timeline,
 * or a note that the days are still to be planned.
 */
export function TripPage() {
  const { tripId } = useParams()
  const { lang, ui, tx } = useLang()
  const { today } = useNow()
  const trip = getTrip(tripId)
  // The hop on the trip's map, kept with its trip so another trip opens on its own first hop.
  const [onMap, setOnMap] = useState<{ tripId: string; key: string }>()

  useEffect(() => {
    if (trip) document.title = trip.title[lang]
  }, [trip, lang])

  if (!trip) return <Navigate to="/" replace />

  const legs = tripLegs(trip)
  const mapKey = onMap?.tripId === trip.id ? onMap.key : legs.length > 0 ? "0" : undefined
  const pick = (key: string) => setOnMap({ tripId: trip.id, key })

  return (
    <div className="mx-auto w-full max-w-[480px] px-4 pt-[calc(var(--header-height)+1.625rem)] pb-16 sm:px-6 lg:max-w-[1120px]">
      <Link
        to="/"
        className="no-print inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-4" aria-hidden />
        {ui("allTrips")}
      </Link>

      <header className="mt-2">
        <p className="flex items-center gap-1.5 text-xs font-bold tracking-wide text-primary uppercase">
          <Heart className="size-3.5 fill-current" aria-hidden />
          {formatDateSpan(tripStart(trip), tripEnd(trip), lang)}
        </p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
          {tx(trip.title)}
        </h1>
        <p className="mt-2 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {tx(trip.subtitle)}
        </p>
        <p className="mt-3.5 flex flex-wrap gap-2">
          <TripBadge trip={trip} today={today} emphasis />
          <Badge variant="secondary">
            {dayCount(tripDayCount(trip), lang)} · {placeList(tripPlaces(trip), lang)}
          </Badge>
        </p>
      </header>

      {/*
        On a phone the map comes first, then the days. On a wide screen the
        map sits beside the days, on the right, and stays in view while they
        scroll past, so a hop picked from between them shows without leaving
        its place; it comes first in the page so that it is first when the two
        stack. Should the window be too short for all of it, it scrolls on its own.
      */}
      <div className="mt-8 flex flex-col gap-10 lg:flex-row-reverse lg:items-start">
        <TripMap
          trip={trip}
          selected={mapKey}
          onSelect={pick}
          className="scroll-mt-[calc(var(--header-height)+1rem)] lg:sticky lg:top-[calc(var(--header-height)+1rem)] lg:max-h-[calc(100dvh-var(--header-height)-2rem)] lg:w-[400px] lg:shrink-0 lg:overflow-y-auto xl:w-[440px]"
        />

        <div className="min-w-0 flex-1">
          {isPlanned(trip) ? (
            <TripTimeline
              trip={trip}
              legs={legs}
              mapKey={mapKey}
              onShowOnMap={
                MAPS_ENABLED
                  ? (key) => {
                      pick(key)
                      revealMap(TRIP_MAP_ID)
                    }
                  : undefined
              }
            />
          ) : (
            <NotPlanned />
          )}
        </div>
      </div>
    </div>
  )
}

/** Where the days will go once the trip is planned. */
function NotPlanned() {
  const { ui } = useLang()
  return (
    <div className="rounded-2xl border border-dashed border-primary/40 bg-card/60 p-5">
      <p className="flex items-center gap-2 text-title font-extrabold tracking-tight">
        <NotebookPen className="size-5 shrink-0 text-primary" aria-hidden />
        {ui("notPlannedYet")}
      </p>
      <p className="mt-2 text-base leading-relaxed text-muted-foreground">
        {ui("notPlannedBody")}
      </p>
    </div>
  )
}
