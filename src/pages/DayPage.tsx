import { useEffect, useRef } from "react"
import { Link, useParams } from "react-router-dom"
import { dayPath, getTrip, isPlanned, tripPath } from "@/data/itinerary"
import { DayHero } from "@/components/DayHero"
import { DaySelector } from "@/components/DaySelector"
import { DAY_MAP_ID, DayMap } from "@/components/DayMap"
import { DayTimeline } from "@/components/DayTimeline"
import type { PinMapHandle } from "@/components/PinMap"
import { useLang } from "@/i18n/LanguageProvider"
import { dayLabel } from "@/i18n/strings"
import { dayPins, revealMap } from "@/lib/maps"

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
  const map = useRef<PinMapHandle>(null)

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

  const pins = dayPins(day)

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
          the map sits beside the timeline, on the right, and stays in view
          below the day selector while the timeline scrolls past, so a place
          picked from it shows without leaving its place; it comes first in the
          page so that it is first when the two stack. Should the window be too
          short for all of it, it scrolls on its own.
        */}
        <div className="mx-auto mt-6 flex w-full max-w-[480px] flex-col gap-9 px-4 pb-16 sm:px-6 lg:max-w-[1120px] lg:flex-row-reverse lg:items-start lg:gap-10">
          <DayMap
            ref={map}
            pins={pins}
            className="scroll-mt-[calc(var(--header-height)+var(--selector-height)+1rem)] lg:sticky lg:top-[calc(var(--header-height)+var(--selector-height)+1rem)] lg:max-h-[calc(100dvh-var(--header-height)-var(--selector-height)-2rem)] lg:w-[400px] lg:shrink-0 lg:overflow-y-auto xl:w-[440px]"
          />

          <div className="min-w-0 flex-1">
            <h2 className="text-title font-extrabold tracking-tight">{ui("theDay")}</h2>
            {/* Keyed by date so an open detail sheet never carries over to another day. */}
            <DayTimeline
              key={day.date}
              day={day}
              pins={pins}
              onShowOnMap={(index) => {
                map.current?.show(String(index))
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
