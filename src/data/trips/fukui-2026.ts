import type { Trip } from "../types"
import { CHECK_OUT, DINNER, LUNCH, MEET_AT_DOUTOR, SIGHTSEEING } from "./shared"

// Source of truth for 11/21–23: "Japan 202611 - 11_21-23.csv".
// The CSV labels its second day block "11/21"; it is 11/22 — the day opens by
// checking out of the Tsuruga hotel checked into on 11/21.
// The Yokohama dinners on 11/20 and 11/24 are not in the CSV.

const DORMY_INN_MAP = "https://maps.app.goo.gl/wWWnXj6HG3LYspV46"
const DORMY_INN = {
  en: "Dormy Inn Tsuruga Natural Hot Spring",
  ja: "ドーミーイン敦賀 天然温泉",
}
const RIVERGE_MAP = "https://maps.app.goo.gl/MYWFwLYVuKHboFJg8"
const RIVERGE = { en: "Hotel Riverge Akebono", ja: "ホテルリバージュアケボノ" }
const FUKUI_STATION_MAP = "https://maps.app.goo.gl/SZ8QcsLqqYPr8ydi6"
const FUKUI_STATION = { en: "Fukui Station", ja: "福井駅" }
const COIN_LOCKER = {
  en: "Leave luggage in coin locker",
  ja: "コインロッカーに荷物を預ける",
}
const CHECK_IN = { en: "Check-in and rest", ja: "チェックイン・休憩" }

