import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import { dayPath } from "@/data/itinerary"
import type { Trip } from "@/data/types"
import { useLang } from "@/i18n/LanguageProvider"
import { dayRangeLabel, placeCount } from "@/i18n/strings"
import { formatShortSpan } from "@/lib/date"
import { tripPins } from "@/lib/maps"
import { PinMap, type MapPin } from "./PinMap"

/**
 * Where the trip goes: a numbered pin for each city, in the order we reach
 * it, each named on the map and opening on the days we spend there.
 */
export function TripMap({ trip, className }: { trip: Trip; className?: string }) {
  const { lang, ui, tx } = useLang()
  const pins = tripPins(trip)

  const mapPins: MapPin[] = pins.map(({ city, stays }, index) => {
    const name = tx(city.name)
    return {
      key: city.id,
      at: [city.lat, city.lon],
      number: index + 1,
      title: name,
      label: name,
      popup: (
        <div>
          <p className="pr-2 text-base leading-snug font-bold">{name}</p>
          {stays.length > 0 ? (
            <ul className="mt-1 space-y-0.5">
              {stays.map((stay) => (
                <li key={stay.start}>
                  <Link
                    to={dayPath(trip, stay.start)}
                    className="inline-flex min-h-8 items-center gap-1 text-sm font-bold"
                  >
                    <span className="tabular-nums">{dayRangeLabel(stay.first, stay.last, lang)}</span>
                    <span className="font-medium text-muted-foreground">
                      · {formatShortSpan(stay.start, stay.end, lang)}
                    </span>
                    <ChevronRight className="size-3.5" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ),
    }
  })

  return (
    <PinMap
      heading={ui("tripMap")}
      count={placeCount(pins.length, lang)}
      pins={mapPins}
      maxZoom={11}
      className={className}
    />
  )
}
