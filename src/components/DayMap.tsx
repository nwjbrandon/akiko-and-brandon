import { MapPin } from "lucide-react"
import { mapsSearch } from "@/data/trips/shared"
import type { Day } from "@/data/types"
import { useLang } from "@/i18n/LanguageProvider"
import { journeyCount, placeCount } from "@/i18n/strings"
import { blockDuration, blockIcon, blockTimeRange } from "@/lib/blocks"
import { dayJourneys, dayPlaces, legEmbed, legLink, placeEmbed } from "@/lib/maps"
import { MapPicker, type MapChoice } from "./MapPicker"

/** What the day's map answers to, for a journey on the timeline to bring it into view. */
export const DAY_MAP_ID = "day-map"

/**
 * The day on a map, one journey at a time, each routed the way we make it. A
 * day without journeys, spent in one neighbourhood, shows its places instead.
 * Each choice is keyed by its block's start, which is how the timeline asks
 * for one.
 */
export function DayMap({
  day,
  selected,
  onSelect,
  className,
}: {
  day: Day
  selected: string | undefined
  onSelect: (key: string) => void
  className?: string
}) {
  const { lang, ui, tx } = useLang()
  const journeys = dayJourneys(day)

  const choices: MapChoice[] =
    journeys.length > 0
      ? journeys.map(({ block, leg }) => {
          const title = tx(block.title)
          const stops = block.note ? tx(block.note) : undefined
          return {
            key: block.start,
            icon: blockIcon(block),
            title,
            when: blockTimeRange(block, lang),
            duration: blockDuration(block, lang) ?? undefined,
            // The stops on the way, unless they only say again where it starts and ends.
            detail: stops === title ? undefined : stops,
            embed: legEmbed(leg, lang),
            href: legLink(leg),
          }
        })
      : dayPlaces(day).map(({ block, place }) => ({
          key: block.start,
          icon: MapPin,
          title: tx(block.location ?? block.title),
          when: blockTimeRange(block, lang),
          embed: placeEmbed(place, lang),
          href: block.map ?? mapsSearch(place),
        }))

  return (
    <MapPicker
      id={DAY_MAP_ID}
      heading={ui("dayMap")}
      count={journeys.length > 0 ? journeyCount(journeys.length, lang) : placeCount(choices.length, lang)}
      choices={choices}
      selected={selected}
      onSelect={onSelect}
      className={className}
    />
  )
}
