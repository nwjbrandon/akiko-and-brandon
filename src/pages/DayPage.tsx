import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { DAYS, TRIP, dayIndex, getDay } from "@/data/itinerary"
import { DayHero } from "@/components/DayHero"
import { DaySelector } from "@/components/DaySelector"
import { DayTimeline } from "@/components/DayTimeline"
import { useLang } from "@/i18n/LanguageProvider"
import { dayLabel } from "@/i18n/strings"

const NAV_LINK =
  "inline-flex items-center justify-center rounded-full border border-border px-4 py-2.5 text-sm font-bold transition-colors hover:border-primary/60 hover:text-primary"

export function DayPage() {
  const { date = "" } = useParams()
  const { lang, ui, tx } = useLang()
  const day = getDay(date)
  const index = dayIndex(date)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [date])

  useEffect(() => {
    const trip = TRIP.title[lang]
    document.title = day ? `${dayLabel(index, lang)} · ${trip}` : trip
  }, [day, index, lang])

  if (!day) {
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
          to={`/itinerary/${DAYS[0].date}`}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-base font-bold text-primary-foreground transition-opacity hover:opacity-90"
        >
          {ui("backToItinerary")}
        </Link>
      </div>
    )
  }

  const previous = index > 0 ? DAYS[index - 1] : undefined
  const next = index < DAYS.length - 1 ? DAYS[index + 1] : undefined

  return (
    <div className="relative flex flex-col">
      <div className="h-(--header-height) shrink-0" aria-hidden />

      <div className="no-print sticky top-(--header-height) z-40 mx-auto w-full max-w-[480px] px-4 sm:px-6">
        <DaySelector activeDate={day.date} className="w-full" />
      </div>

      {/* Pull the hero up so the sunset sits behind the header and day selector. */}
      <div className="relative -mt-[calc(var(--header-height)+var(--selector-height))] space-y-6">
        <DayHero day={day} />
        {/* Keyed by date so an open detail sheet never carries over to another day. */}
        <DayTimeline key={day.date} day={day} />

        <nav className="no-print mx-auto flex w-full max-w-[400px] flex-wrap items-center justify-between gap-3 px-4 pb-16 sm:px-0">
          {previous ? (
            <Link to={`/itinerary/${previous.date}`} className={NAV_LINK}>
              ← {tx(previous.title)}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link to={`/itinerary/${next.date}`} className={NAV_LINK}>
              {tx(next.title)} →
            </Link>
          ) : null}
        </nav>
      </div>
    </div>
  )
}
