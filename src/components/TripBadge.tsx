import { tripStart, tripStatus } from "@/data/itinerary"
import type { Trip } from "@/data/types"
import { useLang } from "@/i18n/LanguageProvider"
import { inDays } from "@/i18n/strings"
import { daysBetween } from "@/lib/date"
import { cn } from "@/lib/utils"
import { Badge } from "./Badge"

/**
 * Where a trip stands: underway, past, or how many days until it starts. The
 * count stands out in the accent colour when `emphasis` says it is the one to
 * look at.
 */
export function TripBadge({
  trip,
  today,
  emphasis = false,
  className,
}: {
  trip: Trip
  today: string
  emphasis?: boolean
  className?: string
}) {
  const { lang, ui } = useLang()
  const status = tripStatus(trip, today)

  if (status === "current") {
    return (
      <Badge variant="secondary" className={className}>
        {ui("underway")}
      </Badge>
    )
  }
  if (status === "past") {
    return (
      <Badge variant="muted" className={className}>
        {ui("pastTrip")}
      </Badge>
    )
  }
  const untilStart = daysBetween(today, tripStart(trip))
  return (
    <Badge variant={emphasis ? "accent" : "secondary"} className={cn("tabular-nums", className)}>
      {untilStart === 1 ? ui("startsTomorrow") : inDays(untilStart, lang)}
    </Badge>
  )
}
