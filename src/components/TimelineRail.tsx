import type { TimelineStatus } from "@/lib/blocks"
import { cn } from "@/lib/utils"

const DOT: Record<TimelineStatus, string> = {
  current: "timeline-dot-current border-primary bg-primary ring-4 ring-primary/25",
  past: "border-muted-foreground/35 bg-muted-foreground/35",
  future: "border-primary/45 bg-transparent",
}

/**
 * The line and dot down the left of a timeline row. The dot sits level with
 * the first line of a card's text, so the line starts at the first dot and
 * stops at the last one.
 */
export function TimelineRail({
  status,
  isFirst,
  isLast,
  dotClassName,
}: {
  status: TimelineStatus
  isFirst: boolean
  isLast: boolean
  /** Replaces the status styling, for markers that are not themselves a moment. */
  dotClassName?: string
}) {
  return (
    <div
      className="relative -ml-2 flex w-6 shrink-0 flex-col items-center"
      aria-hidden
    >
      {isFirst && isLast ? null : (
        <span
          className={cn(
            "absolute left-1/2 w-0.5 -translate-x-1/2",
            status === "past" ? "bg-border" : "bg-primary/25",
            isFirst
              ? "top-[1.6875rem] bottom-0 sm:top-[1.9375rem]"
              : isLast
                ? "top-0 h-[1.6875rem] sm:h-[1.9375rem]"
                : "inset-y-0",
          )}
        />
      )}
      <span
        className={cn(
          "relative z-10 mt-5 size-3.5 shrink-0 rounded-full border-2 sm:mt-6",
          dotClassName ?? DOT[status],
        )}
      />
    </div>
  )
}
