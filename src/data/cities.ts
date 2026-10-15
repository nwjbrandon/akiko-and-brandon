import type { City } from "./types"

/**
 * The places trips go: their names, where each day's weather forecast is taken
 * from, and whose clock the day's timeline keeps.
 */
export const CITIES: Record<string, City> = {
  tsuruga: {
    id: "tsuruga",
    name: { en: "Tsuruga", ja: "敦賀" },
    lat: 35.6453,
    lon: 136.0555,
    timeZone: "Asia/Tokyo",
  },
  fukui: {
    id: "fukui",
    name: { en: "Fukui", ja: "福井" },
    lat: 36.0641,
    lon: 136.2196,
    timeZone: "Asia/Tokyo",
  },
  yokohama: {
    id: "yokohama",
    name: { en: "Yokohama", ja: "横浜" },
    lat: 35.4658,
    lon: 139.6222,
    timeZone: "Asia/Tokyo",
  },
  disneysea: {
    id: "disneysea",
    name: { en: "Tokyo DisneySea", ja: "東京ディズニーシー" },
    lat: 35.6267,
    lon: 139.8851,
    timeZone: "Asia/Tokyo",
  },
  matsumoto: {
    id: "matsumoto",
    name: { en: "Matsumoto", ja: "松本" },
    lat: 36.2307,
    lon: 137.9639,
    timeZone: "Asia/Tokyo",
  },
  kamikochi: {
    id: "kamikochi",
    name: { en: "Kamikochi", ja: "上高地" },
    lat: 36.2463,
    lon: 137.6356,
    timeZone: "Asia/Tokyo",
  },
  yamagata: {
    id: "yamagata",
    name: { en: "Yamagata", ja: "山形" },
    lat: 38.2405,
    lon: 140.3633,
    timeZone: "Asia/Tokyo",
  },
  "ginzan-onsen": {
    id: "ginzan-onsen",
    name: { en: "Ginzan Onsen", ja: "銀山温泉" },
    lat: 38.5697,
    lon: 140.5306,
    timeZone: "Asia/Tokyo",
  },
  "kuala-lumpur": {
    id: "kuala-lumpur",
    name: { en: "Kuala Lumpur", ja: "クアラルンプール" },
    lat: 3.139,
    lon: 101.6869,
    timeZone: "Asia/Kuala_Lumpur",
  },
  "johor-bahru": {
    id: "johor-bahru",
    name: { en: "Johor Bahru", ja: "ジョホールバル" },
    lat: 1.4927,
    lon: 103.7414,
    timeZone: "Asia/Kuala_Lumpur",
  },
  singapore: {
    id: "singapore",
    name: { en: "Singapore", ja: "シンガポール" },
    lat: 1.2903,
    lon: 103.8519,
    timeZone: "Asia/Singapore",
  },
}

export function getCity(cityId: string) {
  return CITIES[cityId]
}
