import { mapsSearch } from "./trips/shared"

/** A spot on the map: latitude, then longitude. */
export type Coordinates = [lat: number, lng: number]

/**
 * Where each block's map link points, for the day's map to pin it. The keys are
 * the links as the trips write them: a maps.app.goo.gl short link as it is, a
 * search link as the same `mapsSearch` call. A block whose link is missing
 * here is left off its day's map, and the dev console says so.
 *
 * To find a place's coordinates, right-click it in Google Maps: the first line
 * of the menu is its latitude and longitude, and clicking it copies them.
 */
export const PLACES: Record<string, Coordinates> = {
  // Yokohama
  "https://maps.app.goo.gl/JQ7nBUMwUYxzUEg87": [35.46459, 139.62482], // Mawashi Sushi Katsu, Yokohama Sky Building
  "https://maps.app.goo.gl/y8v1sKmDwPXX8RQz7": [35.44408, 139.63784], // BASEGATE Yokohama Kannai
  "https://maps.app.goo.gl/5oPKTHABu9rXLN129": [35.44379, 139.63745], // Wonderia Yokohama
  "https://maps.app.goo.gl/moK2cCDyWn3SPAW87": [35.46535, 139.62274], // Yokohama Station
  "https://maps.app.goo.gl/dKXzD2JTHVzgwvT66": [35.46543, 139.62509], // Araiya, Sogo Yokohama
  "https://maps.app.goo.gl/gxoma1AdJTmyiJap7": [35.44613, 139.63927], // Sisiliya, Kannai
  "https://maps.app.goo.gl/hmmwYKCeXER3VtbK7": [35.46643, 139.62716], // Unagi Yondaime Kikukawa, Yokohama Bay Quarter
  "https://maps.app.goo.gl/ugeqbSDTdiuCAiDV6": [35.45101, 139.63599], // THE YOKOHAMA BAY, The Tower Yokohama Kitanaka 46F

  // Tokyo DisneySea
  [mapsSearch("ファンタジースプリングス 東京ディズニーシー")]: [35.62874, 139.87819],
  [mapsSearch("アメリカンウォーターフロント 東京ディズニーシー")]: [35.62396, 139.88717],
  [mapsSearch("アラビアンコースト 東京ディズニーシー")]: [35.62818, 139.88300],

  // Matsumoto and Kamikochi
  [mapsSearch("東横INN松本駅東口")]: [36.22972, 137.96586],
  "https://maps.app.goo.gl/XDPRsNnK2FWFrehB7": [36.23568, 137.97122], // Unagi Kappo Sakuraya
  [mapsSearch("松本城")]: [36.23865, 137.96887],
  [mapsSearch("諏訪市湖畔公園")]: [36.04978, 138.11257],
  [mapsSearch("松本駅")]: [36.23076, 137.96442],
  [mapsSearch("河童橋 上高地")]: [36.24888, 137.63778],
  [mapsSearch("四柱神社 松本")]: [36.23504, 137.97038],

  // Tsuruga
  "https://maps.app.goo.gl/wWWnXj6HG3LYspV46": [35.64948, 136.07269], // Dormy Inn Tsuruga Natural Hot Spring
  [mapsSearch("敦賀ヨーロッパ軒 本店 敦賀市相生町2-7")]: [35.65607, 136.07024],
  "https://maps.app.goo.gl/NJMhFGfbmzcNMZX1A": [35.48747, 136.03723], // Avenue of Metasequoias
  "https://maps.app.goo.gl/BzcXZkNRrm9SHryz6": [35.65478, 136.07472], // Kehi-jingu Shrine
  [mapsSearch("まるさん屋 敦賀駅前 敦賀市白銀町6-41")]: [35.64619, 136.07370],

  // Fukui
  "https://maps.app.goo.gl/SZ8QcsLqqYPr8ydi6": [36.06218, 136.22338], // Fukui Station
  "https://maps.app.goo.gl/7eH8sETNF1oP9TnE8": [35.91986, 135.99701], // Roadside Station Echizen
  [mapsSearch("魚心 福井市文京6")]: [36.07611, 136.19749],
  "https://maps.app.goo.gl/MYWFwLYVuKHboFJg8": [36.06225, 136.21425], // Hotel Riverge Akebono
  "https://maps.app.goo.gl/teLYodFrnSidtMKq5": [35.99946, 136.29593], // Ichijōdani Asakura Clan Ruins
  "https://maps.app.goo.gl/zewbjjW6Lu2Fc8Tz6": [36.05659, 136.35688], // Daihonzan Eiheiji
  [mapsSearch("ヨーロッパ軒 総本店 福井市順化1-7-4")]: [36.06407, 136.21478],

  // Kuala Lumpur
  [mapsSearch("KLIA Terminal 2")]: [2.74285, 101.68642],
  [mapsSearch("ibis Kuala Lumpur City Centre")]: [3.16322, 101.71455],
  [mapsSearch("Lake Symphony KLCC Park")]: [3.15645, 101.71309],
  [mapsSearch("Wong Ah Wah Restaurant Jalan Alor")]: [3.14495, 101.70798],
  [mapsSearch("Dr Locker KL Sentral")]: [3.13373, 101.68686],
  [mapsSearch("Batu Caves")]: [3.23788, 101.68404],
  [mapsSearch("Sri Mahamariamman Temple Kuala Lumpur")]: [3.14339, 101.69650],
  [mapsSearch("Kwai Chai Hong")]: [3.14147, 101.69761],
  [mapsSearch("Lai Foong Lala Noodles")]: [3.14461, 101.69874],
  [mapsSearch("Islamic Arts Museum Malaysia")]: [3.14185, 101.69000],
  [mapsSearch("Masjid Negara")]: [3.14198, 101.69176],

  // Johor Bahru
  [mapsSearch("KSL Hotel & Resort, 33 Jalan Seladang, Johor Bahru")]: [1.48603, 103.76300],
  "https://maps.app.goo.gl/z1FzvQUDfFxxSXXX6": [1.48520, 103.76074], // Pin Ming Xuan (HQ KSL), Jalan Serigala
  [mapsSearch("Bukit Chagar RTS Station")]: [1.46611, 103.76244],

  // Singapore
  [mapsSearch("Night Safari Singapore, 80 Mandai Lake Rd")]: [1.40219, 103.78806],
  [mapsSearch("Changi Airport")]: [1.35860, 103.98994],
  [mapsSearch("Travelodge Harbourfront Singapore, 50 Telok Blangah Rd")]: [1.26618, 103.82377],
  [mapsSearch("Maxwell Food Centre")]: [1.28034, 103.84477],
  [mapsSearch("Seah Im Food Centre")]: [1.26665, 103.81903],
  [mapsSearch("Universal Studios Singapore")]: [1.25404, 103.82381],
  [mapsSearch("Mega Adventure Park Singapore, 10A Siloso Beach Walk")]: [1.25594, 103.81230],
  [mapsSearch("Cloud Forest Singapore")]: [1.28387, 103.86600],
  [mapsSearch("Jurassic Nest Gardens by the Bay")]: [1.28124, 103.86440],
  [mapsSearch("Supertree Grove")]: [1.28196, 103.86391],
  [mapsSearch("SkyPark Observation Deck")]: [1.28520, 103.86103],
  [mapsSearch("Marina Bay Sands Event Plaza")]: [1.28442, 103.85829],
  [mapsSearch("FairPrice Xtra VivoCity")]: [1.26423, 103.82294],
  [mapsSearch("Ya Kun Kaya Toast Harbourfront Tower One")]: [1.26474, 103.81941],

}
