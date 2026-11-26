import type { PlannedTrip } from "../types"
import { CHECK_OUT, DINNER, LUNCH, MEET_AT_DOUTOR, SIGHTSEEING, mapsSearch } from "./shared"

// Planned in November 2026. The two tours and the hotel are as chosen then; the
// tour times are from tendodays.com. Still to settle:
// - The trains on 2/20 (Tsubasa 131) and 2/21 (Tsubasa 156) are from Yahoo!
//   Transit in November 2026, not booked yet. Worth checking that the times
//   still hold when booking.
// - Lunch and the afternoon's sightseeing in Tendo on 2/20 have no place yet,
//   nor do the dinners on 2/19 and 2/22–24.
// - Ask the hotel to keep the luggage on 2/21 while we are on the Zao tour.
// - Ginzan Onsen Magical Night Tour: check-in opens at 15:30, and the lounge is
//   closed before then. Book by 18:00 the day before. Adults ¥18,000. Free to
//   cancel until 17:00 two days before.
// - Great Icefall Expedition: book by 17:00 four days before. The page gives two
//   adult prices, ¥23,800 and ¥26,000. It needs some winter trekking
//   experience. Bring ski wear good for below -10°C, high-cut waterproof winter
//   boots (not rented), a hat, warm gloves, a backpack of 20 L or more, a packed
//   lunch, a warm drink and sunglasses, plus towels and a change of clothes for
//   the onsen. Free to cancel until 8 days before.

const SAKAEYA = { en: "Sakaeya Hotel, Tendo Onsen", ja: "天童温泉 栄屋ホテル" }
const SAKAEYA_MAP = mapsSearch("天童温泉 栄屋ホテル")
const SAKAEYA_LINK = "https://www.agoda.com/sakaeya-hotel/hotel/yamagata-jp.html"

const LOUNGE = {
  en: "Tendo Onsen Travelers' Lounge",
  ja: "天童温泉トラベラーズラウンジ",
}
const LOUNGE_MAP = mapsSearch("天童温泉トラベラーズラウンジ 天童市鎌田本町2-5-43")

const GINZAN_ONSEN = { en: "Ginzan Onsen", ja: "銀山温泉" }
const GINZAN_ONSEN_MAP = mapsSearch("銀山温泉")
const GINZAN_TOUR_LINK = "https://www.tendodays.com/en/tour/twilight-ginzantour/"

const LIZA_WORLD ={ en: "Zao Liza World", ja: "蔵王ライザワールド" }
const LIZA_WORLD_MAP = mapsSearch("蔵王ライザワールド")

const ICEFALL_LINK =
  "https://www.tendodays.com/en/tour/the-great-icefall-expedition-zao-snow-trek-guided-tour/"

