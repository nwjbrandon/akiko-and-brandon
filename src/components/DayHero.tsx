import { useRef } from "react"
import type { Day } from "@/data/types"
import { dayIndex, getCity } from "@/data/itinerary"
import { useParallax } from "@/hooks/useParallax"
import { useTheme } from "@/hooks/useTheme"
import { dayLabel } from "@/i18n/strings"
import { useLang } from "@/i18n/LanguageProvider"
import { dayBounds } from "@/lib/blocks"
import { formatFullDate } from "@/lib/date"
import { cn } from "@/lib/utils"
import { HeroScene } from "./HeroScene"
import { WeatherLine } from "./WeatherLine"

export function DayHero({ day, className }: { day: Day; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const offset = useParallax(ref, { factor: 0.3, maxOffset: 100 })
  const { lang, ui, tx } = useLang()
  const { theme } = useTheme()
  const city = getCity(day.cityId)
  const { start, end } = dayBounds(day.blocks)
  // The scene is a silhouette: against the pale light-mode sunset it needs to
  // sit back further than it does against the dark one.
  const sceneOpacity = (theme === "light" ? 0.62 : 0.85) - (offset / 100) * 0.4

  return (
    // Break out of the page column so the sunset runs edge to edge.
    <div className={cn("relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2", className)}>
      <div
        ref={ref}
        className="day-hero-gradient relative min-h-[620px] overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-x-0 top-[400px] z-1 mx-auto w-full max-w-3xl overflow-hidden">
          <HeroScene
            className="relative left-1/2 h-auto max-w-none will-change-transform"
            style={{
              width: 744,
              transform: `translate3d(-50%, ${offset}px, 0)`,
              opacity: sceneOpacity,
            }}
          />
        </div>

        <div className="relative z-10 mx-auto flex max-w-[480px] flex-col items-center px-4 pt-[calc(var(--header-height)+var(--selector-height)+1.5rem+2rem)] pb-6 sm:px-6">
          <p className="text-xs font-bold tracking-wide text-iris">
            {dayLabel(dayIndex(day.date), lang)} · {tx(day.title)}
          </p>
          <h1 className="mt-1 text-center text-2xl font-bold tracking-tight text-black sm:text-3xl dark:text-white">
            {formatFullDate(day.date, lang)}
          </h1>

          <div className="no-print mt-3">
            {city ? (
              <WeatherLine lat={city.lat} lon={city.lon} date={day.date} />
            ) : (
              <p className="text-xs font-medium text-black/50 dark:text-white/50">
                {ui("forecastUnavailable")}
              </p>
            )}
          </div>

          <p className="mt-4 max-w-sm text-center text-base leading-relaxed text-black dark:text-white">
            {tx(day.summary)}
          </p>

          <dl className="mt-8 grid w-full max-w-sm grid-cols-3 gap-2 text-center">
            <Stat label={ui("plans")} value={String(day.blocks.length)} />
            <Stat label={ui("start")} value={start} />
            <Stat label={ui("end")} value={end ?? "—"} />
          </dl>
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] font-normal tracking-[0.12em] text-black/80 uppercase dark:text-white/80">
        {label}
      </dt>
      <dd className="mt-1 text-xl font-bold tabular-nums text-black dark:text-white">
        {value}
      </dd>
    </div>
  )
}
