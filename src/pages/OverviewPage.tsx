import { useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Heart } from "lucide-react"
import { DAYS, TRIP } from "@/data/itinerary"
import { Badge } from "@/components/Badge"
import { useLang } from "@/i18n/LanguageProvider"
import { dayLabel } from "@/i18n/strings"
import { dayBounds } from "@/lib/blocks"
import { formatFullDate, formatShortDate } from "@/lib/date"

export function OverviewPage() {
  const { lang, ui, tx } = useLang()

  useEffect(() => {
    document.title = TRIP.title[lang]
  }, [lang])

  return (
    <div className="mx-auto w-full max-w-[480px] px-4 pt-[6.5rem] pb-16 sm:px-6">
      <header>
        <p className="flex items-center gap-1.5 text-xs font-bold tracking-wide text-primary uppercase">
          <Heart className="size-3.5 fill-current" aria-hidden />
          {formatShortDate(TRIP.startDate, lang)} – {formatShortDate(TRIP.endDate, lang)}
          {" · 2026"}
        </p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
          {tx(TRIP.title)}
        </h1>
        <p className="mt-2 text-lg leading-relaxed text-muted-foreground">
          {ui("tripSubtitle")}
        </p>
      </header>

      <ul className="mt-8 list-none space-y-4 p-0">
        {DAYS.map((day, index) => {
          const { start, end } = dayBounds(day.blocks)
          return (
            <li key={day.date}>
              <Link
                to={`/itinerary/${day.date}`}
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
                  {start} – {end}
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
