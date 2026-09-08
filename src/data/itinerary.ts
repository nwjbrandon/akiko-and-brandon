import type { City, Trip } from "./types"

// Source of truth: "Japan 202611 - 11_21-23.csv".
// The CSV labels its second day block "11/21"; it is 11/22 — the day opens by
// checking out of the Tsuruga hotel checked into on 11/21.

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
}

const DORMY_INN_URL = "https://maps.app.goo.gl/wWWnXj6HG3LYspV46"
const DORMY_INN = {
  en: "Dormy Inn Tsuruga Natural Hot Spring",
  ja: "ドーミーイン敦賀 天然温泉",
}
const RIVERGE = { en: "Hotel Riverge Akebono", ja: "ホテルリバージュアケボノ" }
const FUKUI_STATION = { en: "Fukui Station", ja: "福井駅" }
const COIN_LOCKER = {
  en: "Leave luggage in coin locker",
  ja: "コインロッカーに荷物を預ける",
}
const CHECK_OUT = { en: "Check-out", ja: "チェックアウト" }
const CHECK_IN = { en: "Check-in and rest", ja: "チェックイン・休憩" }
const SIGHTSEEING = { en: "Sightseeing", ja: "観光" }
const LUNCH = { en: "Lunch", ja: "昼食" }
const DINNER = { en: "Dinner", ja: "夕食" }

