import { ChevronRight, MapPin } from "lucide-react"
import { cva } from "class-variance-authority"
import type { Block } from "@/data/types"
import {
  blockDuration,
  blockIcon,
  blockTimeRange,
  blockTypeLabel,
  type TimelineStatus,
} from "@/lib/blocks"
import { useLang } from "@/i18n/LanguageProvider"
import { cn } from "@/lib/utils"
import { Badge } from "./Badge"
import { TimelineRail } from "./TimelineRail"

const card = cva(
  "relative -ml-3 mr-1 mb-8 w-full min-w-0 flex-1 cursor-pointer rounded-2xl border px-3 py-4 text-left shadow-lg backdrop-blur-xl transition-[box-shadow,transform,background-color] hover:-translate-y-0.5 hover:shadow-xl sm:-ml-4 sm:mr-0 sm:px-4 sm:py-5",
  {
    variants: {
      // A quiet tint per kind of moment, so the shape of the day reads at a glance.
      variant: {
        commute: "border-border/70 bg-card/55",
        meal: "border-accent/40 bg-accent/12",
        activity: "border-primary/30 bg-secondary/60",
        lodging: "border-primary/35 bg-primary/12",
        meeting: "border-primary/50 bg-primary/15",
        logistics: "border-border/60 bg-card/45",
      },
      active: { true: "", false: "" },
    },
    compoundVariants: [
      {
        active: true,
        class: "border-primary/60 bg-card shadow-xl ring-1 ring-primary/25",
      },
    ],
    defaultVariants: { variant: "activity", active: false },
  },
)

export function TimelineItem({
  block,
  status,
  isFirst,
  isLast,
  onSelect,
  pin,
  onShowOnMap,
}: {
  block: Block
  status: TimelineStatus
  isFirst: boolean
  isLast: boolean
  onSelect: () => void
  /** The number of its pin on the day's map, for a plan the map shows. */
  pin?: number
  /** Opens its pin on the day's map; unset for anything the map cannot show. */
  onShowOnMap?: () => void
}) {
  const { lang, ui, tx } = useLang()
  const Icon = blockIcon(block)
  const duration = blockDuration(block, lang)
  const isCurrent = status === "current"
  const locationHref = block.map ?? block.link

  return (
    <li className="relative flex gap-4">
      {/* On a wide screen the times run down a column of their own, left of the rail. */}
      <p className="hidden w-13 shrink-0 pt-[1.375rem] text-right text-base font-extrabold tabular-nums lg:block">
        {block.start}
        {block.end ? (
          <span className="block text-sm font-medium text-muted-foreground">{block.end}</span>
        ) : null}
      </p>

      <TimelineRail status={status} isFirst={isFirst} isLast={isLast} />

      <div
        role="button"
        tabIndex={0}
        onClick={onSelect}
        onKeyDown={(event) => {
          // Keys pressed on the links and buttons inside are theirs.
          if (event.target !== event.currentTarget) return
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            onSelect()
          }
        }}
        className={cn(card({ variant: block.type, active: isCurrent }))}
      >
        {/* The time and the kind of moment share the top line; the title gets the full width under them. */}
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-3 gap-y-1">
          <p className="col-start-1 row-start-1 text-base font-semibold tabular-nums text-muted-foreground lg:hidden">
            {blockTimeRange(block, lang)}
            {duration ? <span className="font-normal opacity-70"> · {duration}</span> : null}
          </p>
          <Badge
            variant={isCurrent ? "secondary" : "muted"}
            className="col-start-2 row-start-1 shrink-0 gap-1.5 justify-self-end capitalize"
          >
            <Icon className="size-3.5 shrink-0" aria-hidden />
            {blockTypeLabel(block, lang)}
          </Badge>
          <h3 className="col-span-2 row-start-2 text-xl leading-snug font-bold sm:text-2xl lg:col-span-1 lg:col-start-1 lg:row-start-1 lg:text-xl">
            {tx(block.title)}
            {duration ? (
              <span className="hidden text-sm font-medium text-muted-foreground lg:inline">
                {" "}
                · {duration}
              </span>
            ) : null}
          </h3>
        </div>

        <div className="mt-1 flex items-end gap-2">
          <div className="min-w-0 flex-1 space-y-0.5">
            {block.note ? (
              <p className="text-sm leading-snug text-muted-foreground">{tx(block.note)}</p>
            ) : null}
            {block.location ? (
              <p className="text-base leading-relaxed text-muted-foreground">
                {locationHref ? (
                  <a
                    href={locationHref}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="inline-flex items-start gap-1.5 underline-offset-4 hover:text-primary hover:underline"
                  >
                    <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    <span>{tx(block.location)}</span>
                  </a>
                ) : (
                  <span className="inline-flex items-start gap-1.5">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    <span>{tx(block.location)}</span>
                  </span>
                )}
              </p>
            ) : null}
            {pin && onShowOnMap ? (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  onShowOnMap()
                }}
                className="no-print mt-2 inline-flex min-h-9 items-center gap-2 rounded-full border border-border bg-card py-1 pr-3 pl-1 text-sm font-bold text-primary transition-colors hover:border-primary/60"
              >
                {/* The pin's number, as the map shows it. */}
                <span className="grid size-7 place-items-center rounded-full bg-primary text-xs font-extrabold tabular-nums text-primary-foreground">
                  {pin}
                </span>
                {ui("showOnMap")}
              </button>
            ) : null}
          </div>
          <ChevronRight className="no-print size-5 shrink-0 text-primary" aria-hidden />
        </div>
      </div>
    </li>
  )
}
