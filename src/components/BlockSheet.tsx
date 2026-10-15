import { useEffect } from "react"
import { ExternalLink, MapPin, X } from "lucide-react"
import type { Block } from "@/data/types"
import { useLang } from "@/i18n/LanguageProvider"
import { blockDuration, blockIcon, blockTimeRange, blockTypeLabel } from "@/lib/blocks"
import { cn } from "@/lib/utils"

const LINK_BUTTON =
  "inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-base font-bold transition"
const PRIMARY = "bg-primary text-primary-foreground hover:opacity-90"
const SECONDARY = "border border-border hover:border-primary/60 hover:text-primary"

/** Bottom sheet with the full detail of a single moment in the day. */
export function BlockSheet({
  block,
  onClose,
}: {
  block: Block | null
  onClose: () => void
}) {
  const { lang, ui, tx } = useLang()

  useEffect(() => {
    if (!block) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = ""
    }
  }, [block, onClose])

  if (!block) return null

  const Icon = blockIcon(block)
  const duration = blockDuration(block, lang)

  return (
    <div className="no-print fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label={ui("closeDetails")}
        onClick={onClose}
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={tx(block.title)}
        className="relative max-h-[85vh] w-full max-w-[480px] overflow-y-auto rounded-3xl border border-border bg-card p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-full bg-primary/15 text-primary">
              <Icon className="size-5" aria-hidden />
            </span>
            <span className="text-xs font-bold tracking-wide text-primary uppercase">
              {blockTypeLabel(block, lang)}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={ui("closeDetails")}
            className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>

        <h2 className="mt-4 text-2xl font-extrabold tracking-tight">
          {tx(block.title)}
        </h2>
        <p className="mt-1 text-base font-semibold tabular-nums text-muted-foreground">
          {blockTimeRange(block, lang)}
          {duration ? ` · ${duration}` : ""}
        </p>

        {block.location ? (
          <p className="mt-4 flex items-start gap-2 text-base leading-relaxed">
            <MapPin className="mt-1 size-4 shrink-0 text-primary" aria-hidden />
            <span>{tx(block.location)}</span>
          </p>
        ) : null}

        {block.note ? (
          <div className="mt-4 rounded-2xl border border-border bg-muted/40 p-4">
            <p className="text-xs font-bold tracking-wide text-muted-foreground uppercase">
              {block.type === "commute" ? ui("route") : ui("note")}
            </p>
            <p className="mt-1.5 text-base leading-relaxed">{tx(block.note)}</p>
          </div>
        ) : null}

        {block.map || block.link ? (
          <div className="mt-5 flex flex-col gap-2">
            {block.map ? (
              <a
                href={block.map}
                target="_blank"
                rel="noreferrer"
                className={cn(LINK_BUTTON, PRIMARY)}
              >
                <MapPin className="size-4" aria-hidden />
                {ui("openMap")}
              </a>
            ) : null}
            {block.link ? (
              <a
                href={block.link}
                target="_blank"
                rel="noreferrer"
                className={cn(LINK_BUTTON, block.map ? SECONDARY : PRIMARY)}
              >
                <ExternalLink className="size-4" aria-hidden />
                {ui("openReference")}
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}
