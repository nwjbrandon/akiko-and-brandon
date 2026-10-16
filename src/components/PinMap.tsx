import {
  lazy,
  Suspense,
  useEffect,
  useEffectEvent,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type ReactNode,
  type Ref,
  type RefObject,
} from "react"
import { createPortal } from "react-dom"
import type { Map as LeafletMap, Marker as LeafletMarker } from "leaflet"
import { Maximize2, X } from "lucide-react"
import type { Coordinates } from "@/data/places"
import { useLang } from "@/i18n/LanguageProvider"
import { cn } from "@/lib/utils"

/** Leaflet is most of a map's weight, so it loads when a page first shows one. */
const PinCanvas = lazy(() => import("./PinCanvas"))

export interface MapPin {
  key: string
  at: Coordinates
  /** Its place in the order the day or trip reaches it, on the pin. */
  number: number
  /** Names the place, for screen readers and on hover. */
  title: string
  /** Named beside the pin all the time, for a map with few enough pins to name them all. */
  label?: string
  /** What the pin opens when picked. */
  popup: ReactNode
}

/** What a page can ask of its map. */
export interface PinMapHandle {
  /** Bring a pin into view and open it. */
  show: (key: string) => void
}

/**
 * A map with a numbered pin for each place, framed to fit them all, and a
 * button that opens it over the whole screen. On a phone one finger scrolls
 * the page past it and two move the map; opened up, it takes both. It needs
 * the network, so it stays off paper, and out of the page with no pins.
 */
export function PinMap({
  ref,
  id,
  heading,
  count,
  pins,
  maxZoom,
  className,
}: {
  ref?: Ref<PinMapHandle>
  /** For the page to scroll to, when it asks for a pin from elsewhere. */
  id?: string
  heading: string
  /** "5 places", beside the heading. */
  count: string
  pins: MapPin[]
  /** How close the map comes in on one pin, or on pins close together. */
  maxZoom: number
  className?: string
}) {
  const { ui } = useLang()
  const headingId = useId()
  const [map, setMap] = useState<LeafletMap | null>(null)
  const markers = useRef(new Map<string, LeafletMarker>())
  const expandButton = useRef<HTMLButtonElement>(null)
  const [expanded, setExpanded] = useState(false)

  useImperativeHandle(
    ref,
    () => ({
      show(key) {
        const marker = markers.current.get(key)
        if (!map || !marker) return
        map.setView(marker.getLatLng(), Math.max(map.getZoom(), maxZoom), { animate: false })
        marker.openPopup()
      },
    }),
    [map, maxZoom],
  )

  if (pins.length === 0) return null

  return (
    <section id={id} aria-labelledby={headingId} className={cn("no-print", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <h2 id={headingId} className="text-title font-extrabold tracking-tight">
          {heading}
        </h2>
        <p className="text-sm font-semibold text-muted-foreground">{count}</p>
      </div>

      {/* Isolated, so Leaflet's layers stack inside the map rather than over the page's header. */}
      <div className="relative isolate mt-3 aspect-4/3 overflow-hidden rounded-2xl border border-border bg-card shadow-sm lg:aspect-square">
        <Suspense>
          <PinCanvas pins={pins} maxZoom={maxZoom} mapRef={setMap} markers={markers} />
        </Suspense>
        <button
          ref={expandButton}
          type="button"
          onClick={() => setExpanded(true)}
          aria-label={ui("expandMap")}
          title={ui("expandMap")}
          className="absolute top-2.5 right-2.5 z-[1000] grid size-11 place-items-center rounded-xl border border-border bg-card text-foreground shadow-md transition-colors hover:text-primary"
        >
          <Maximize2 className="size-5" aria-hidden />
        </button>
      </div>

      {expanded ? (
        <ExpandedMap
          heading={heading}
          count={count}
          pins={pins}
          maxZoom={maxZoom}
          returnFocus={expandButton}
          onClose={() => setExpanded(false)}
        />
      ) : null}
    </section>
  )
}

/**
 * The map over the whole screen, as a dialog: the page behind it neither
 * scrolls nor takes focus, and Escape or the close button puts it back.
 */
function ExpandedMap({
  heading,
  count,
  pins,
  maxZoom,
  returnFocus,
  onClose,
}: {
  heading: string
  count: string
  pins: MapPin[]
  maxZoom: number
  returnFocus: RefObject<HTMLElement | null>
  onClose: () => void
}) {
  const { ui } = useLang()
  const headingId = useId()
  const closeButton = useRef<HTMLButtonElement>(null)
  const close = useEffectEvent(onClose)

  useEffect(() => {
    const page = document.getElementById("root")
    const html = document.documentElement
    const overflow = html.style.overflow
    html.style.overflow = "hidden"
    if (page) page.inert = true
    closeButton.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close()
    }
    window.addEventListener("keydown", onKeyDown)
    const button = returnFocus.current
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      html.style.overflow = overflow
      if (page) page.inert = false
      button?.focus()
    }
  }, [returnFocus])

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
      className="no-print fixed inset-0 z-[100] flex flex-col bg-background"
    >
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 sm:px-6">
        <div className="min-w-0">
          <h2 id={headingId} className="text-title font-extrabold tracking-tight">
            {heading}
          </h2>
          <p className="text-sm font-semibold text-muted-foreground">{count}</p>
        </div>
        <button
          ref={closeButton}
          type="button"
          onClick={onClose}
          className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-4 text-sm font-bold transition-colors hover:border-primary/60 hover:text-primary"
        >
          <X className="size-4" aria-hidden />
          {ui("closeMap")}
        </button>
      </div>
      <div className="relative isolate min-h-0 flex-1">
        <Suspense>
          <PinCanvas pins={pins} maxZoom={maxZoom} expanded />
        </Suspense>
      </div>
    </div>,
    document.body,
  )
}
