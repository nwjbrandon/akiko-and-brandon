import { useState } from "react"
import type { Day } from "@/data/types"
import { useNow } from "@/hooks/useNow"
import { timelineStatuses } from "@/lib/blocks"
import { cn } from "@/lib/utils"
import { BlockSheet } from "./BlockSheet"
import { TimelineItem } from "./TimelineItem"

export function DayTimeline({ day, className }: { day: Day; className?: string }) {
  const { today, minutes } = useNow()
  const [selected, setSelected] = useState<number | null>(null)
  const statuses = timelineStatuses(day.blocks, day.date, today, minutes)

  return (
    <section className={cn("mx-auto w-full max-w-[400px]", className)}>
      <ol className="list-none p-0">
        {day.blocks.map((block, index) => (
          <TimelineItem
            key={`${day.date}-${index}-${block.type}`}
            block={block}
            status={statuses[index]}
            isFirst={index === 0}
            isLast={index === day.blocks.length - 1}
            onSelect={() => setSelected(index)}
          />
        ))}
      </ol>
      <BlockSheet
        block={selected == null ? null : day.blocks[selected]}
        onClose={() => setSelected(null)}
      />
    </section>
  )
}
