import { useId } from "react"
import { ExternalLink, type LucideIcon } from "lucide-react"
import { useLang } from "@/i18n/LanguageProvider"
import type { Embed } from "@/lib/maps"
import { cn } from "@/lib/utils"
import { MapEmbed } from "./MapEmbed"

export interface MapChoice {
  key: string
  icon: LucideIcon
  /** The journey or place, heading its row; it also names the map for screen readers. */
  title: string
  /** When, above the title: "09:35 – 11:17". */
  when?: string
  /** How long, at the end of the row: "1h 42m". */
  duration?: string
  /** The stops on the way, shown under the title while the choice is on the map. */
  detail?: string
  embed: Embed | undefined
  /** The journey or place in Google Maps itself. */
  href: string
}

const ROW = "flex min-h-16 items-start gap-3 border-t border-border/70 px-4 py-3"

/**
 * One embedded map with a list under it of the journeys or places it can show.
 * Google can only route one journey at a time, so this is how a day or a trip
 * with several fits on a map. The page holds which one is showing, so other
 * parts of it can ask for one; with none asked for it shows the first. With a
 * single choice the list is a caption rather than buttons.
 */
export function MapPicker({
  id,
  heading,
  count,
  choices,
  selected,
  onSelect,
  className,
}: {
  /** For the page to scroll to, when it asks for a journey from elsewhere. */
  id?: string
  heading: string
  /** "3 journeys", beside the heading. */
  count: string
  choices: MapChoice[]
  /** The key of the choice on the map. */
  selected: string | undefined
  onSelect: (key: string) => void
  className?: string
}) {
  const { ui } = useLang()
  const headingId = useId()
  const choice = choices.find((option) => option.key === selected) ?? choices[0]
  if (!choice?.embed) return null

  return (
    <section id={id} aria-labelledby={headingId} className={cn("no-print", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <h2 id={headingId} className="text-title font-extrabold tracking-tight">
          {heading}
        </h2>
        <p className="text-sm font-semibold text-muted-foreground">{count}</p>
      </div>

      <div className="mt-3 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <MapEmbed
          embed={choice.embed}
          title={choice.title}
          className="rounded-none border-0 shadow-none"
        />
        {choices.length > 1 ? (
          <div role="group" aria-label={heading}>
            {choices.map((option) => (
              <button
                key={option.key}
                type="button"
                aria-pressed={option === choice}
                onClick={() => onSelect(option.key)}
                className={cn(
                  ROW,
                  "w-full text-left transition-colors",
                  option === choice ? "bg-secondary" : "hover:bg-muted/60",
                )}
              >
                <ChoiceRow choice={option} active={option === choice} />
              </button>
            ))}
          </div>
        ) : (
          <div className={ROW}>
            <ChoiceRow choice={choice} active />
          </div>
        )}
        <a
          href={choice.href}
          target="_blank"
          rel="noreferrer"
          className="flex min-h-12 items-center justify-center gap-1.5 border-t border-border/70 px-4 text-sm font-bold text-primary transition-colors hover:bg-muted/60"
        >
          {ui("openMap")}
          <ExternalLink className="size-4" aria-hidden />
        </a>
      </div>
    </section>
  )
}

function ChoiceRow({ choice, active }: { choice: MapChoice; active: boolean }) {
  return (
    <>
      <span
        className={cn(
          "grid size-9 shrink-0 place-items-center rounded-full",
          active ? "bg-primary text-primary-foreground" : "bg-muted text-primary",
        )}
      >
        <choice.icon className="size-4.5" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        {choice.when ? (
          <span className="block text-sm font-semibold tabular-nums text-muted-foreground">
            {choice.when}
          </span>
        ) : null}
        <span className="mt-0.5 block text-base leading-snug font-bold">{choice.title}</span>
        {active && choice.detail ? (
          <span className="mt-1 block text-sm leading-snug text-muted-foreground">
            {choice.detail}
          </span>
        ) : null}
      </span>
      {choice.duration ? (
        <span className="shrink-0 pt-0.5 text-sm font-bold tabular-nums text-primary">
          {choice.duration}
        </span>
      ) : null}
    </>
  )
}
