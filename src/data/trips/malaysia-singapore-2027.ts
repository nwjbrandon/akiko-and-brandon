import type { PlannedTrip } from "../types"
import { BREAKFAST, CHECK_OUT, DINNER, LUNCH, mapsSearch } from "./shared"

// Planned in October 2026 around what was already booked: the Scoot flight on
// 3/18, the ibis, KSL and Travelodge, the 17:35 ETS on 3/19, and her 10:45
// flight out of Changi on 3/22. Opening hours, prices and routes were checked
// then; worth re-checking the week before:
// - The RTS Link was due to open in February 2027. If it has not, 3/20 crosses
//   on the KTM Shuttle Tebrau from JB Sentral instead.
// - Universal Studios had not published its March 2027 hours; it usually opens
//   at 10:00.
// - 3/20 is probably Earth Hour, when Marina Bay has switched its lights off
//   before, so Gardens by the Bay and the Spectra show wait for 3/21.
// - 3/20–21 is the last weekend of Singapore's March school holidays: crowds at
//   Universal Studios and the Night Safari, and long queues at the causeway.
// - Satay by the Bay closed in October 2026; dinner at the Gardens on 3/21 is
//   at its food hall instead.
//
// Getting around is by train and on foot. The only buses are the J100 between
// JB Sentral and the KSL (an hour's walk otherwise), the garden's own shuttle in
// Johor Bahru, and the Mandai bus from Khatib to the Night Safari, which no
// train reaches.
//
// Kuala Lumpur and Johor Bahru keep Malaysian time and Singapore its own; both
// are an hour behind Japan.

const MDAC = "https://imigresen-online.imi.gov.my/mdac/main"
const SG_ARRIVAL_CARD =
  "https://www.ica.gov.sg/enter-transit-depart/entering-singapore/sg-arrival-card"

const CHECK_IN = { en: "Check-in", ja: "チェックイン" }

const IBIS = {
  en: "ibis Kuala Lumpur City Centre",
  ja: "イビス クアラルンプール シティセンター",
}
const IBIS_MAP = mapsSearch("ibis Kuala Lumpur City Centre")
const IBIS_LINK = "https://all.accor.com/hotel/8732/index.en.shtml"

const KSL = { en: "KSL Hotel & Resort", ja: "KSLホテル＆リゾート" }
const KSL_MAP = mapsSearch("KSL Hotel & Resort, 33 Jalan Seladang, Johor Bahru")

const TRAVELODGE = {
  en: "Travelodge Harbourfront Singapore",
  ja: "トラベロッジ・ハーバーフロント・シンガポール",
}
const TRAVELODGE_MAP = mapsSearch("Travelodge Harbourfront Singapore, 50 Telok Blangah Rd")
const TRAVELODGE_LINK = "https://travelodgehotels.asia/travelodge-harbourfront/"

const GARDENS_LINK =
  "https://www.gardensbythebay.com.sg/en/plan-your-visit/opening-hours.html"

