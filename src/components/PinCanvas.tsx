import { useEffect, type Ref, type RefObject } from "react"
import L from "leaflet"
import { MapContainer, Marker, Popup, TileLayer, Tooltip, useMap } from "react-leaflet"
import type { MapPin } from "./PinMap"

/**
 * OpenStreetMap's own tiles, which need no key. They come in one style; the
 * dark theme darkens them (see index.css).
 */
const TILES = "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

/** The Leaflet map itself, filling its box: `PinMap` loads it when it first shows. */
export default function PinCanvas({
  pins,
  maxZoom,
  expanded = false,
  mapRef,
  markers,
}: {
  pins: MapPin[]
  maxZoom: number
  /** Opened over the whole screen, where the map can take every gesture. */
  expanded?: boolean
  mapRef?: Ref<L.Map>
  /** Filled with each pin's marker by its key, for the page to open one. */
  markers?: RefObject<Map<string, L.Marker>>
}) {
  const lats = pins.map((pin) => pin.at[0])
  const lngs = pins.map((pin) => pin.at[1])
  const frame = {
    south: Math.min(...lats),
    west: Math.min(...lngs),
    north: Math.max(...lats),
    east: Math.max(...lngs),
    labelled: pins.some((pin) => pin.label),
    maxZoom,
  }

  return (
    <MapContainer
      ref={mapRef}
      bounds={[
        [frame.south, frame.west],
        [frame.north, frame.east],
      ]}
      boundsOptions={fitOptions(frame.labelled, maxZoom)}
      scrollWheelZoom={expanded}
      dragging={expanded || !L.Browser.mobile}
      className="absolute inset-0"
    >
      <TileLayer url={TILES} attribution={ATTRIBUTION} maxZoom={19} />
      <FitToPins {...frame} />
      {pins.map((pin) => (
        <Marker
          key={pin.key}
          position={pin.at}
          icon={pinIcon(pin.number)}
          title={pin.title}
          ref={
            markers
              ? (marker) => {
                  if (!marker) return
                  markers.current.set(pin.key, marker)
                  return () => {
                    markers.current.delete(pin.key)
                  }
                }
              : undefined
          }
        >
          {pin.label ? (
            <Tooltip permanent direction="right" className="map-label">
              {pin.label}
            </Tooltip>
          ) : null}
          {/* Panned clear of the zoom and expand buttons along the top. */}
          <Popup minWidth={180} maxWidth={280} autoPanPaddingTopLeft={[12, 64]}>
            {pin.popup}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

interface Frame {
  south: number
  west: number
  north: number
  east: number
  labelled: boolean
  maxZoom: number
}

/**
 * Room around the pins: a pin stands above its spot, and a name sits to its
 * right. `labelled` says whether the pins carry names.
 */
function fitOptions(labelled: boolean, maxZoom: number): L.FitBoundsOptions {
  return {
    paddingTopLeft: [28, 56],
    paddingBottomRight: [labelled ? 120 : 28, 24],
    maxZoom,
    animate: false,
  }
}

/** Frames the pins again when they change, as when the page moves on to another day. */
function FitToPins({ south, west, north, east, labelled, maxZoom }: Frame) {
  const map = useMap()
  useEffect(() => {
    map.fitBounds(
      [
        [south, west],
        [north, east],
      ],
      fitOptions(labelled, maxZoom),
    )
  }, [map, south, west, north, east, labelled, maxZoom])
  return null
}

const icons = new Map<number, L.DivIcon>()

/** A numbered pin, its tip on the spot. Each number's icon is made once and shared. */
function pinIcon(number: number) {
  let icon = icons.get(number)
  if (!icon) {
    icon = L.divIcon({
      className: "map-pin",
      html: `<svg viewBox="0 0 30 40" aria-hidden="true"><path d="M15 1.5C7.5 1.5 1.5 7.5 1.5 15c0 9.8 13.5 23.5 13.5 23.5S28.5 24.8 28.5 15C28.5 7.5 22.5 1.5 15 1.5z"/></svg><span>${number}</span>`,
      iconSize: [30, 40],
      iconAnchor: [15, 39],
      popupAnchor: [0, -36],
      tooltipAnchor: [12, -24],
    })
    icons.set(number, icon)
  }
  return icon
}
