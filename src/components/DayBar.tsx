import type { Block } from "@/data/types"
import { useLang } from "@/i18n/LanguageProvider"
import type { UiKey } from "@/i18n/strings"
import { dayShape, type ShapeKind } from "@/lib/blocks"
import { cn } from "@/lib/utils"

/** A colour per kind of time, apart in lightness as well as hue. */
const COLOURS: Record<ShapeKind, string> = {
  travel: "bg-border",
  meal: "bg-accent",
  activity: "bg-primary",
  hotel: "bg-foreground/70",
  other: "bg-muted-foreground/50",
}

const KEY_LABELS: Record<ShapeKind, UiKey> = {
  travel: "keyTravel",
  meal: "keyMeal",
  activity: "keyActivity",
  hotel: "keyHotel",
  other: "keyOther",
}

/**
 * The shape of a day in one thin bar: each plan as long as it lasts, coloured
 * by its kind, with gaps where there is nothing planned. A last plan with no
 * end, like the night at the hotel, is a short cap; a day of nothing but one
 * such plan fills the bar.
 */
export function DayBar({
  blocks,
  label,
  className,
}: {
  blocks: Block[]
  /** What the bar says, for screen readers. */
  label: string
  className?: string
}) {
  const stretches = dayShape(blocks)
  const timed = stretches.some((stretch) => stretch.minutes)

  return (
    <div
      role="img"
      aria-label={label}
      className={cn("flex h-2 gap-0.5 overflow-hidden rounded-full", className)}
    >
      {stretches.map((stretch, index) => (
        <span
          key={index}
          className={cn(
            "min-w-0.5",
            stretch.kind === "free" ? "bg-transparent" : COLOURS[stretch.kind],
            stretch.minutes === null && timed && "w-2.5 shrink-0",
          )}
          style={
            stretch.minutes !== null
              ? { flexGrow: stretch.minutes, flexBasis: 0 }
              : timed
                ? undefined
                : { flexGrow: 1 }
          }
        />
      ))}
    </div>
  )
}

/** What the colours of the day bars stand for. */
export function DayBarKey({ className }: { className?: string }) {
  const { ui } = useLang()
  return (
    <ul
      aria-label={ui("dayBarKey")}
      className={cn(
        "flex list-none flex-wrap gap-x-3.5 gap-y-1.5 p-0 text-xs font-semibold text-muted-foreground",
        className,
      )}
    >
      {(Object.keys(COLOURS) as ShapeKind[]).map((kind) => (
        <li key={kind} className="flex items-center gap-1.5">
          <span className={cn("size-2.5 rounded-[3px]", COLOURS[kind])} aria-hidden />
          {ui(KEY_LABELS[kind])}
        </li>
      ))}
    </ul>
  )
}