export const MALAYSIA_SINGAPORE_2027: PlannedTrip = {
  id: "malaysia-singapore-2027",
  title: {
    en: "Malaysia & Singapore, for Two",
    ja: "ふたりのマレーシア・シンガポール",
  },
  subtitle: {
    en: "The Petronas Towers by night, Batu Caves first thing, a morning in Johor Bahru, then Sentosa, the Night Safari and Marina Bay",
    ja: "夜のペトロナスツインタワー、朝いちばんのバトゥ洞窟、ジョホールバルの朝、そしてセントーサ島、ナイトサファリ、マリーナベイ",
  },
  scene: "plain",
  days: [
    {
      date: "2027-03-18",
      cityId: "kuala-lumpur",
      title: { en: "Into Kuala Lumpur", ja: "クアラルンプールへ" },
      summary: {
        en: "An evening hop from Changi, the KLIA Ekspres into the city, the Petronas Towers lit up over KLCC Park, then charcoal-grilled chicken wings on Jalan Alor.",
        ja: "夕方の便でチャンギからクアラルンプールへ。KLIAエクスプレスで市内に入り、KLCC公園でライトアップされたペトロナスツインタワーを眺めたら、夜はアロー通りで炭火焼きの手羽先を。",
      },
      blocks: [
        {
          start: "15:00",
          end: "17:00",
          type: "logistics",
          title: { en: "Check in at Changi", ja: "チャンギ空港でチェックイン" },
          location: { en: "Changi Airport", ja: "チャンギ国際空港" },
          note: {
            en: "Scoot's counters close 60 minutes before departure. A Japanese passport needs the free Malaysia Digital Arrival Card, filed online in the 3 days before landing; Singaporeans are exempt.",
            ja: "スクートのカウンターは出発60分前に締め切り。日本のパスポートはマレーシアデジタル入国カード（MDAC・無料）を到着前3日以内にオンラインで提出。シンガポール国籍は不要。",
          },
          map: mapsSearch("Changi Airport"),
          link: MDAC,
        },
        {
          start: "17:00",
          end: "18:15",
          type: "commute",
          title: {
            en: "Changi Airport → KLIA",
            ja: "チャンギ国際空港 → クアラルンプール国際空港",
          },
          note: {
            en: "Changi Airport → KLIA Terminal 2 (Scoot)",
            ja: "チャンギ国際空港 → KLIAターミナル2（スクート）",
          },
        },
        {
          start: "18:15",
          end: "19:00",
          type: "logistics",
          title: { en: "Immigration", ja: "入国審査" },
          location: { en: "KLIA Terminal 2", ja: "KLIAターミナル2" },
          note: {
            en: "Japanese and Singaporean e-passports can use the autogates; a Japanese one once its arrival card is filed.",
            ja: "日本・シンガポールのICパスポートは自動化ゲートを利用可（日本のパスポートはMDAC提出が条件）。",
          },
          map: mapsSearch("KLIA Terminal 2"),
        },
        {
          start: "19:00",
          end: "20:15",
          type: "commute",
          title: { en: "KLIA → ibis Kuala Lumpur City Centre", ja: `KLIA → ${IBIS.ja}` },
          note: {
            en: "KLIA Terminal 2 → KL Sentral (KLIA Ekspres, every 20 minutes, RM65) → KLCC (LRT Kelana Jaya Line) → ibis Kuala Lumpur City Centre",
            ja: "KLIAターミナル2 → KLセントラル（KLIAエクスプレス、20分間隔、RM65）→ KLCC（LRTクラナジャヤ線）→ イビス クアラルンプール シティセンター",
          },
        },
        {
          start: "20:15",
          end: "20:30",
          type: "lodging",
          title: CHECK_IN,
          location: IBIS,
          map: IBIS_MAP,
          link: IBIS_LINK,
        },
        {
          start: "20:30",
          end: "21:15",
          type: "activity",
          title: { en: "The Petronas Towers at night", ja: "夜のペトロナスツインタワー" },
          location: {
            en: "KLCC Park, by the Lake Symphony fountain",
            ja: "KLCC公園・レイクシンフォニー噴水",
          },
          note: {
            en: "A 13-minute walk from the hotel; the fountain's light-and-sound show starts at 21:00. To go up, the Skybridge and observation deck take last entry at 21:30 (timed tickets online).",
            ja: "ホテルから徒歩13分。噴水の光と音のショーは21:00から。タワーに上るなら、スカイブリッジと展望台の最終入場は21:30（日時指定券をオンラインで）。",
          },
          map: mapsSearch("Lake Symphony KLCC Park"),
          link: "https://www.petronastwintowers.com.my/plan-your-visit/admission-ticketing/",
        },
        {
          start: "21:15",
          end: "21:40",
          type: "commute",
          title: { en: "KLCC → Jalan Alor", ja: "KLCC → アロー通り" },
          note: {
            en: "KLCC Park → Pavilion (KLCC–Bukit Bintang walkway, covered) → Jalan Alor (walk, about 25 minutes)",
            ja: "KLCC公園 → パビリオン（KLCC〜ブキッ・ビンタン間の屋根付き歩道）→ アロー通り（徒歩約25分）",
          },
        },
        {
          start: "21:40",
          end: "22:40",
          type: "meal",
          title: DINNER,
          location: {
            en: "Wong Ah Wah, Jalan Alor",
            ja: "ウォン・アー・ワー（アロー通り）",
          },
          note: {
            en: "Bukit Bintang's street-food strip, busy until late. Wong Ah Wah is known for its charcoal-grilled chicken wings; Sangkaya a few doors down does coconut ice cream.",
            ja: "夜遅くまでにぎわうブキッ・ビンタンの屋台街。ウォン・アー・ワーは炭火焼きの手羽先で有名。数軒先のサンカヤではココナッツアイスを。",
          },
          map: mapsSearch("Wong Ah Wah Restaurant Jalan Alor"),
        },
        {
          start: "22:40",
          end: "23:10",
          type: "commute",
          title: { en: "Jalan Alor → ibis Kuala Lumpur City Centre", ja: `アロー通り → ${IBIS.ja}` },
          note: {
            en: "Jalan Alor → Bukit Bintang (walk) → Tun Razak Exchange (MRT Kajang Line) → Ampang Park (MRT Putrajaya Line) → ibis Kuala Lumpur City Centre (walk)",
            ja: "アロー通り → ブキッ・ビンタン駅（徒歩）→ トゥン・ラザク・エクスチェンジ駅（MRTカジャン線）→ アンパン・パーク駅（MRTプトラジャヤ線）→ イビス（徒歩）",
          },
        },
      ],
    },
    {
      date: "2027-03-19",
      cityId: "kuala-lumpur",
      title: { en: "Caves, temples and a mosque", ja: "洞窟と寺院とモスク" },
      summary: {
        en: "Batu Caves first thing, Chinatown's temples and clam noodles, the Islamic Arts Museum and the National Mosque in its Friday visiting hour, then the evening ETS south to Johor Bahru.",
        ja: "朝いちばんにバトゥ洞窟へ。チャイナタウンの寺院めぐりとララ（はまぐり）麺、イスラム美術館、金曜の見学時間に合わせて国立モスク。夕方のETSでジョホールバルへ南下。",
      },
      blocks: [
        {
          start: "06:30",
          end: "06:40",
          type: "logistics",
          title: CHECK_OUT,
          location: IBIS,
          map: IBIS_MAP,
        },
        {
          start: "06:40",
          end: "07:10",
          type: "commute",
          title: { en: "ibis → KL Sentral", ja: "イビス → KLセントラル" },
          note: {
            en: "ibis Kuala Lumpur City Centre → KLCC (walk) → KL Sentral (LRT Kelana Jaya Line)",
            ja: "イビス クアラルンプール シティセンター → KLCC駅（徒歩）→ KLセントラル（LRTクラナジャヤ線）",
          },
        },
        {
          start: "07:10",
          end: "07:25",
          type: "logistics",
          title: { en: "Leave luggage in a locker", ja: "ロッカーに荷物を預ける" },
          location: {
            en: "Dr. Locker, KL Sentral (Level 1)",
            ja: "Dr. Locker（KLセントラル1階）",
          },
          note: {
            en: "Open 24 hours, about RM10–50 a day by size. Back for the bags before the train.",
            ja: "24時間営業、サイズにより1日RM10〜50ほど。電車の前に取りに戻ります。",
          },
          map: mapsSearch("Dr Locker KL Sentral"),
        },
        {
          start: "07:32",
          end: "08:01",
          type: "commute",
          title: { en: "KL Sentral → Batu Caves", ja: "KLセントラル → バトゥ洞窟" },
          note: {
            en: "KL Sentral → Batu Caves (KTM Komuter, Batu Caves Line)",
            ja: "KLセントラル → バトゥケーブ駅（KTMコミューター・バトゥケーブ線）",
          },
        },
        {
          start: "08:05",
          end: "09:15",
          type: "activity",
          title: { en: "Batu Caves and the 272 steps", ja: "バトゥ洞窟と272段の階段" },
          location: { en: "Temple Cave, Batu Caves", ja: "バトゥ洞窟（テンプル・ケーブ）" },
          note: {
            en: "A Hindu shrine in a limestone cave, up 272 rainbow steps past the golden statue of Lord Murugan. Shoulders and knees covered (sarongs for rent at the foot), and keep food away from the monkeys.",
            ja: "石灰岩の洞窟の中にあるヒンドゥー教の聖地。金色のムルガン神像の横から、虹色の272段を上ります。肩とひざを覆う服装で（ふもとでサロンを借りられます）。サルに食べ物を取られないよう注意。",
          },
          map: mapsSearch("Batu Caves"),
        },
        {
          start: "09:15",
          end: "09:50",
          type: "meal",
          title: BREAKFAST,
          location: {
            en: "Rani Vilas Restaurant, Batu Caves",
            ja: "ラニ・ヴィラス（バトゥ洞窟）",
          },
          note: {
            en: "South Indian vegetarian on the temple grounds: thosai, vadai and teh tarik.",
            ja: "寺院の敷地内にある南インドのベジタリアン食堂。トーサイ、ワダ、テタレ（甘いミルクティー）を。",
          },
          map: mapsSearch("Rani Vilas Restaurant Batu Caves"),
        },
        {
          start: "10:00",
          end: "10:40",
          type: "commute",
          title: { en: "Batu Caves → Chinatown", ja: "バトゥ洞窟 → チャイナタウン" },
          note: {
            en: "Batu Caves → Kuala Lumpur (KTM Komuter) → Chinatown (walk)",
            ja: "バトゥケーブ駅 → クアラルンプール駅（KTMコミューター）→ チャイナタウン（徒歩）",
          },
        },
        {
          start: "10:40",
          end: "11:20",
          type: "activity",
          title: { en: "Two temples on one street", ja: "通りをはさんだふたつの寺院" },
          location: {
            en: "Sri Mahamariamman Temple, Jalan Tun H.S. Lee",
            ja: "スリ・マハ・マリアマン寺院",
          },
          note: {
            en: "KL's oldest Hindu temple, its gateway tower crowded with painted gods; shoes off at the stall by the gate (small fee, cash). The Taoist Guan Di Temple is just across the road.",
            ja: "KL最古のヒンドゥー寺院。極彩色の神々で埋め尽くされた塔門が見事です。靴は門の横の預かり所へ（少額・現金）。道の向かいには道教の関帝廟。",
          },
          map: mapsSearch("Sri Mahamariamman Temple Kuala Lumpur"),
        },
        {
          start: "11:20",
          end: "12:00",
          type: "activity",
          title: { en: "Petaling Street and Kwai Chai Hong", ja: "プタリン通りと鬼仔巷" },
          location: { en: "Chinatown", ja: "チャイナタウン" },
          note: {
            en: "The market street under its green roof, then the restored lane and murals of Kwai Chai Hong. Central Market's Malaysian crafts are a few minutes' walk.",
            ja: "緑の屋根が続く市場通りを歩いて、壁画が残る路地・鬼仔巷（クワイチャイホン）へ。マレーシアの工芸品が並ぶセントラル・マーケットも徒歩数分。",
          },
          map: mapsSearch("Kwai Chai Hong"),
        },
        {
          start: "12:00",
          end: "13:00",
          type: "meal",
          title: LUNCH,
          location: {
            en: "Lai Foong Lala Noodles, Jalan Sultan",
            ja: "ライフォン・ララヌードル（スルタン通り）",
          },
          note: {
            en: "Clam noodle soup with a Michelin Bib Gourmand. If the queue is long, Nam Heong's Hainanese chicken rice is a few doors along.",
            ja: "ミシュランのビブグルマンに選ばれた、ララ（はまぐり）のスープ麺。混んでいたら、数軒先のナムヒョンで海南チキンライスも。",
          },
          map: mapsSearch("Lai Foong Lala Noodles"),
        },
        {
          start: "13:00",
          end: "13:20",
          type: "commute",
          title: {
            en: "Chinatown → Islamic Arts Museum",
            ja: "チャイナタウン → イスラム美術館",
          },
          note: {
            en: "Jalan Sultan → Islamic Arts Museum Malaysia (walk, about 16 minutes)",
            ja: "スルタン通り → イスラム美術館（徒歩約16分）",
          },
        },
        {
          start: "13:20",
          end: "14:55",
          type: "activity",
          title: { en: "Islamic Arts Museum Malaysia", ja: "イスラム美術館" },
          location: { en: "Jalan Lembah Perdana", ja: "ルンバ・プルダナ通り" },
          note: {
            en: "Domed galleries of Qur'ans, textiles, jewellery and models of the great mosques. RM20; about two hours.",
            ja: "ドーム天井の展示室に、コーランの写本、織物、宝飾品、世界の名だたるモスクの模型が並びます。入館料RM20、所要約2時間。",
          },
          map: mapsSearch("Islamic Arts Museum Malaysia"),
          link: "https://www.iamm.org.my/visit/",
        },
        {
          start: "15:00",
          end: "15:45",
          type: "activity",
          title: { en: "National Mosque", ja: "国立モスク" },
          location: { en: "Masjid Negara", ja: "マスジッド・ヌガラ" },
          note: {
            en: "On Fridays non-Muslims may visit only from 15:00 to 16:00. Robes and headscarves are lent free at the visitor entrance, a 6-minute walk from the museum.",
            ja: "金曜日の非ムスリムの見学は15:00〜16:00のみ。見学者入口でローブとスカーフを無料で借りられます。美術館から徒歩6分。",
          },
          map: mapsSearch("Masjid Negara"),
        },
        {
          start: "15:45",
          end: "16:10",
          type: "commute",
          title: { en: "National Mosque → KL Sentral", ja: "国立モスク → KLセントラル" },
          note: {
            en: "Masjid Negara → KL Sentral (walk, about 25 minutes; or one stop on the KTM Komuter from Kuala Lumpur station)",
            ja: "マスジッド・ヌガラ → KLセントラル（徒歩約25分。またはクアラルンプール駅からKTMコミューターで1駅）",
          },
        },
        {
          start: "16:10",
          end: "16:25",
          type: "logistics",
          title: { en: "Collect luggage", ja: "荷物を受け取る" },
          location: {
            en: "Dr. Locker, KL Sentral (Level 1)",
            ja: "Dr. Locker（KLセントラル1階）",
          },
          note: {
            en: "Time to buy dinner for the train before the gates; its bistro sells out. KTMB asks for 30 minutes before departure and refuses boarding from 5 minutes before. Follow the KTM Intercity signs.",
            ja: "改札に入る前に車内の夕食を調達（車内のビストロはすぐ売り切れます）。KTMBは出発30分前の到着を推奨、5分前以降は乗車不可。「KTM Intercity」の案内に従って改札へ。",
          },
          map: mapsSearch("Dr Locker KL Sentral"),
        },
        {
          start: "17:35",
          end: "21:55",
          type: "commute",
          title: { en: "KL Sentral → JB Sentral", ja: "KLセントラル → JBセントラル" },
          note: {
            en: "KL Sentral → Seremban → Gemas → Kluang → JB Sentral (ETS)",
            ja: "KLセントラル → スレンバン → グマス → クルアン → JBセントラル（ETS）",
          },
          link: "https://www.ktmb.com.my/ETS.html",
        },
        {
          start: "21:55",
          end: "22:30",
          type: "commute",
          title: { en: "JB Sentral → KSL Hotel & Resort", ja: "JBセントラル → KSLホテル＆リゾート" },
          note: {
            en: "JB Sentral → KSL City (J100 bus, every 15 minutes until 23:00, RM2.10 by cash or card) → KSL Hotel & Resort",
            ja: "JBセントラル → KSLシティ（J100バス、23:00まで15分間隔、RM2.10・現金またはカード）→ KSLホテル＆リゾート",
          },
        },
        {
          start: "22:30",
          end: "22:45",
          type: "lodging",
          title: CHECK_IN,
          location: KSL,
          map: KSL_MAP,
        },
      ],
    },
    {
      date: "2027-03-20",
      cityId: "johor-bahru",
      title: { en: "Johor Bahru, then Singapore", ja: "ジョホールバルから、シンガポールへ" },
      summary: {
        en: "Kaya toast at Hua Mui, the Royal Botanical Garden and its Japanese House, curry fish head at Kam Long, then the RTS Link across the strait and the Night Safari after dark.",
        ja: "ホアムイでカヤトーストの朝ごはん、日本家屋のあるジョホール王立植物園、カムロンのカレーフィッシュヘッド。RTSリンクで海峡を渡り、夜はナイトサファリへ。",
      },
      blocks: [
        {
          start: "07:30",
          end: "07:40",
          type: "logistics",
          title: { en: "Check out, bags to the front desk", ja: "チェックアウト・荷物をフロントへ" },
          location: KSL,
          note: {
            en: "Back for them after lunch.",
            ja: "昼食後に取りに戻ります。",
          },
          map: KSL_MAP,
        },
        {
          start: "07:45",
          end: "08:20",
          type: "commute",
          title: { en: "KSL → Johor Bahru old town", ja: "KSL → ジョホールバル旧市街" },
          note: {
            en: "KSL City → JB Sentral (J100 bus) → Restoran Hua Mui (walk)",
            ja: "KSLシティ → JBセントラル（J100バス）→ ホアムイ（徒歩）",
          },
        },
        {
          start: "08:20",
          end: "09:00",
          type: "meal",
          title: BREAKFAST,
          location: { en: "Restoran Hua Mui, Jalan Trus", ja: "ホアムイ（トラス通り）" },
          note: {
            en: "A Hainanese kopitiam since 1946: kaya butter toast and kopi.",
            ja: "1946年創業の海南系コピティアム（喫茶食堂）。カヤバタートーストとコピ（コーヒー）を。",
          },
          map: mapsSearch("Restoran Hua Mui, 131 Jalan Trus, Johor Bahru"),
        },
        {
          start: "09:00",
          end: "09:30",
          type: "commute",
          title: {
            en: "Old town → Royal Botanical Garden",
            ja: "旧市街 → ジョホール王立植物園",
          },
          note: {
            en: "Restoran Hua Mui → Menara Tabung Haji (walk, about 12 minutes) → Taman Botani Diraja Johor (the garden's shuttle, every 15 minutes)",
            ja: "ホアムイ → タブン・ハジ・タワー（徒歩約12分）→ ジョホール王立植物園（植物園のシャトル、15分間隔）",
          },
        },
        {
          start: "09:30",
          end: "10:45",
          type: "activity",
          title: {
            en: "The Royal Botanical Garden and its Japanese House",
            ja: "王立植物園と日本家屋",
          },
          location: { en: "Taman Botani Diraja Johor", ja: "ジョホール王立植物園" },
          note: {
            en: "On the Grand Palace grounds, opened in 2025. The Japanese House was a gift from the Emperor of Japan in the 1880s. Tickets online only (RM30), no walk-ins.",
            ja: "王宮の敷地に2025年に開園。日本家屋は1880年代に明治天皇から贈られたもの。チケットはオンラインのみ（RM30）、当日窓口なし。",
          },
          map: mapsSearch("Taman Botani Diraja Johor"),
          link: "https://tamanbotanidiraja.johor.gov.my/tiket/",
        },
        {
          start: "10:45",
          end: "11:15",
          type: "activity",
          title: { en: "The mosque above the strait", ja: "海峡を見下ろすモスク" },
          location: {
            en: "Sultan Abu Bakar State Mosque",
            ja: "スルタン・アブ・バカール・モスク",
          },
          note: {
            en: "About 13 minutes on foot from the garden, looking out over the Strait of Johor. Visitors are welcome outside prayer times; arms and legs covered, and women cover their hair (robes are lent at the entrance).",
            ja: "植物園から徒歩約13分、ジョホール海峡を見渡す丘の上に。礼拝時間以外は見学可。腕と脚を覆う服装で、女性は髪も覆います（入口で貸し出しあり）。",
          },
          map: mapsSearch("Masjid Sultan Abu Bakar, Jalan Gertak Merah, Johor Bahru"),
        },
        {
          start: "11:15",
          end: "11:45",
          type: "commute",
          title: { en: "Mosque → old town", ja: "モスク → 旧市街" },
          note: {
            en: "Sultan Abu Bakar State Mosque → Old Chinese Temple (walk, about 28 minutes)",
            ja: "スルタン・アブ・バカール・モスク → 柔佛古廟（徒歩約28分）",
          },
        },
        {
          start: "11:45",
          end: "12:00",
          type: "activity",
          title: { en: "Old Chinese Temple", ja: "柔佛古廟" },
          location: { en: "Jalan Trus", ja: "トラス通り" },
          note: {
            en: "Built in the 1870s and shared by five Chinese dialect groups. Free.",
            ja: "1870年代に建てられ、5つの華人方言グループが共に守ってきた古廟。入場無料。",
          },
          map: mapsSearch("Johor Bahru Old Chinese Temple, Jalan Trus"),
        },
        {
          start: "12:00",
          end: "13:00",
          type: "meal",
          title: LUNCH,
          location: {
            en: "Kam Long Ah Zai Curry Fish Head, Jalan Wong Ah Fook",
            ja: "カムロン（金龍）のカレーフィッシュヘッド",
          },
          note: {
            en: "Johor Bahru's famous curry fish head, from about RM31 a pot. Expect a queue; it can sell out by mid-afternoon.",
            ja: "ジョホールバル名物のカレーフィッシュヘッド。一鍋RM31ほどから。行列覚悟で、午後には売り切れることも。",
          },
          map: mapsSearch("Kam Long Ah Zai Curry Fish Head, 74 Jalan Wong Ah Fook, Johor Bahru"),
        },
        {
          start: "13:00",
          end: "13:20",
          type: "activity",
          title: {
            en: "Jalan Tan Hiok Nee and banana cake",
            ja: "タン・ヒオック・ニー通りとバナナケーキ",
          },
          location: { en: "Hiap Joo Bakery", ja: "ヒャップジュー・ベーカリー" },
          note: {
            en: "The old town's heritage street. Hiap Joo has baked in a wood-fired oven since 1919; the fresh banana cake comes out around noon, RM13 a box.",
            ja: "旧市街の歴史ある通り。ヒャップジューは1919年から薪窯で焼き続けるパン屋で、焼きたてのバナナケーキは昼ごろ。1箱RM13。",
          },
          map: mapsSearch("Hiap Joo Bakery, 13 Jalan Tan Hiok Nee, Johor Bahru"),
        },
        {
          start: "13:20",
          end: "14:00",
          type: "commute",
          title: { en: "Old town → KSL", ja: "旧市街 → KSL" },
          note: {
            en: "Jalan Tan Hiok Nee → JB Sentral (walk, about 14 minutes) → KSL City (J100 bus)",
            ja: "タン・ヒオック・ニー通り → JBセントラル（徒歩約14分）→ KSLシティ（J100バス）",
          },
        },
        {
          start: "14:00",
          end: "14:10",
          type: "logistics",
          title: { en: "Collect luggage", ja: "荷物を受け取る" },
          location: KSL,
          map: KSL_MAP,
        },
        {
          start: "14:10",
          end: "14:45",
          type: "commute",
          title: { en: "KSL → Bukit Chagar", ja: "KSL → ブキッ・チャガー駅" },
          note: {
            en: "KSL City → JB Sentral (J100 bus) → Bukit Chagar RTS Station (walk, about 6 minutes)",
            ja: "KSLシティ → JBセントラル（J100バス）→ ブキッ・チャガー駅（徒歩約6分）",
          },
        },
        {
          start: "14:45",
          end: "15:05",
          type: "logistics",
          title: { en: "Immigration for both countries", ja: "出国・入国審査" },
          location: { en: "Bukit Chagar RTS Station", ja: "ブキッ・チャガー駅" },
          note: {
            en: "Malaysian exit and Singapore entry both happen here, before boarding. A Japanese passport needs the free SG Arrival Card, filed in the 3 days before (from 18 March).",
            ja: "マレーシア出国とシンガポール入国の審査をどちらもこの駅で、乗車前に済ませます。日本のパスポートはSGアライバルカード（無料）を3日前から（3/18以降）提出。",
          },
          map: mapsSearch("Bukit Chagar RTS Station"),
          link: SG_ARRIVAL_CARD,
        },
        {
          start: "15:05",
          end: "15:15",
          type: "commute",
          title: { en: "Bukit Chagar → Woodlands North", ja: "ブキッ・チャガー → ウッドランズ・ノース" },
          note: {
            en: "Bukit Chagar → Woodlands North (RTS Link). If it has not opened yet: JB Sentral → Woodlands Train Checkpoint on the 15:15 Shuttle Tebrau, booked ahead with KTMB, then a 24-minute walk to Marsiling MRT.",
            ja: "ブキッ・チャガー → ウッドランズ・ノース（RTSリンク）。未開業なら、JBセントラル15:15発のシャトル・テブラウでウッドランズ駅へ（KTMBで事前予約）、マーシリンMRT駅まで徒歩24分。",
          },
        },
        {
          start: "15:15",
          end: "16:15",
          type: "commute",
          title: { en: "Woodlands North → HarbourFront", ja: "ウッドランズ・ノース → ハーバーフロント" },
          note: {
            en: "Woodlands North → Outram Park (Thomson–East Coast Line) → HarbourFront (North East Line) → Travelodge Harbourfront (walk)",
            ja: "ウッドランズ・ノース → アウトラム・パーク（トムソン・イーストコースト線）→ ハーバーフロント（北東線）→ トラベロッジ（徒歩）",
          },
        },
        {
          start: "16:15",
          end: "16:30",
          type: "lodging",
          title: CHECK_IN,
          location: TRAVELODGE,
          map: TRAVELODGE_MAP,
          link: TRAVELODGE_LINK,
        },
        {
          start: "16:30",
          end: "17:45",
          type: "commute",
          title: { en: "HarbourFront → Night Safari", ja: "ハーバーフロント → ナイトサファリ" },
          note: {
            en: "HarbourFront → Dhoby Ghaut (North East Line) → Khatib (North–South Line) → Night Safari (Mandai Khatib bus M2, every 15 minutes, S$2.50 by card only)",
            ja: "ハーバーフロント → ドービー・ゴート（北東線）→ カティブ（南北線）→ ナイトサファリ（マンダイ・カティブ・バスM2、15分間隔、S$2.50・カードのみ）",
          },
        },
        {
          start: "18:00",
          end: "19:00",
          type: "meal",
          title: DINNER,
          location: {
            en: "Ulu Ulu Safari Restaurant, Night Safari",
            ja: "ウル・ウル・サファリ・レストラン（ナイトサファリ）",
          },
          note: {
            en: "By the entrance, open from 18:00: satay, local and Indian stalls. Mandai suggests eating before going in.",
            ja: "入口の前で18:00から営業。サテ、ローカル料理、インド料理の店が並びます。入場前に食べておくのがおすすめ。",
          },
          map: mapsSearch("Ulu Ulu Safari Restaurant"),
        },
        {
          start: "19:15",
          end: "22:00",
          type: "activity",
          title: { en: "Night Safari", ja: "ナイトサファリ" },
          location: { en: "Mandai Wildlife Reserve", ja: "マンダイ・ワイルドライフ・リザーブ" },
          note: {
            en: "Tickets are timed: book the 19:15 entry (S$58). The tram is included. Creatures of the Night (19:30, 20:30, 21:30) needs a free seat booking, which opens online two hours before each show.",
            ja: "入場は時間指定制なので19:15の枠を予約（S$58）。トラムは料金に含まれます。「クリーチャーズ・オブ・ザ・ナイト」（19:30・20:30・21:30）は無料の座席予約が必要で、各回2時間前からオンラインで受付。",
          },
          map: mapsSearch("Night Safari Singapore, 80 Mandai Lake Rd"),
          link: "https://www.mandai.com/en/night-safari.html",
        },
        {
          start: "22:00",
          end: "23:15",
          type: "commute",
          title: { en: "Night Safari → HarbourFront", ja: "ナイトサファリ → ハーバーフロント" },
          note: {
            en: "Night Safari → Khatib (Mandai Khatib bus M2; the last leaves at midnight) → Dhoby Ghaut (North–South Line) → HarbourFront (North East Line)",
            ja: "ナイトサファリ → カティブ（マンダイ・カティブ・バスM2、最終0:00）→ ドービー・ゴート（南北線）→ ハーバーフロント（北東線）",
          },
        },
      ],
    },
    {
      date: "2027-03-21",
      cityId: "singapore",
      title: { en: "Sentosa, then Marina Bay at night", ja: "セントーサ島と、夜のマリーナベイ" },
      summary: {
        en: "A hawker breakfast, Universal Studios until mid-afternoon, the MegaZip down to Siloso Beach, then Gardens by the Bay and Marina Bay by night: the domes, the Supertrees' light show, the view from the SkyPark and Spectra over the water.",
        ja: "ホーカーで朝ごはん、午後までユニバーサル・スタジオ、メガジップでシロソビーチへ。夕方からはガーデンズ・バイ・ザ・ベイとマリーナベイで、ドームの温室、スーパーツリーの光のショー、スカイパークからの夜景、水上のショー「スペクトラ」。",
      },
      blocks: [
        {
          start: "08:30",
          end: "09:15",
          type: "meal",
          title: BREAKFAST,
          location: { en: "Seah Im Food Centre", ja: "シーイム・フードセンター" },
          note: {
            en: "A neighbourhood hawker centre 8 minutes' walk from the hotel; Coffee Queen does kopi and kaya toast sets.",
            ja: "ホテルから徒歩8分の地元のホーカーセンター。「コーヒークイーン」でコピとカヤトーストのセットを。",
          },
          map: mapsSearch("Seah Im Food Centre"),
        },
        {
          start: "09:15",
          end: "09:45",
          type: "commute",
          title: { en: "HarbourFront → Universal Studios", ja: "ハーバーフロント → ユニバーサル・スタジオ" },
          note: {
            en: "Seah Im Food Centre → VivoCity (walk) → Resorts World (Sentosa Express; S$4 to enter Sentosa)",
            ja: "シーイム・フードセンター → ビボシティ（徒歩）→ リゾート・ワールド駅（セントーサ・エクスプレス、入島料S$4）",
          },
        },
        {
          start: "10:00",
          end: "12:30",
          type: "activity",
          title: { en: "Universal Studios Singapore", ja: "ユニバーサル・スタジオ・シンガポール" },
          location: { en: "Resorts World Sentosa", ja: "リゾート・ワールド・セントーサ" },
          note: {
            en: "The last weekend of Singapore's school holidays, so expect crowds: Universal Express is worth it, and can only be bought together with the ticket.",
            ja: "シンガポールの学校休みの最終週末で混雑必至。ユニバーサル・エクスプレスがおすすめで、入場券と一緒にしか買えません。",
          },
          map: mapsSearch("Universal Studios Singapore"),
          link: "https://www.rwsentosa.com/en/play/universal-studios-singapore",
        },
        {
          start: "12:30",
          end: "13:15",
          type: "meal",
          title: LUNCH,
          location: {
            en: "Discovery Food Court, The Lost World",
            ja: "ディスカバリー・フードコート（ロスト・ワールド）",
          },
          note: {
            en: "Local dishes inside the park.",
            ja: "パーク内でローカル料理を。",
          },
        },
        {
          start: "13:15",
          end: "15:00",
          type: "activity",
          title: { en: "Universal Studios, the afternoon", ja: "午後もユニバーサル・スタジオ" },
          location: { en: "Resorts World Sentosa", ja: "リゾート・ワールド・セントーサ" },
          map: mapsSearch("Universal Studios Singapore"),
        },
        {
          start: "15:00",
          end: "15:30",
          type: "commute",
          title: { en: "Universal Studios → Siloso Beach", ja: "ユニバーサル・スタジオ → シロソビーチ" },
          note: {
            en: "Resorts World → Beach Station (Sentosa Express) → Mega Adventure (walk along Siloso Beach, about 11 minutes)",
            ja: "リゾート・ワールド駅 → ビーチ駅（セントーサ・エクスプレス）→ メガ・アドベンチャー（シロソビーチ沿いに徒歩約11分）",
          },
        },
        {
          start: "15:30",
          end: "16:30",
          type: "activity",
          title: { en: "MegaZip down to Siloso Beach", ja: "メガジップでシロソビーチへ" },
          location: {
            en: "Mega Adventure Park, Siloso Beach",
            ja: "メガ・アドベンチャー・パーク（シロソビーチ）",
          },
          note: {
            en: "450 metres from Imbiah Hill to the beach at up to 60 km/h. S$59; last ride 18:30. Trainers and socks, and no skirts.",
            ja: "インビア・ヒルからビーチまで450m、最高時速60km。S$59、最終18:30。スニーカーと靴下で、スカートは不可。",
          },
          map: mapsSearch("Mega Adventure Park Singapore, 10A Siloso Beach Walk"),
          link: "https://sg.megaadventure.com/",
        },
        {
          start: "16:30",
          end: "17:15",
          type: "commute",
          title: { en: "Sentosa → Gardens by the Bay", ja: "セントーサ島 → ガーデンズ・バイ・ザ・ベイ" },
          note: {
            en: "Mega Adventure → Beach Station (walk) → VivoCity (Sentosa Express) → HarbourFront → Bayfront (Circle Line)",
            ja: "メガ・アドベンチャー → ビーチ駅（徒歩）→ ビボシティ（セントーサ・エクスプレス）→ ハーバーフロント → ベイフロント（サークル線）",
          },
        },
        {
          start: "17:15",
          end: "18:45",
          type: "activity",
          title: { en: "Flower Dome and Cloud Forest", ja: "フラワードームとクラウドフォレスト" },
          location: { en: "Gardens by the Bay", ja: "ガーデンズ・バイ・ザ・ベイ" },
          note: {
            en: "The two glasshouses: a year-round flower show, and a misty mountain with an indoor waterfall. S$46 for both.",
            ja: "ふたつの温室ドーム。一年中花が咲くフラワードームと、霧に包まれた室内の滝と山のクラウドフォレスト。2館セットでS$46。",
          },
          map: mapsSearch("Cloud Forest Singapore"),
          link: GARDENS_LINK,
        },
        {
          start: "18:45",
          end: "19:35",
          type: "meal",
          title: DINNER,
          location: {
            en: "Jurassic Nest, Gardens by the Bay",
            ja: "ジュラシック・ネスト（ガーデンズ・バイ・ザ・ベイ）",
          },
          note: {
            en: "The Gardens' food hall; last orders 20:30.",
            ja: "ガーデンズ内のフードホール。ラストオーダー20:30。",
          },
          map: mapsSearch("Jurassic Nest Gardens by the Bay"),
        },
        {
          start: "19:45",
          end: "20:00",
          type: "activity",
          title: { en: "Garden Rhapsody", ja: "ガーデン・ラプソディ" },
          location: { en: "Supertree Grove", ja: "スーパーツリー・グローブ" },
          note: {
            en: "The Supertrees' light and music show. Free; again at 20:45.",
            ja: "スーパーツリーの光と音楽のショー。無料、20:45にもう一回。",
          },
          map: mapsSearch("Supertree Grove"),
          link: GARDENS_LINK,
        },
        {
          start: "20:00",
          end: "20:50",
          type: "activity",
          title: { en: "Marina Bay from the SkyPark", ja: "スカイパークからマリーナベイを一望" },
          location: {
            en: "SkyPark Observation Deck, Marina Bay Sands",
            ja: "マリーナベイ・サンズ スカイパーク展望デッキ",
          },
          note: {
            en: "Fifteen minutes' walk from the Supertrees over the Garden Bay Bridge to Hotel Tower 3. Timed tickets online, S$39 in the evening.",
            ja: "スーパーツリーからガーデン・ベイ・ブリッジを渡ってホテル棟タワー3まで徒歩15分。日時指定券をオンラインで、夜はS$39。",
          },
          map: mapsSearch("SkyPark Observation Deck"),
        },
        {
          start: "21:00",
          end: "21:15",
          type: "activity",
          title: { en: "Spectra", ja: "スペクトラ" },
          location: { en: "Event Plaza, Marina Bay Sands", ja: "マリーナベイ・サンズ イベントプラザ" },
          note: {
            en: "Light, water and music over the bay. Free; on Sundays at 20:00 and 21:00.",
            ja: "湾の上で繰り広げられる光と水と音楽のショー。無料、日曜は20:00と21:00。",
          },
          map: mapsSearch("Marina Bay Sands Event Plaza"),
        },
        {
          start: "21:15",
          end: "21:45",
          type: "commute",
          title: { en: "Marina Bay → HarbourFront", ja: "マリーナベイ → ハーバーフロント" },
          note: {
            en: "Bayfront → HarbourFront (Circle Line) → VivoCity (walk)",
            ja: "ベイフロント → ハーバーフロント（サークル線）→ ビボシティ（徒歩）",
          },
        },
        {
          start: "21:45",
          end: "22:30",
          type: "activity",
          title: { en: "A Singapore supermarket", ja: "シンガポールのスーパーマーケット" },
          location: { en: "FairPrice Xtra, VivoCity", ja: "フェアプライス・エクストラ（ビボシティ）" },
          note: {
            en: "Singapore's own chain, open until 23:00: kaya, local snacks and things to take home.",
            ja: "シンガポール発のスーパーで23:00まで営業。カヤジャムやローカルのお菓子、おみやげ探しに。",
          },
          map: mapsSearch("FairPrice Xtra VivoCity"),
        },
      ],
    },
    {
      date: "2027-03-22",
      cityId: "singapore",
      title: { en: "Kaya toast, then Changi", ja: "カヤトーストとチャンギ空港" },
      summary: {
        en: "One last kaya toast by HarbourFront, then the MRT out to Changi for the 10:45 flight.",
        ja: "ハーバーフロントで最後のカヤトーストを食べたら、MRTでチャンギ空港へ。10:45のフライト。",
      },
      blocks: [
        {
          start: "06:50",
          end: "07:00",
          type: "logistics",
          title: CHECK_OUT,
          location: TRAVELODGE,
          map: TRAVELODGE_MAP,
        },
        {
          start: "07:00",
          end: "07:25",
          type: "meal",
          title: BREAKFAST,
          location: {
            en: "Ya Kun Kaya Toast, HarbourFront Tower One",
            ja: "ヤクン・カヤトースト（ハーバーフロント・タワー1）",
          },
          note: {
            en: "Opens at 07:00 on weekdays: kaya toast, soft-boiled eggs and kopi.",
            ja: "平日は7:00開店。カヤトースト、半熟卵、コピの定番セットを。",
          },
          map: mapsSearch("Ya Kun Kaya Toast Harbourfront Tower One"),
        },
        {
          start: "07:25",
          end: "08:30",
          type: "commute",
          title: { en: "HarbourFront → Changi Airport", ja: "ハーバーフロント → チャンギ国際空港" },
          note: {
            en: "HarbourFront → Outram Park (North East Line) → Tanah Merah → Changi Airport (East–West Line)",
            ja: "ハーバーフロント → アウトラム・パーク（北東線）→ タナ・メラ → チャンギ空港（東西線）",
          },
        },
        {
          start: "08:30",
          end: "09:15",
          type: "logistics",
          title: { en: "Check in at Changi", ja: "チャンギ空港でチェックイン" },
          location: { en: "Changi Airport", ja: "チャンギ国際空港" },
          note: {
            en: "Changi asks for 2–3 hours before departure; most counters close 40–60 minutes before.",
            ja: "チャンギ空港は出発の2〜3時間前のチェックインを推奨。多くのカウンターは出発40〜60分前に締め切り。",
          },
          map: mapsSearch("Changi Airport"),
          link: "https://www.changiairport.com/en/fly/departure-guide/checking-in.html",
        },
        {
          start: "10:45",
          end: null,
          type: "commute",
          title: { en: "Flight from Changi", ja: "チャンギから出発" },
        },
      ],
    },
  ],
}
