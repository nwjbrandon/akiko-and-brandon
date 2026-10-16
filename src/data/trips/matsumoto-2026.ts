import type { PlannedTrip } from "../types"
import {
  CHECK_OUT,
  DINNER,
  LUNCH,
  MEET_AT_DOUTOR,
  SIGHTSEEING,
  mapsSearch,
} from "./shared"

// Transcribed from the plan, with places and links looked up afterwards, then
// corrected wherever the day went differently: the train rather than the bus to
// and from DisneySea on 8/11, and its attractions (the ones we went on, in that
// order, with rough times), lunch and the skipped supper on 8/15, and the
// luggage and dinner on 8/16.
//
// Journeys are written as the Fukui trip writes them: one block from place to
// place, its note listing the stations and stops along the way, even where the
// plan gives each train or bus a line of its own.
//
// On 8/16 the luggage waits at Matsumoto Station rather than the hotel. The
// plan gives no time for leaving it there, so it takes the second half of the
// check-out slot.

const TOYOKO_INN = {
  en: "Toyoko Inn Matsumoto-eki Higashi-guchi",
  ja: "東横INN松本駅東口",
}
const TOYOKO_INN_MAP = mapsSearch("東横INN松本駅東口")
const TOYOKO_INN_LINK = "https://www.toyoko-inn.com/eng/search/detail/00314/"

const MATSUMOTO_STATION = { en: "Matsumoto Station", ja: "松本駅" }
const MATSUMOTO_STATION_MAP = mapsSearch("松本駅")

const FANTASY_SPRINGS = { en: "Fantasy Springs", ja: "ファンタジースプリングス" }
const FANTASY_SPRINGS_MAP = mapsSearch("ファンタジースプリングス 東京ディズニーシー")
const TDS_ATTRACTION = "https://www.tokyodisneyresort.jp/en/tds/attraction/detail"

