import { useState } from "react"
import { getCity } from "@/data/cities"
import type { Day } from "@/data/types"
import { useNow } from "@/hooks/useNow"
import { timelineStatuses } from "@/lib/blocks"
import { cn } from "@/lib/utils"
import { BlockSheet } from "./BlockSheet"
import { TimelineItem } from "./TimelineItem"

export function DayTimeline({
  day,
  mapKeys,
  mapKey,
  onShowOnMap,
  className,
}: {
  day: Day
  /** The start times of the journeys the day's map can show, which are their keys on it. */
  mapKeys?: string[]
  /** The journey the map is showing. */
  mapKey?: string
  onShowOnMap?: (key: string) => void
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
          const onMap = onShowOnMap && mapKeys?.includes(block.start)
          return (
            <TimelineItem
              key={`${day.date}-${index}-${block.type}`}
              block={block}
              status={statuses[index]}
              isFirst={index === 0}
              isLast={index === day.blocks.length - 1}
              onSelect={() => setSelected(index)}
              onMap={onMap ? block.start === mapKey : undefined}
              onShowOnMap={onMap ? () => onShowOnMap(block.start) : undefined}
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