export const FUKUI_2026: Trip = {
  id: "fukui-2026",
  title: { en: "Fukui, for Two", ja: "ふたりの福井" },
  subtitle: {
    en: "Three days along the Sea of Japan, and a dinner in Yokohama either side",
    ja: "日本海沿いの三日間と、その前後の横浜ディナー",
  },
  scene: "fukui",
  days: [
    {
      date: "2026-11-20",
      cityId: "yokohama",
      title: { en: "Pizza, the night before", ja: "出発前夜のピッツァ" },
      summary: {
        en: "The evening before we set off: dinner at Sisiliya in Kannai — rated very highly on Tabelog, and the wood-fired pizza looks wonderful.",
        ja: "出発前夜は関内のシシリヤで夕食。食べログの評価がとても高く、薪窯で焼くピッツァがとてもおいしそう。",
      },
      blocks: [
        {
          start: "18:30",
          end: null,
          type: "meal",
          title: DINNER,
          location: { en: "Sisiliya, Kannai", ja: "シシリヤ 関内" },
          link: "https://tabelog.com/kanagawa/A1401/A140104/14001040/",
          map: "https://maps.app.goo.gl/gxoma1AdJTmyiJap7",
        },
      ],
    },
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
          ...MEET_AT_DOUTOR,
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
            en: "Yokohama Station → Shin-Yokohama Station → Maibara Station → Tsuruga Station",
            ja: "横浜駅 → 新横浜駅 → 米原駅 → 敦賀駅",
          },
        },
        {
          start: "10:27",
          end: "11:00",
          type: "logistics",
          title: {
            en: "Leave luggage at hotel",
            ja: "ホテルに荷物を預ける",
          },
          location: DORMY_INN,
          map: DORMY_INN_MAP,
        },
        {
          start: "11:00",
          end: "12:20",
          type: "meal",
          title: LUNCH,
          location: {
            en: "Tsuruga Europe-ken Honten",
            ja: "敦賀ヨーロッパ軒 本店",
          },
          link: "https://tabelog.com/en/fukui/A1803/A180301/18000167/",
        },
        {
          start: "12:20",
          end: "13:21",
          type: "commute",
          title: {
            en: "Tsuruga Station → Avenue of Metasequoias",
            ja: "敦賀駅 → メタセコイア並木",
          },
          note: {
            en: "Tsuruga Station → Makino Station → Makino-kogen-minshuku-mura → Avenue of Metasequoias",
            ja: "敦賀駅 → マキノ駅 → マキノ高原民宿村 → メタセコイア並木",
          },
          map: "https://maps.app.goo.gl/zYQ78dYUZr9t39dv7",
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
          map: "https://maps.app.goo.gl/NJMhFGfbmzcNMZX1A",
        },
        {
          start: "15:05",
          end: "16:15",
          type: "commute",
          title: {
            en: "Avenue of Metasequoias → Tsuruga Station",
            ja: "メタセコイア並木 → 敦賀駅",
          },
          note: {
            en: "Avenue of Metasequoias → Makino-kogen-minshuku-mura → Makino Station → Tsuruga Station",
            ja: "メタセコイア並木 → マキノ高原民宿村 → マキノ駅 → 敦賀駅",
          },
        },
        {
          start: "16:15",
          end: "17:30",
          type: "activity",
          title: SIGHTSEEING,
          location: { en: "Kehi-jingu Shrine", ja: "氣比神宮" },
          map: "https://maps.app.goo.gl/BzcXZkNRrm9SHryz6",
        },
        {
          start: "17:30",
          end: "19:30",
          type: "meal",
          title: DINNER,
          location: {
            en: "Marusanya Tsuruga Ekimae",
            ja: "まるさん屋 敦賀駅前",
          },
          link: "https://tabelog.com/en/fukui/A1803/A180301/18000158/",
        },
        {
          start: "19:30",
          end: null,
          type: "lodging",
          title: CHECK_IN,
          location: DORMY_INN,
          map: DORMY_INN_MAP,
        },
      ],
    },
    {
      date: "2026-11-22",
      cityId: "fukui",
      title: { en: "Crab, and a long lunch", ja: "かにまつりの一日" },
      summary: {
        en: "A whole afternoon to ourselves at the Echizen Crab Festival by the sea, and a seafood dinner at Uoshin to end it.",
        ja: "海沿いの道の駅越前で開かれる越前かにまつりへ。午後はまるごとふたりの時間。締めくくりは魚心の海鮮料理。",
      },
      blocks: [
        {
          start: "07:45",
          end: "08:04",
          type: "lodging",
          title: CHECK_OUT,
          location: DORMY_INN,
          map: DORMY_INN_MAP,
        },
        {
          start: "08:04",
          end: "08:45",
          type: "commute",
          title: { en: "Tsuruga Station → Fukui Station", ja: "敦賀駅 → 福井駅" },
          note: {
            en: "Tsuruga Station → Fukui Station",
            ja: "敦賀駅 → 福井駅",
          },
        },
        {
          start: "08:45",
          end: "09:35",
          type: "logistics",
          title: COIN_LOCKER,
          location: FUKUI_STATION,
          map: FUKUI_STATION_MAP,
        },
        {
          start: "09:35",
          end: "11:17",
          type: "commute",
          title: {
            en: "Fukui Station → Roadside Station Echizen",
            ja: "福井駅 → 道の駅越前",
          },
          note: {
            en: "Fukui Station → Takefu Station → Michinoeki「Echizen」 → Roadside Station Echizen",
            ja: "福井駅 → 武生駅 → 道の駅「越前」→ 道の駅越前",
          },
        },
        {
          start: "11:17",
          end: "15:44",
          type: "activity",
          title: { en: "Fukui Crab Festival", ja: "越前かにまつり" },
          location: { en: "Roadside Station Echizen", ja: "道の駅越前" },
          map: "https://maps.app.goo.gl/7eH8sETNF1oP9TnE8",
        },
        {
          start: "15:44",
          end: "17:34",
          type: "commute",
          title: {
            en: "Roadside Station Echizen → Fukui Station",
            ja: "道の駅越前 → 福井駅",
          },
          note: {
            en: "Roadside Station Echizen → Michinoeki「Echizen」 → Takefu Station → Fukui Station",
            ja: "道の駅越前 → 道の駅「越前」→ 武生駅 → 福井駅",
          },
        },
        {
          start: "17:34",
          end: "19:30",
          type: "meal",
          title: DINNER,
          location: { en: "Uoshin Sakoten", ja: "魚心" },
          link: "https://tabelog.com/en/fukui/A1801/A180101/18000770/",
        },
        {
          start: "19:30",
          end: null,
          type: "lodging",
          title: CHECK_IN,
          location: RIVERGE,
          map: RIVERGE_MAP,
        },
      ],
    },
    {
      date: "2026-11-23",
      cityId: "fukui",
      title: { en: "Ruins, a temple, then home", ja: "一乗谷と永平寺、そして帰り道" },
      summary: {
        en: "An early morning among the ruins of the Asakura clan's town at Ichijōdani, the cedars and halls of Eiheiji, then a slow ride back east and dinner in Yokohama before we say goodnight.",
        ja: "朝早くから一乗谷朝倉氏遺跡を歩き、杉木立に囲まれた大本山永平寺へ。午後はゆっくりと東へ戻り、横浜で夕食を。",
      },
      blocks: [
        {
          start: "07:15",
          end: "07:30",
          type: "lodging",
          title: CHECK_OUT,
          location: RIVERGE,
          map: RIVERGE_MAP,
        },
        {
          start: "07:30",
          end: "07:59",
          type: "logistics",
          title: COIN_LOCKER,
          location: FUKUI_STATION,
          map: FUKUI_STATION_MAP,
        },
        {
          start: "07:59",
          end: "08:31",
          type: "commute",
          title: {
            en: "Fukui Station → Ichijōdani Asakura Clan Ruins",
            ja: "福井駅 → 一乗谷朝倉氏遺跡",
          },
          note: {
            en: "Fukui Station → Asakurayakata-mae → Ichijōdani Asakura Clan Ruins",
            ja: "福井駅 → 朝倉館前 → 一乗谷朝倉氏遺跡",
          },
        },
        {
          start: "08:31",
          end: "10:22",
          type: "activity",
          title: SIGHTSEEING,
          location: {
            en: "Ichijōdani Asakura Clan Ruins",
            ja: "一乗谷朝倉氏遺跡",
          },
          map: "https://maps.app.goo.gl/teLYodFrnSidtMKq5",
        },
        {
          start: "10:22",
          end: "10:59",
          type: "commute",
          title: {
            en: "Ichijōdani Asakura Clan Ruins → Daihonzan Eiheiji",
            ja: "一乗谷朝倉氏遺跡 → 大本山永平寺",
          },
          note: {
            en: "Ichijōdani Asakura Clan Ruins → Fukugenmachinami → Eiheiji (Temple) → Daihonzan Eiheiji",
            ja: "一乗谷朝倉氏遺跡 → 復原町並 → 永平寺（バス停）→ 大本山永平寺",
          },
        },
        {
          start: "10:59",
          end: "13:22",
          type: "activity",
          title: SIGHTSEEING,
          location: { en: "Daihonzan Eiheiji", ja: "大本山永平寺" },
          map: "https://maps.app.goo.gl/zewbjjW6Lu2Fc8Tz6",
        },
        {
          start: "13:22",
          end: "14:00",
          type: "commute",
          title: {
            en: "Daihonzan Eiheiji → Fukui Station",
            ja: "大本山永平寺 → 福井駅",
          },
          note: {
            en: "Daihonzan Eiheiji → Eiheiji (Temple) → Fukui Station (East Exit)",
            ja: "大本山永平寺 → 永平寺（バス停）→ 福井駅（東口）",
          },
        },
        {
          start: "14:00",
          end: "15:23",
          type: "meal",
          title: LUNCH,
          location: {
            en: "Europe-ken Souhonten",
            ja: "ヨーロッパ軒 総本店",
          },
          link: "https://tabelog.com/en/fukui/A1801/A180101/18000015/",
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
          location: {
            en: "Unagi Yondaime Kikukawa, Yokohama Bay Quarter",
            ja: "うなぎ 四代目菊川 横浜ベイクォーター店",
          },
          map: "https://maps.app.goo.gl/hmmwYKCeXER3VtbK7",
        },
      ],
    },
    {
      date: "2026-11-24",
      cityId: "yokohama",
      title: { en: "Forty-six floors up", ja: "46階の夜景ディナー" },
      summary: {
        en: "One more evening once we're home: dinner on the 46th floor of The Tower Yokohama Kitanaka, with a night view and atmosphere that are hard to beat — and a dress to look forward to.",
        ja: "旅のあとにもうひと晩。ザ・タワー横浜北仲の46階で、最高の夜景と雰囲気のなかディナー。ドレス姿も楽しみ。",
      },
      blocks: [
        {
          start: "19:00",
          end: null,
          type: "meal",
          title: DINNER,
          location: {
            en: "THE YOKOHAMA BAY, The Tower Yokohama Kitanaka 46F",
            ja: "THE YOKOHAMA BAY ザ・タワー横浜北仲 46階",
          },
          link: "https://tabelog.com/kanagawa/A1401/A140104/14080917/",
          map: "https://maps.app.goo.gl/ugeqbSDTdiuCAiDV6",
        },
      ],
    },
  ],
}

