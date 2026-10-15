import { Link } from "react-router-dom"
import { dayPath } from "@/data/itinerary"
import type { PlannedTrip } from "@/data/types"
import { useScrolled } from "@/hooks/useScrolled"
import { useLang } from "@/i18n/LanguageProvider"
import { formatDayOfMonth, formatWeekdayShort } from "@/lib/date"
import { cn } from "@/lib/utils"

/**
 * The sticky capsule of days that rides over the hero. It stays legible on the
 * bright top of the gradient and on the page background further down.
 */
export function DaySelector({
  trip,
  activeDate,
  className,
}: {
  trip: PlannedTrip
  activeDate: string
  className?: string
}) {
  const { lang } = useLang()
  const scrolled = useScrolled()

  return (
    <div className={cn("relative overflow-hidden rounded-full", className)}>
      <div
        className={cn(
          "day-date-pill flex justify-center overflow-x-auto rounded-full px-4 py-1.5 backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          scrolled && "day-date-pill-solid",
        )}
      >
        {trip.days.map((day) => {
          const isActive = day.date === activeDate
          return (
            <Link
              key={day.date}
              to={dayPath(trip, day.date)}
              aria-current={isActive ? "date" : undefined}
              className={cn(
                "flex min-h-12 min-w-11 flex-col items-center justify-center px-2.5 py-1.5 text-center transition-colors",
                isActive
                  ? "rounded bg-hero-chip text-black shadow-sm dark:text-white"
                  : "rounded-full text-iris-muted hover:bg-white/10 hover:text-white",
              )}
            >
              <span
                className={cn(
                  "text-[10px] font-normal uppercase",
                  isActive ? "text-black/70 dark:text-white/80" : "text-current",
                )}
              >
                {formatWeekdayShort(day.date, lang)}
              </span>
              <span className="text-base font-extrabold tabular-nums">
                {formatDayOfMonth(day.date)}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
