import type { UnplannedTrip } from "../types"

// Dates and places only; the days are not planned yet.

export const YAMAGATA_2027: UnplannedTrip = {
  id: "yamagata-2027",
  title: { en: "Yamagata, for Two", ja: "ふたりの山形" },
  subtitle: {
    en: "Yamagata and Ginzan Onsen in the snow, with dinners in Yokohama",
    ja: "雪の山形と銀山温泉、そして横浜でのディナー",
  },
  start: "2027-02-19",
  end: "2027-02-24",
  cityIds: ["yokohama", "yamagata", "ginzan-onsen"],
}
