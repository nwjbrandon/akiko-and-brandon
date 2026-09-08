/**
 * Rough bounding box for Japan, from Yonaguni in the south-west to the
 * northern tip of Hokkaido and the Ogasawara islands in the east.
 */
const JAPAN_BOUNDS = { minLat: 24, maxLat: 46, minLon: 122, maxLon: 154 }

export function isInJapan(lat: number, lon: number) {
  return (
    lat >= JAPAN_BOUNDS.minLat &&
    lat <= JAPAN_BOUNDS.maxLat &&
    lon >= JAPAN_BOUNDS.minLon &&
    lon <= JAPAN_BOUNDS.maxLon
  )
}

/** A free, prompt-free hint at where the visitor is. */
export function timeZoneSuggestsJapan() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone === "Asia/Tokyo"
  } catch {
    return false
  }
}

/**
 * Ask the device where it is. Resolves to null whenever the answer cannot be
 * had — permission denied, no geolocation, or a timeout — so callers can keep
 * whatever language they already settled on.
 */
export function locateInJapan(): Promise<boolean | null> {
  if (!("geolocation" in navigator)) return Promise.resolve(null)

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve(isInJapan(coords.latitude, coords.longitude)),
      () => resolve(null),
      { timeout: 8000, maximumAge: 10 * 60 * 1000 },
    )
  })
}
