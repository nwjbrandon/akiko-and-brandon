import type { Ref } from "react"
import { ExternalLink } from "lucide-react"
import { useLang } from "@/i18n/LanguageProvider"
import { placeCount } from "@/i18n/strings"
import type { DayPin } from "@/lib/maps"
import { PinMap, type MapPin, type PinMapHandle } from "./PinMap"

/** What the day's map answers to, for a plan on the timeline to bring it into view. */
export const DAY_MAP_ID = "day-map"

/**
 * Where the day goes: a numbered pin for each place, in the order we reach
 * it, opening on what we do there. Each pin is keyed by its place in `pins`,
 * as a string, which is how the timeline asks for one.
 */
export function DayMap({
  ref,
  pins,
  className,
}: {
  ref?: Ref<PinMapHandle>
  /** The day's places, from `dayPins`. */
  pins: DayPin[]
  className?: string
}) {
  const { lang, ui, tx } = useLang()

  const mapPins: MapPin[] = pins.map(({ at, blocks }, index) => {
    // Named for where it is, if any plan there says; otherwise for what we do there.
    const place = blocks.find((block) => block.location)?.location
    const name = tx(place ?? blocks[0].title)
    const href = blocks.find((block) => block.map)?.map
    return {
      key: String(index),
      at,
      number: index + 1,
      title: name,
      popup: (
        <div>
          <p className="pr-2 text-base leading-snug font-bold">{name}</p>
          <ul className="mt-1.5 space-y-1">
            {blocks.map((block) => (
              <li key={block.start} className="flex gap-2.5 text-sm leading-snug">
                <span className="shrink-0 font-semibold tabular-nums text-muted-foreground">
                  {block.start}
                </span>
                <span>
                  {tx(block.title)}
                  {block.location && block.location !== place ? ` · ${tx(block.location)}` : null}
                </span>
              </li>
            ))}
          </ul>
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="mt-2.5 inline-flex items-center gap-1 text-sm font-bold"
            >
              {ui("openMap")}
              <ExternalLink className="size-3.5" aria-hidden />
            </a>
          ) : null}
        </div>
      ),
    }
  })

  return (
    <PinMap
      ref={ref}
      id={DAY_MAP_ID}
      heading={ui("dayMap")}
      count={placeCount(pins.length, lang)}
      pins={mapPins}
      maxZoom={16}
      className={className}
    />
  )
}
