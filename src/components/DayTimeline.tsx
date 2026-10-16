import { useState } from "react"
import { getCity } from "@/data/cities"
import type { Day } from "@/data/types"
import { useNow } from "@/hooks/useNow"
import { timelineStatuses } from "@/lib/blocks"
import type { DayPin } from "@/lib/maps"
import { cn } from "@/lib/utils"
import { BlockSheet } from "./BlockSheet"
import { TimelineItem } from "./TimelineItem"

export function DayTimeline({
  day,
  pins,
  onShowOnMap,
  className,
}: {
  day: Day
  /** The pins on the day's map, from `dayPins`. */
  pins?: DayPin[]
  /** Opens a pin on the day's map, by its place in `pins`. */
  onShowOnMap?: (index: number) => void
  className?: string
}) {
  // The day runs on its own place's clock: Malaysia and Singapore are an hour behind Japan.
  const { today, minutes } = useNow(getCity(day.cityId)?.timeZone)
  const [selected, setSelected] = useState<number | null>(null)
  const statuses = timelineStatuses(day.blocks, day.date, today, minutes)

  return (
    <section className={cn("w-full", className)}>
      <ol className="list-none p-0">
        {day.blocks.map((block, index) => {
          const pin = pins?.findIndex((other) => other.blocks.includes(block)) ?? -1
          return (
            <TimelineItem
              key={`${day.date}-${index}-${block.type}`}
              block={block}
              status={statuses[index]}
              isFirst={index === 0}
              isLast={index === day.blocks.length - 1}
              onSelect={() => setSelected(index)}
              pin={pin >= 0 ? pin + 1 : undefined}
              onShowOnMap={onShowOnMap && pin >= 0 ? () => onShowOnMap(pin) : undefined}
            />
          )
        })}
      </ol>
      <BlockSheet
        block={selected == null ? null : day.blocks[selected]}
        onClose={() => setSelected(null)}
      />
    </section>
  )
}
