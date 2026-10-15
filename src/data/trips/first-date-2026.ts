import type { Trip } from "../types"
import { LUNCH } from "./shared"

// Where it started. The light show has no end time: Wonderia was open until
// 19:00 that Tuesday, but when we left is not recorded.

export const FIRST_DATE_2026: Trip = {
  id: "first-date-2026",
  title: { en: "Our First Date", ja: "はじめてのデート" },
  subtitle: {
    en: "Where it all began: sushi by Yokohama Station, a long talk over coffee in Kannai, and a walk through Wonderia's lights",
    ja: "ふたりのはじまり。横浜駅でお寿司、関内でコーヒーを飲みながらたくさん話して、ワンダリアの光の世界へ",
  },
  scene: "plain",
  days: [
    {
      date: "2026-03-31",
      cityId: "yokohama",
      title: { en: "Where it began", ja: "はじまりの日" },
      summary: {
        en: "Conveyor-belt sushi by Yokohama Station, two hours of coffee and talking at the new BASEGATE in Kannai, then the light show at Wonderia next door.",
        ja: "横浜駅近くの回転寿司でランチ。関内にできたばかりのBASEGATEでコーヒーを飲みながら2時間おしゃべりして、そのまま隣のワンダリアで光と映像のショーへ。",
      },
      blocks: [
        {
          start: "11:00",
          end: "13:00",
          type: "meal",
          title: LUNCH,
          location: {
            en: "Mawashi Sushi Katsu, Yokohama Sky Building",
            ja: "回し寿司 活 横浜スカイビル店",
          },
          map: "https://maps.app.goo.gl/JQ7nBUMwUYxzUEg87",
          link: "https://tabelog.com/en/kanagawa/A1401/A140101/14041492/",
        },
        {
          start: "13:00",
          end: "15:00",
          type: "meal",
          title: { en: "Café and a long talk", ja: "カフェでおしゃべり" },
          location: { en: "BASEGATE Yokohama Kannai", ja: "BASEGATE横浜関内" },
          map: "https://maps.app.goo.gl/y8v1sKmDwPXX8RQz7",
          link: "https://basegate-yokohama-kannai.com/",
        },
        {
          start: "15:00",
          end: null,
          type: "activity",
          title: { en: "Light show", ja: "光と映像のショー" },
          location: { en: "Wonderia Yokohama", ja: "ワンダリア横浜" },
          map: "https://maps.app.goo.gl/5oPKTHABu9rXLN129",
          link: "https://wonderia.jp/",
        },
      ],
    },
  ],
}