export const YAMAGATA_2027: PlannedTrip = {
  id: "yamagata-2027",
  title: { en: "Yamagata, for Two", ja: "ふたりの山形" },
  subtitle: {
    en: "Ginzan Onsen by night and Zao's frozen falls, with dinners in Yokohama",
    ja: "夜の銀山温泉と蔵王の大氷瀑、そして横浜でのディナー",
  },
  scene: "plain",
  days: [
    {
      date: "2027-02-19",
      cityId: "yokohama",
      title: { en: "Dinner, the night before", ja: "出発前夜のディナー" },
      summary: {
        en: "The evening before we head north: dinner together in Yokohama at 19:00.",
        ja: "北へ向かう前の晩は、横浜で19時からふたりで夕食。",
      },
      blocks: [{ start: "19:00", end: null, type: "meal", title: DINNER }],
    },
    {
      date: "2027-02-20",
      cityId: "tendo",
      title: { en: "Ginzan Onsen by lamplight", ja: "灯りの銀山温泉" },
      summary: {
        en: "North by shinkansen to Tendo, an afternoon around the town, then a guided evening at Ginzan Onsen, with its old wooden inns lit up in the snow.",
        ja: "新幹線で北へ、天童へ。午後は街を歩き、夕方からはガイドと一緒に銀山温泉へ。雪のなか灯りがともる木造旅館の街並みを歩きます。",
      },
      blocks: [
        {
          start: "08:25",
          end: "08:40",
          type: "meeting",
          ...MEET_AT_DOUTOR,
        },
        {
          start: "08:40",
          end: "11:57",
          type: "commute",
          hop: true,
          title: { en: "Yokohama Station → Tendo Station", ja: "横浜駅 → 天童駅" },
          note: {
            en: "Yokohama Station 08:40 → Tokyo Station 09:10 (JR Ueno-Tokyo Line) → Tendo Station 11:57 (Yamagata Shinkansen Tsubasa 131, leaves Tokyo 09:24)",
            ja: "横浜駅 8:40 → 東京駅 9:10（JR上野東京ライン）→ 天童駅 11:57（山形新幹線つばさ131号、東京9:24発）",
          },
          map: "https://maps.app.goo.gl/q35b4siKnwfEcWe89",
        },
        {
          start: "11:57",
          end: "12:30",
          type: "logistics",
          title: {
            en: "Leave luggage at hotel",
            ja: "ホテルに荷物を預ける",
          },
          location: SAKAEYA,
          map: SAKAEYA_MAP,
          link: SAKAEYA_LINK,
        },
        {
          start: "12:30",
          end: "13:30",
          type: "meal",
          title: LUNCH,
        },
        {
          start: "13:30",
          end: "15:30",
          type: "activity",
          title: SIGHTSEEING,
          location: { en: "Tendo", ja: "天童" },
        },
        {
          start: "15:30",
          end: "15:50",
          type: "logistics",
          title: { en: "Tour check-in", ja: "ツアー受付" },
          location: LOUNGE,
          map: LOUNGE_MAP,
          link: GINZAN_TOUR_LINK,
        },
        {
          start: "15:50",
          end: "17:00",
          type: "commute",
          by: "bus",
          title: {
            en: "Tendo Onsen Travelers' Lounge → Ginzan Onsen",
            ja: "天童温泉トラベラーズラウンジ → 銀山温泉",
          },
          note: {
            en: "The tour bus, to Ginzanso.",
            ja: "ツアーのバスで銀山荘へ。",
          },
        },
        {
          start: "17:00",
          end: "18:20",
          type: "activity",
          title: SIGHTSEEING,
          location: GINZAN_ONSEN,
          map: GINZAN_ONSEN_MAP,
          link: GINZAN_TOUR_LINK,
        },
        {
          start: "18:20",
          end: "19:20",
          type: "commute",
          by: "bus",
          title: {
            en: "Ginzan Onsen → Shouhaku-tei Azumaso",
            ja: "銀山温泉 → 松柏亭 吾妻荘",
          },
          note: {
            en: "The tour bus. It drops us at Azumaso, a minute's walk from the hotel.",
            ja: "ツアーのバスで。吾妻荘で解散、ホテルまで徒歩1分。",
          },
        },
        {
          start: "19:20",
          end: null,
          type: "lodging",
          title: { en: "Back to the hotel", ja: "ホテルへ戻る" },
          location: SAKAEYA,
          map: SAKAEYA_MAP,
          link: SAKAEYA_LINK,
        },
      ],
    },
    {
      date: "2027-02-21",
      cityId: "zao",
      title: { en: "The great icefall", ja: "蔵王の大氷瀑" },
      summary: {
        en: "A day on snowshoes in the mountains at Zao, out to a frozen waterfall, then an onsen to warm up before the shinkansen home.",
        ja: "蔵王の雪山をスノーシューで歩き、凍った大滝へ。温泉で温まってから、新幹線で帰ります。",
      },
      blocks: [
        {
          start: "07:20",
          end: "07:35",
          type: "lodging",
          title: CHECK_OUT,
          location: SAKAEYA,
          map: SAKAEYA_MAP,
          link: SAKAEYA_LINK,
        },
        {
          start: "07:50",
          end: "09:00",
          type: "commute",
          by: "bus",
          hop: true,
          title: {
            en: "Tendo Onsen Travelers' Lounge → Zao Liza World",
            ja: "天童温泉トラベラーズラウンジ → 蔵王ライザワールド",
          },
          note: {
            en: "Meet and check in at the lounge at 07:50, then take the tour's shuttle.",
            ja: "7:50にラウンジに集合して受付、ツアーの送迎で向かいます。",
          },
          map: LOUNGE_MAP,
        },
        {
          start: "09:15",
          end: "14:00",
          type: "activity",
          title: {
            en: "Great Icefall Expedition snow trek",
            ja: "大氷瀑スノートレッキング",
          },
          location: LIZA_WORLD,
          map: LIZA_WORLD_MAP,
          link: ICEFALL_LINK,
        },
        {
          start: "14:15",
          end: "15:30",
          type: "activity",
          title: { en: "Warm up at Kogenyu", ja: "高原湯でひと休み" },
          location: LIZA_WORLD,
          map: LIZA_WORLD_MAP,
          link: ICEFALL_LINK,
        },
        {
          start: "15:30",
          end: "16:30",
          type: "commute",
          by: "bus",
          title: {
            en: "Zao Liza World → Tendo Onsen Travelers' Lounge",
            ja: "蔵王ライザワールド → 天童温泉トラベラーズラウンジ",
          },
          note: {
            en: "The tour's shuttle, by way of Yamagata Station at 15:45.",
            ja: "ツアーの送迎。15:45に山形駅を経由します。",
          },
        },
        {
          start: "16:30",
          end: "17:20",
          type: "logistics",
          title: { en: "Pick up luggage", ja: "荷物を受け取る" },
          location: SAKAEYA,
          map: SAKAEYA_MAP,
        },
        {
          start: "17:49",
          end: "21:30",
          type: "commute",
          hop: true,
          title: { en: "Tendo Station → Yokohama Station", ja: "天童駅 → 横浜駅" },
          note: {
            en: "Tendo Station 17:49 → Tokyo Station 20:48 (Yamagata Shinkansen Tsubasa 156) → Yokohama Station 21:30 (JR Tokaido Line, leaves Tokyo 21:02)",
            ja: "天童駅 17:49 → 東京駅 20:48（山形新幹線つばさ156号）→ 横浜駅 21:30（JR東海道線、東京21:02発）",
          },
          map: "https://maps.app.goo.gl/GMGXaH2khub5sptu7",
        },
      ],
    },
    {
      date: "2027-02-22",
      cityId: "yokohama",
      title: { en: "Dinner, back home", ja: "帰ってからのディナー" },
      summary: {
        en: "Back in Yokohama: dinner together at 19:00.",
        ja: "横浜に戻って、19時からふたりで夕食。",
      },
      blocks: [{ start: "19:00", end: null, type: "meal", title: DINNER }],
    },
    {
      date: "2027-02-23",
      cityId: "yokohama",
      title: { en: "Another dinner", ja: "もうひとつのディナー" },
      summary: {
        en: "Another evening in Yokohama: dinner at 19:00.",
        ja: "横浜でもうひと晩。19時から夕食。",
      },
      blocks: [{ start: "19:00", end: null, type: "meal", title: DINNER }],
    },
    {
      date: "2027-02-24",
      cityId: "yokohama",
      title: { en: "One more dinner", ja: "最後のディナー" },
      summary: {
        en: "The last evening of the trip: dinner at 19:00 in Yokohama.",
        ja: "旅の最後の夜は、横浜で19時から夕食。",
      },
      blocks: [{ start: "19:00", end: null, type: "meal", title: DINNER }],
    },
  ],
}
