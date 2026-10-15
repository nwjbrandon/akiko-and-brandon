import type { Localized } from "@/i18n/types"

// Labels and places that more than one trip uses.

export const SIGHTSEEING: Localized = { en: "Sightseeing", ja: "観光" }
export const LUNCH: Localized = { en: "Lunch", ja: "昼食" }
export const DINNER: Localized = { en: "Dinner", ja: "夕食" }
export const CHECK_OUT: Localized = { en: "Check-out", ja: "チェックアウト" }

/** Where every trip starts: the Doutor Coffee at Yokohama Station. */
export const MEET_AT_DOUTOR = {
  title: { en: "Meet at Doutor Coffee", ja: "ドトールコーヒーで待ち合わせ" },
  location: { en: "Yokohama Station", ja: "横浜駅" },
  map: "https://maps.app.goo.gl/moK2cCDyWn3SPAW87",
} satisfies { title: Localized; location: Localized; map: string }

/**
 * A Google Maps link that searches for a place. Short maps.app.goo.gl links
 * can only be made from the Maps app; this form needs no app and no API key.
 */
export function mapsSearch(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}
