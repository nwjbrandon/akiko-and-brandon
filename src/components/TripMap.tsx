import { MapPin, TrainFront } from "lucide-react"
import { mapsSearch } from "@/data/trips/shared"
import type { Trip } from "@/data/types"
import { useLang } from "@/i18n/LanguageProvider"
import { journeyCount, placeCount } from "@/i18n/strings"
import { blockDuration, blockIcon, blockTimeRange } from "@/lib/blocks"
import { formatDayDate } from "@/lib/date"
import { cityPlace, legEmbed, legLink, placeEmbed, tripCities, tripLegs } from "@/lib/maps"
import { MapPicker, type MapChoice } from "./MapPicker"

/** What the trip's map answers to, for a hop on the trip's timeline to bring it into view. */
export const TRIP_MAP_ID = "trip-map"

/**
 * The trip on a map, one hop between its cities at a time. A hop whose journey
 * the days mark gives its date and time, and is routed the way that journey
 * goes; the rest go by train. A trip that stays in one city shows that city.
 * Each hop is keyed by its place in `tripLegs`, as a string, which is how the
 * trip's timeline asks for one.
 */
export function TripMap({
  trip,
  selected,
  onSelect,
  className,
}: {
  trip: Trip
  selected: string | undefined
  onSelect: (key: string) => void
  className?: string
}) {
  const { lang, ui, tx } = useLang()
  const legs = tripLegs(trip)

  const choices: MapChoice[] =
    legs.length > 0
      ? legs.map(({ from, to, leg, journey }, index) => ({
          key: String(index),
          icon: journey ? blockIcon(journey.block) : TrainFront,
          title: `${tx(from.name)} → ${tx(to.name)}`,
          when: journey
            ? `${formatDayDate(journey.day.date, lang, "short")} · ${blockTimeRange(journey.block, lang)}`
            : undefined,
          duration: journey ? (blockDuration(journey.block, lang) ?? undefined) : undefined,
          detail: journey?.block.note ? tx(journey.block.note) : undefined,
          embed: legEmbed(leg, lang),
          href: legLink(leg),
        }))
      : tripCities(trip).map((city) => ({
          key: city.id,
          icon: MapPin,
          title: tx(city.name),
          embed: placeEmbed(cityPlace(city), lang),
          href: mapsSearch(cityPlace(city)),
        }))

  return (
    <MapPicker
      id={TRIP_MAP_ID}
      heading={ui("tripMap")}
      count={legs.length > 0 ? journeyCount(legs.length, lang) : placeCount(choices.length, lang)}
      choices={choices}
      selected={selected}
      onSelect={onSelect}
      className={className}
    />
  )
}