export const TRIP: Trip = {
  title: { en: "Fukui, for Two", ja: "ふたりの福井" },
  startDate: "2026-11-21",
  endDate: "2026-11-23",
  days: [
    {
      date: "2026-11-21",
      cityId: "tsuruga",
      title: { en: "Setting off together", ja: "ふたりで出発" },
      summary: {
        en: "Coffee before the sun is properly up, a shinkansen west, and an afternoon under the Avenue of Metasequoias in full autumn colour — then a quiet hot spring evening in Tsuruga.",
        ja: "夜明け前のコーヒーから始まる一日。新幹線で西へ向かい、紅葉に染まるメタセコイア並木を歩きます。氣比神宮を訪ねたあとは、敦賀の温泉でゆっくりと。",
      },
      blocks: [
        {
          start: "07:00",
          end: "07:18",
          type: "meeting",
          title: {
            en: "Meet at Doutor Coffee",
            ja: "ドトールコーヒーで待ち合わせ",
          },
          location: { en: "Yokohama Station", ja: "横浜駅" },
        },
        {
          start: "07:18",
          end: "10:27",
          type: "commute",
          title: {
            en: "Yokohama Station → Tsuruga Station",
            ja: "横浜駅 → 敦賀駅",
          },
          note: {
            en: "Shin Yokohama Station → Maibara Station → Tsuruga Station",
            ja: "新横浜駅 → 米原駅 → 敦賀駅",
          },
        },
        {
          start: "10:27",
          end: "10:40",
          type: "logistics",
          title: {
            en: "Leave luggage at hotel",
            ja: "ホテルに荷物を預ける",
          },
          location: DORMY_INN,
          link: DORMY_INN_URL,
        },
        { start: "11:00", end: "12:20", type: "meal", title: LUNCH },
        {
          start: "12:20",
          end: "13:21",
          type: "commute",
          title: {
            en: "Tsuruga Station → Avenue of Metasequoias",
            ja: "敦賀駅 → メタセコイア並木",
          },
          link: "https://maps.app.goo.gl/zYQ78dYUZr9t39dv7",
        },
        {
          start: "13:21",
          end: "15:05",
          type: "activity",
          title: SIGHTSEEING,
          location: {
            en: "Avenue of Metasequoias",
            ja: "メタセコイア並木",
          },
        },
        {
          start: "15:05",
          end: "16:15",
          type: "commute",
          title: {
            en: "Avenue of Metasequoias → Tsuruga Station",
            ja: "メタセコイア並木 → 敦賀駅",
          },
        },
        {
          start: "16:15",
          end: "17:30",
          type: "activity",
          title: SIGHTSEEING,
          location: { en: "Kehi-jingu Shrine", ja: "氣比神宮" },
          link: "https://maps.app.goo.gl/BzcXZkNRrm9SHryz6",
        },
        { start: "17:30", end: "19:30", type: "meal", title: DINNER },
        {
          start: "19:30",
          end: null,
          type: "lodging",
          title: CHECK_IN,
          location: DORMY_INN,
          link: DORMY_INN_URL,
        },
      ],
    },
    {
      date: "2026-11-22",
      cityId: "fukui",
      title: { en: "Crab, and a long lunch", ja: "かにまつりの一日" },
      summary: {
        en: "A whole afternoon to ourselves at the Echizen Crab Festival by the sea, and sauce katsudon at Europe-ken Ikuhisa to end it.",
        ja: "海沿いの道の駅越前で開かれる越前かにまつりへ。午後はまるごとふたりの時間。締めくくりはヨーロッパ軒 幾久店のソースカツ丼。",
      },
      blocks: [
        {
          start: "07:45",
          end: "08:04",
          type: "lodging",
          title: CHECK_OUT,
          location: DORMY_INN,
          link: DORMY_INN_URL,
        },
        {
          start: "08:04",
          end: "08:45",
          type: "commute",
          title: { en: "Tsuruga Station → Fukui Station", ja: "敦賀駅 → 福井駅" },
        },
        {
          start: "08:45",
          end: "09:35",
          type: "logistics",
          title: COIN_LOCKER,
          location: FUKUI_STATION,
        },
        {
          start: "09:35",
          end: "11:17",
          type: "commute",
          title: {
            en: "Fukui Station → Roadside Station Echizen",
            ja: "福井駅 → 道の駅越前",
          },
        },
        {
          start: "11:17",
          end: "15:44",
          type: "activity",
          title: { en: "Fukui Crab Festival", ja: "越前かにまつり" },
          location: { en: "Roadside Station Echizen", ja: "道の駅越前" },
          link: "https://maps.app.goo.gl/7eH8sETNF1oP9TnE8",
        },
        {
          start: "15:44",
          end: "17:34",
          type: "commute",
          title: {
            en: "Roadside Station Echizen → Fukui Station",
            ja: "道の駅越前 → 福井駅",
          },
        },
        {
          start: "17:34",
          end: "19:30",
          type: "meal",
          title: DINNER,
          location: { en: "Europe-ken Ikuhisa", ja: "ヨーロッパ軒 幾久店" },
          link: "https://tabelog.com/en/fukui/A1801/A180101/18001655/",
        },
        {
          start: "19:30",
          end: null,
          type: "lodging",
          title: CHECK_IN,
          location: RIVERGE,
        },
      ],
    },
    {
      date: "2026-11-23",
      cityId: "fukui",
      title: { en: "Cliffs, then home", ja: "東尋坊、そして帰り道" },
      summary: {
        en: "The cliffs at Tojinbo with the sea all the way to the horizon, a slow ride back east, and one last dinner in Yokohama before we say goodnight.",
        ja: "水平線まで海が広がる東尋坊の断崖へ。午後はゆっくりと東へ戻り、横浜で最後の夕食を。",
      },
      blocks: [
        {
          start: "07:45",
          end: "08:00",
          type: "lodging",
          title: CHECK_OUT,
          location: RIVERGE,
        },
        {
          start: "08:00",
          end: "08:35",
          type: "logistics",
          title: COIN_LOCKER,
          location: FUKUI_STATION,
        },
        {
          start: "08:35",
          end: "10:17",
          type: "commute",
          title: { en: "Fukui Station → Tojinbo", ja: "福井駅 → 東尋坊" },
        },
        {
          start: "10:17",
          end: "12:10",
          type: "activity",
          title: SIGHTSEEING,
          location: { en: "Tojinbo", ja: "東尋坊" },
        },
        {
          start: "12:10",
          end: "13:31",
          type: "commute",
          title: { en: "Tojinbo → Fukui Station", ja: "東尋坊 → 福井駅" },
        },
        {
          start: "13:31",
          end: "15:23",
          type: "meal",
          title: LUNCH,
          location: FUKUI_STATION,
        },
        {
          start: "15:23",
          end: "19:08",
          type: "commute",
          title: {
            en: "Fukui Station → Yokohama Station",
            ja: "福井駅 → 横浜駅",
          },
          note: {
            en: "Fukui Station → Tokyo Station → Yokohama Station",
            ja: "福井駅 → 東京駅 → 横浜駅",
          },
        },
        {
          start: "19:08",
          end: "20:30",
          type: "meal",
          title: DINNER,
          location: { en: "Yokohama Station", ja: "横浜駅" },
        },
      ],
    },
  ],
}

export const DAYS = TRIP.days

export function getDay(date: string) {
  return DAYS.find((day) => day.date === date)
}

export function dayIndex(date: string) {
  return DAYS.findIndex((day) => day.date === date)
}

export function getCity(cityId: string) {
  return CITIES[cityId]
}