export const MATSUMOTO_2026: PlannedTrip = {
  id: "matsumoto-2026",
  title: { en: "Matsumoto, for Two", ja: "ふたりの松本" },
  subtitle: {
    en: "A day at DisneySea, then the mountains: Matsumoto Castle, fireworks over Lake Suwa and a morning in Kamikochi",
    ja: "ディズニーシーで一日、そして信州へ。松本城、諏訪湖の花火、朝の上高地",
  },
  scene: "plain",
  days: [
    {
      date: "2026-08-11",
      cityId: "disneysea",
      title: { en: "A day at DisneySea", ja: "ディズニーシーで一日" },
      summary: {
        en: "Peter Pan in Fantasy Springs first, then Toy Story Mania!, Rapunzel's Lantern Festival and the Magic Lamp Theater, with Frozen Journey saved for the evening before the bus home.",
        ja: "朝いちばんにファンタジースプリングスでピーターパン。トイ・ストーリー・マニア！、ラプンツェルのランタンフェスティバル、マジックランプシアターを楽しみ、夜はフローズンジャーニーで締めくくってからバスで横浜へ。",
      },
      blocks: [
        {
          start: "07:45",
          end: "08:05",
          type: "meeting",
          ...MEET_AT_DOUTOR,
        },
        {
          start: "08:05",
          end: "09:00",
          type: "commute",
          title: {
            en: "Yokohama Station → Tokyo DisneySea",
            ja: "横浜駅 → 東京ディズニーシー",
          },
          note: {
            en: "Yokohama Station → Maihama Station → Tokyo DisneySea",
            ja: "横浜駅 → 舞浜駅 → 東京ディズニーシー",
          },
        },
        {
          start: "09:00",
          end: "11:00",
          type: "activity",
          title: {
            en: "Peter Pan's Never Land Adventure",
            ja: "ピーターパンのネバーランドアドベンチャー",
          },
          location: FANTASY_SPRINGS,
          map: FANTASY_SPRINGS_MAP,
          link: `${TDS_ATTRACTION}/257/`,
        },
        {
          start: "11:00",
          end: "13:00",
          type: "activity",
          title: { en: "Toy Story Mania!", ja: "トイ・ストーリー・マニア！" },
          location: { en: "American Waterfront", ja: "アメリカンウォーターフロント" },
          map: mapsSearch("アメリカンウォーターフロント 東京ディズニーシー"),
          link: `${TDS_ATTRACTION}/218/`,
        },
        {
          start: "13:00",
          end: "14:00",
          type: "activity",
          title: { en: "Shopping", ja: "ショッピング" },
        },
        {
          start: "14:00",
          end: "15:00",
          type: "meal",
          title: LUNCH,
        },
        {
          start: "15:00",
          end: "17:00",
          type: "activity",
          title: {
            en: "Rapunzel's Lantern Festival",
            ja: "ラプンツェルのランタンフェスティバル",
          },
          location: FANTASY_SPRINGS,
          map: FANTASY_SPRINGS_MAP,
          link: `${TDS_ATTRACTION}/256/`,
        },
        {
          start: "17:00",
          end: "19:00",
          type: "activity",
          title: { en: "The Magic Lamp Theater", ja: "マジックランプシアター" },
          location: { en: "Arabian Coast", ja: "アラビアンコースト" },
          map: mapsSearch("アラビアンコースト 東京ディズニーシー"),
          link: `${TDS_ATTRACTION}/226/`,
        },
        {
          start: "19:00",
          end: "20:00",
          type: "meal",
          title: DINNER,
        },
        {
          start: "20:00",
          end: "21:05",
          type: "activity",
          title: {
            en: "Anna and Elsa's Frozen Journey",
            ja: "アナとエルサのフローズンジャーニー",
          },
          location: FANTASY_SPRINGS,
          map: FANTASY_SPRINGS_MAP,
          link: `${TDS_ATTRACTION}/255/`,
        },
        {
          start: "21:05",
          end: "21:55",
          type: "commute",
          title: {
            en: "Tokyo DisneySea → Yokohama Station",
            ja: "東京ディズニーシー → 横浜駅",
          },
          note: {
            en: "Tokyo DisneySea → Maihama Station → Yokohama Station",
            ja: "東京ディズニーシー → 舞浜駅 → 横浜駅",
          },
        },
      ],
    },
    {
      date: "2026-08-15",
      cityId: "matsumoto",
      title: { en: "A castle, then fireworks", ja: "松本城と諏訪湖の花火" },
      summary: {
        en: "The first train out of Yokohama and the Azusa into the mountains, eel at Sakuraya, Matsumoto Castle, then the whole evening by Lake Suwa for the fireworks.",
        ja: "始発に近い電車で横浜を出て、特急あずさで信州へ。桜家のうなぎと国宝松本城を楽しんだら、夕方からは諏訪湖畔で花火大会を。",
      },
      blocks: [
        {
          start: "05:30",
          end: "05:43",
          type: "meeting",
          ...MEET_AT_DOUTOR,
        },
        {
          start: "05:43",
          end: "09:30",
          type: "commute",
          hop: true,
          title: { en: "Yokohama Station → Matsumoto Station", ja: "横浜駅 → 松本駅" },
          note: {
            en: "Yokohama Station → Hachioji Station → Matsumoto Station",
            ja: "横浜駅 → 八王子駅 → 松本駅",
          },
        },
        {
          start: "09:30",
          end: "10:00",
          type: "logistics",
          title: { en: "Leave luggage at hotel", ja: "ホテルに荷物を預ける" },
          location: TOYOKO_INN,
          map: TOYOKO_INN_MAP,
          link: TOYOKO_INN_LINK,
        },
        {
          start: "10:00",
          end: "12:00",
          type: "meal",
          title: LUNCH,
          location: { en: "Unagi Kappo Sakuraya", ja: "うなぎ割烹 桜家" },
          map: "https://maps.app.goo.gl/XDPRsNnK2FWFrehB7",
          link: "https://tabelog.com/en/nagano/A2002/A200201/20000079/",
        },
        {
          start: "12:00",
          end: "14:00",
          type: "activity",
          title: SIGHTSEEING,
          location: { en: "Matsumoto Castle", ja: "国宝 松本城" },
          map: mapsSearch("松本城"),
          link: "https://www.matsumoto-castle.jp/eng",
        },
        {
          start: "14:00",
          end: "15:00",
          type: "commute",
          title: {
            en: "Matsumoto Station → Suwa Lakeside Park",
            ja: "松本駅 → 諏訪市湖畔公園",
          },
          note: {
            en: "Matsumoto Station → Kami-Suwa Station → Suwa Lakeside Park",
            ja: "松本駅 → 上諏訪駅 → 諏訪市湖畔公園",
          },
        },
        {
          start: "15:00",
          end: "21:00",
          type: "activity",
          title: { en: "Lake Suwa Fireworks Festival", ja: "諏訪湖祭湖上花火大会" },
          location: { en: "Suwa Lakeside Park", ja: "諏訪市湖畔公園" },
          map: mapsSearch("諏訪市湖畔公園"),
          link: "https://suwako-hanabi.com/",
        },
        {
          start: "21:00",
          end: "22:00",
          type: "commute",
          title: {
            en: "Suwa Lakeside Park → Matsumoto Station",
            ja: "諏訪市湖畔公園 → 松本駅",
          },
          note: {
            en: "Suwa Lakeside Park → Kami-Suwa Station → Matsumoto Station",
            ja: "諏訪市湖畔公園 → 上諏訪駅 → 松本駅",
          },
        },
        {
          start: "22:00",
          end: null,
          type: "lodging",
          title: { en: "Rest at hotel", ja: "ホテルで休む" },
          location: TOYOKO_INN,
          map: TOYOKO_INN_MAP,
          link: TOYOKO_INN_LINK,
        },
      ],
    },
    {
      date: "2026-08-16",
      cityId: "kamikochi",
      title: { en: "Up to Kamikochi", ja: "上高地へ" },
      summary: {
        en: "The first train and the first bus up to Kamikochi, two hours along the Azusa River to Myōjin Pond and back, Yohashira Shrine on the way through Matsumoto, then home to Yokohama for gyūnabe at Araiya.",
        ja: "始発の電車とバスで上高地へ。梓川沿いに明神池まで歩く2時間コースを楽しみ、松本で四柱神社に寄ってから帰路へ。最後は横浜に戻って、荒井屋で牛鍋を。",
      },
      blocks: [
        {
          start: "06:00",
          end: "06:15",
          type: "lodging",
          title: CHECK_OUT,
          location: TOYOKO_INN,
          map: TOYOKO_INN_MAP,
          link: TOYOKO_INN_LINK,
        },
        {
          start: "06:15",
          end: "06:30",
          type: "logistics",
          title: { en: "Leave luggage", ja: "荷物を預ける" },
          location: MATSUMOTO_STATION,
          map: MATSUMOTO_STATION_MAP,
        },
        {
          start: "06:30",
          end: "08:15",
          type: "commute",
          hop: true,
          by: "bus",
          title: {
            en: "Matsumoto Station → Kamikochi Bus Terminal",
            ja: "松本駅 → 上高地バスターミナル",
          },
          note: {
            en: "Matsumoto Station → Shin-Shimashima Station → Kamikochi Bus Terminal",
            ja: "松本駅 → 新島々駅 → 上高地バスターミナル",
          },
        },
        {
          start: "08:30",
          end: "11:00",
          type: "activity",
          title: { en: "Two-hour walking course", ja: "2時間コースを散策" },
          location: { en: "Kappa Bridge ↔ Myōjin Pond", ja: "河童橋 ↔ 明神池" },
          note: {
            en: "Bus Terminal → Kappa Bridge → left bank of the Azusa → Myōjin Pond → right bank → Kappa Bridge → Bus Terminal, about 5.5 km",
            ja: "バスターミナル → 河童橋 → 梓川左岸 → 明神池 → 梓川右岸 → 河童橋 → バスターミナル（約5.5km）",
          },
          map: mapsSearch("河童橋 上高地"),
          link: "https://www.kamikochi.org/?p=5553",
        },
        {
          start: "11:00",
          end: "12:40",
          type: "meal",
          title: LUNCH,
          location: { en: "Kamikochi", ja: "上高地" },
        },
        {
          start: "12:40",
          end: "14:35",
          type: "commute",
          by: "bus",
          title: {
            en: "Kamikochi Bus Terminal → Yohashira Shrine",
            ja: "上高地バスターミナル → 四柱神社",
          },
          note: {
            en: "Kamikochi Bus Terminal → Shin-Shimashima Station → Matsumoto Station → Yohashira Shrine",
            ja: "上高地バスターミナル → 新島々駅 → 松本駅 → 四柱神社",
          },
        },
        {
          start: "14:35",
          end: "15:00",
          type: "activity",
          title: SIGHTSEEING,
          location: { en: "Yohashira Shrine", ja: "四柱神社" },
          map: mapsSearch("四柱神社 松本"),
          link: "https://www.go.tvm.ne.jp/~yohasira/index.html",
        },
        {
          start: "15:00",
          end: "15:50",
          type: "logistics",
          title: { en: "Collect luggage", ja: "荷物を受け取る" },
          location: MATSUMOTO_STATION,
          map: MATSUMOTO_STATION_MAP,
        },
        {
          start: "15:50",
          end: "19:30",
          type: "commute",
          title: { en: "Matsumoto Station → Yokohama Station", ja: "松本駅 → 横浜駅" },
          note: {
            en: "Matsumoto Station → Hachioji Station → Yokohama Station",
            ja: "松本駅 → 八王子駅 → 横浜駅",
          },
        },
        {
          start: "20:00",
          end: null,
          type: "meal",
          title: DINNER,
          location: { en: "Araiya, Sogo Yokohama", ja: "荒井屋 そごう横浜店" },
          map: "https://maps.app.goo.gl/dKXzD2JTHVzgwvT66",
          link: "https://tabelog.com/en/kanagawa/A1401/A140101/14083611/",
        },
      ],
    },
  ],
}
