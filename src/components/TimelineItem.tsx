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
}: {
  block: Block
  status: TimelineStatus
  isFirst: boolean
  isLast: boolean
  onSelect: () => void
}) {
  const { lang, tx } = useLang()
  const Icon = blockIcon(block)
  const duration = blockDuration(block, lang)
  const isCurrent = status === "current"

  return (
    <li className="relative flex gap-4">
      {/* Rail */}
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
            isCurrent &&
              "timeline-dot-current border-primary bg-primary ring-4 ring-primary/25",
            status === "past" && "border-muted-foreground/35 bg-muted-foreground/35",
            status === "future" && "border-primary/45 bg-transparent",
          )}
        />
      </div>

      <div
        role="button"
        tabIndex={0}
        onClick={onSelect}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            onSelect()
          }
        }}
        className={cn(card({ variant: block.type, active: isCurrent }))}
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-base font-semibold tabular-nums text-muted-foreground">
                {blockTimeRange(block, lang)}
                {duration ? (
                  <span className="font-normal opacity-70"> · {duration}</span>
                ) : null}
              </p>
              <h3 className="mt-1 text-xl leading-snug font-bold sm:text-2xl">
                {tx(block.title)}
              </h3>
            </div>
            <Badge
              variant={isCurrent ? "secondary" : "muted"}
              className="shrink-0 gap-1.5 capitalize"
            >
              <Icon className="size-3.5 shrink-0" aria-hidden />
              {blockTypeLabel(block, lang)}
            </Badge>
          </div>

          <div className="flex items-end gap-2">
            <div className="min-w-0 flex-1 space-y-0.5">
              {block.note ? (
                <p className="text-sm leading-snug text-muted-foreground">
                  {tx(block.note)}
                </p>
              ) : null}
              {block.location ? (
                <p className="text-base leading-relaxed text-muted-foreground">
                  {block.link ? (
                    <a
                      href={block.link}
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
            </div>
            <ChevronRight className="no-print size-5 shrink-0 text-primary" aria-hidden />
          </div>
        </div>
      </div>
    </li>
  )
}
