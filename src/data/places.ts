/**
 * Where each Google Maps short link points, written as a search Google can
 * place. A short link only opens in Maps itself, but the embedded maps need
 * the place by name, so a block whose `map` is a short link missing here is
 * left off its day's map. Search links made with `mapsSearch` need no entry.
 */
export const SHORT_LINK_PLACES: Record<string, string> = {
  // Yokohama
  "https://maps.app.goo.gl/moK2cCDyWn3SPAW87": "Doutor Coffee Shop, Yokohama Station",
  "https://maps.app.goo.gl/JQ7nBUMwUYxzUEg87": "Mawashizushi KATSU, Yokohama Sky Building",
  "https://maps.app.goo.gl/y8v1sKmDwPXX8RQz7": "BASEGATE Yokohama Kannai",
  "https://maps.app.goo.gl/5oPKTHABu9rXLN129": "Wonderia Yokohama",
  "https://maps.app.goo.gl/gxoma1AdJTmyiJap7": "Sisiliya, Kannai, Yokohama",
  "https://maps.app.goo.gl/hmmwYKCeXER3VtbK7": "Unagi Yondaime Kikukawa, Yokohama Bay Quarter",
  "https://maps.app.goo.gl/ugeqbSDTdiuCAiDV6": "THE YOKOHAMA BAY, The Tower Yokohama Kitanaka",
  "https://maps.app.goo.gl/dKXzD2JTHVzgwvT66": "Araiya, Sogo Yokohama",

  // Matsumoto
  "https://maps.app.goo.gl/XDPRsNnK2FWFrehB7": "うなぎ割烹 桜家 松本",

  // Tsuruga and Fukui. Both links to the Avenue of Metasequoias are the same
  // place, so the day's map shows it once.
  "https://maps.app.goo.gl/wWWnXj6HG3LYspV46": "Dormy Inn Tsuruga",
  "https://maps.app.goo.gl/zYQ78dYUZr9t39dv7": "Avenue of Metasequoias, Takashima",
  "https://maps.app.goo.gl/NJMhFGfbmzcNMZX1A": "Avenue of Metasequoias, Takashima",
  "https://maps.app.goo.gl/BzcXZkNRrm9SHryz6": "Kehi-jingu Shrine, Tsuruga",
  "https://maps.app.goo.gl/SZ8QcsLqqYPr8ydi6": "Fukui Station",
  "https://maps.app.goo.gl/7eH8sETNF1oP9TnE8": "Roadside Station Echizen",
  "https://maps.app.goo.gl/MYWFwLYVuKHboFJg8": "Hotel Riverge Akebono, Fukui",
  "https://maps.app.goo.gl/teLYodFrnSidtMKq5": "Ichijōdani Asakura Clan Ruins",
  "https://maps.app.goo.gl/zewbjjW6Lu2Fc8Tz6": "Daihonzan Eiheiji",

  // Johor Bahru
  "https://maps.app.goo.gl/z1FzvQUDfFxxSXXX6": "Pin Ming Xuan (HQ KSL), Johor Bahru",
}
