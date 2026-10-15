import type { City } from "./types"

/** Where each day's weather forecast is taken from. */
export const CITIES: Record<string, City> = {
  tsuruga: {
    id: "tsuruga",
    name: { en: "Tsuruga", ja: "敦賀" },
    lat: 35.6453,
    lon: 136.0555,
  },
  fukui: {
    id: "fukui",
    name: { en: "Fukui", ja: "福井" },
    lat: 36.0641,
    lon: 136.2196,
  },
  yokohama: {
    id: "yokohama",
    name: { en: "Yokohama", ja: "横浜" },
    lat: 35.4658,
    lon: 139.6222,
  },
  disneysea: {
    id: "disneysea",
    name: { en: "Tokyo DisneySea", ja: "東京ディズニーシー" },
    lat: 35.6267,
    lon: 139.8851,
  },
  matsumoto: {
    id: "matsumoto",
    name: { en: "Matsumoto", ja: "松本" },
    lat: 36.2307,
    lon: 137.9639,
  },
  kamikochi: {
    id: "kamikochi",
    name: { en: "Kamikochi", ja: "上高地" },
    lat: 36.2463,
    lon: 137.6356,
  },
}

export function getCity(cityId: string) {
  return CITIES[cityId]
}
