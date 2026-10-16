import type { Embed } from "@/lib/maps"
import { cn } from "@/lib/utils"

/**
 * Google pins a box to the embed's top-left corner, the route's two ends or an
 * "Open in Maps" button, and offers no way to turn it off. The frame runs this
 * much taller than its window, anchored at the bottom, so the box sits above
 * the window while Google's logo and terms along the bottom stay in view.
 */
const HIDE_TOP_BOX: Record<Embed["mode"], string> = {
  directions: "h-[calc(100%+100px)]",
  place: "h-[calc(100%+52px)]",
}

/**
 * An embedded Google Map. It needs the network and an API key, so it stays
 * off paper, and out of the page entirely when there is no embed to show.
 */
export function MapEmbed({
  embed,
  title,
  className,
}: {
  embed: Embed | undefined
  /** Names the map for screen readers. */
  title: string
  className?: string
}) {
  if (!embed) return null

  return (
    <div
      className={cn(
        "no-print relative aspect-4/3 overflow-hidden rounded-2xl border border-border bg-card shadow-sm",
        className,
      )}
    >
      <iframe
        src={embed.src}
        title={title}
        loading="lazy"
        // The key is restricted to this site, which Google checks by referrer.
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className={cn("absolute inset-x-0 bottom-0 w-full border-0", HIDE_TOP_BOX[embed.mode])}
      />
    </div>
  )
}
