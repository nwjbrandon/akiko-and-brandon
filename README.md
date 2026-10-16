# Akiko & Brandon

Itineraries for our trips, day by day:

- **Our First Date**, 31 March 2026: sushi by Yokohama Station, coffee at
  BASEGATE Yokohama Kannai, and the light show at Wonderia Yokohama.
- **Matsumoto, for Two**, 11–16 August 2026: a day at Tokyo DisneySea, then
  Matsumoto Castle, the Lake Suwa fireworks and a morning in Kamikochi.
- **Fukui, for Two**, 20–24 November 2026: Tsuruga, the Echizen Crab Festival,
  the Ichijōdani ruins and Eiheiji temple, with a dinner in Yokohama either side.
- **Malaysia & Singapore, for Two**, 18–22 March 2027: the Petronas Towers, Batu
  Caves and the National Mosque in Kuala Lumpur, a morning in Johor Bahru, then
  Universal Studios, the Night Safari and Marina Bay in Singapore.

And one still to plan, with its dates and places set:

- **Yamagata, for Two**, 19–24 February 2027: Yamagata and Ginzan Onsen, with
  dinners in Yokohama.

Built with React 19, TypeScript, Vite and Tailwind CSS v4.

## Requirements

- Node.js — the version is pinned in `.nvmrc`. With [nvm](https://github.com/nvm-sh/nvm):

  ```bash
  nvm use
  ```

  Vite 8 needs at least Node 20.19 or 22.12, so any recent version works if you
  are not using nvm.
- Yarn 1 (Classic)

## Setup

```bash
yarn install
```

## Run

```bash
yarn dev
```

Vite prints a local URL (http://localhost:5173 by default). It opens on a
timeline of the trips. Each trip's overview lives at `/<trip-id>` (for example
`/fukui-2026`) and each day at `/<trip-id>/<date>` (for example
`/fukui-2026/2026-11-22`). `/itinerary` jumps to today's day when a trip is
underway, or else to the first day of the next trip. Links from before there
were several trips, `/itinerary/<date>`, still work: they redirect to the day's
new address.

## Other commands

| Command        | What it does                               |
| -------------- | ------------------------------------------ |
| `yarn dev`     | Dev server with hot reload                 |
| `yarn build`   | Typecheck (`tsc -b`) then build to `dist/` |
| `yarn preview` | Serve the production build locally         |
| `yarn lint`    | Run oxlint                                 |

## Deploying

The build in `dist/` is a static single-page app, so any static host works.
Because routing happens in the browser, the host must rewrite unknown paths to
`index.html` or a refresh on `/fukui-2026/2026-11-22` will 404. Both common
hosts are covered: `public/_redirects` sets that rewrite for Netlify (Vite
copies it into `dist/`), and `vercel.json` does the same for Vercel.

## Editing the itinerary

Each trip is its own file in [`src/data/trips/`](src/data/trips/), and
[`src/data/itinerary.ts`](src/data/itinerary.ts) lists them. A trip has an `id`
(its URL slug), a `title` and `subtitle`, a hero `scene`, and its `days` in date
order; the first and last days are the trip's dates.

- [`first-date-2026.ts`](src/data/trips/first-date-2026.ts): written from what
  we remember of the day, with its map links.
- [`matsumoto-2026.ts`](src/data/trips/matsumoto-2026.ts): transcribed from the
  plan as written, with the places, links and routes looked up afterwards.
- [`fukui-2026.ts`](src/data/trips/fukui-2026.ts): the 21st–23rd are transcribed
  from `Japan 202611 - 11_21-23.csv`; the Yokohama dinners on the 20th and 24th
  were added by hand.
- [`yamagata-2027.ts`](src/data/trips/yamagata-2027.ts): dates and places only,
  not planned yet.
- [`malaysia-singapore-2027.ts`](src/data/trips/malaysia-singapore-2027.ts):
  planned in October 2026 around the flights, hotels and train already booked.
  Opening hours, prices and routes were checked then; the comment at the top of
  the file lists what to re-check the week before.

Each day has a `summary`, a `cityId` (the place in
[`src/data/cities.ts`](src/data/cities.ts) its weather forecast comes from, and
whose time zone its times are in) and a list of `blocks`. Each block carries a
start and end time (`end: null` reads as "onwards"), a `type`, and optional
`location`, `note` (the route, for travel; a tip, for anything else), `map` (a
Google Maps link) and `link` (a reference page such as Tabelog or the official
site).

```ts
{
  start: "13:21",
  end: "15:05",
  type: "activity",
  title: { en: "Sightseeing", ja: "観光" },
  location: { en: "Avenue of Metasequoias", ja: "メタセコイア並木" },
  map: "https://maps.app.goo.gl/NJMhFGfbmzcNMZX1A",
}
```

A block's `map` also pins it on the day's map, which needs the place's
coordinates: [`src/data/places.ts`](src/data/places.ts) gives them for each
link, written the same way the trip writes it, a short link as it is and a
search link as the same `mapsSearch("…")` call:

```ts
"https://maps.app.goo.gl/NJMhFGfbmzcNMZX1A": [35.48747, 136.03723], // Avenue of Metasequoias
[mapsSearch("松本城")]: [36.23865, 137.96887],
```

To find a place's coordinates, right-click it in Google Maps: the first line of
the menu is its latitude and longitude, and clicking it copies them. Until a
link has its line, its block is left off the map and the dev console says so. A
journey (`type: "commute"`) is never pinned, even with a `map`.

A journey can also say how we go, with `by`: `"train"` (the default), `"bus"`,
`"walk"` or `"plane"`, which sets its icon. The journey that takes us on to the
trip's next city also says `hop: true`, and the trip page then shows that hop
between the days with its date and time. Mark one journey for each hop, or
none: the marks are paired with the hops in order, so a missing or extra one
leaves every hop unmarked, and the dev console says so.

To add a trip, copy one of the trip files, give it a new `id`, add any new
places to `cities.ts`, and list it in `TRIPS` in `itinerary.ts`. The home page
timeline and the routes pick it up from there.

A trip whose days are not planned yet gives only its dates and places, in place
of `scene` and `days`:

```ts
export const YAMAGATA_2027: UnplannedTrip = {
  id: "yamagata-2027",
  title: { en: "Yamagata, for Two", ja: "ふたりの山形" },
  subtitle: { en: "…", ja: "…" },
  start: "2027-02-19",
  end: "2027-02-24",
  cityIds: ["yokohama", "yamagata", "ginzan-onsen"],
}
```

It sits on the home timeline with a dashed edge and a "Not planned yet" pill,
and its page says the plan is still to come. To plan it, swap `start`, `end` and
`cityIds` for `days`, add a `scene`, and type it as a `PlannedTrip`.

Every visible string is a `{ en, ja }` pair, so adding or changing an entry
means writing both languages. Block `type` drives the icon, the label and the
card's tint; the available types are `commute`, `meal`, `activity`, `lodging`,
`meeting` and `logistics`.

Note: the Fukui CSV labels its second day `11/21`. That is a typo for `11/22`
— the day opens by checking out of the Tsuruga hotel checked into on the 21st —
and the data file uses the corrected date.

## How a few things work

**Home timeline.** The trips run down one rail in date order, under a heading
for each year. A marker shows where today falls between them; a trip underway
gets the pulsing dot instead. Past trips shrink to a line or two and fade back.
The trip underway, or else the next one, gets a larger card with the days to go
and its first plan (or which day of the trip today is) and its stops from city
to city; the trips after it count down the days to their start. Once the list is
longer than the screen, the page opens scrolled to that point, with the trips
before it above and the trips to come below.

**Trip page.** Under the map on a phone, and beside it on a wide screen, where
the map stays in view as the days scroll past, the days run down a rail like
the home page's. Each day's card has a thin bar showing the shape of the day,
each plan as long as it lasts and coloured by its kind, and between the days
sit the hops to each new city. Before the trip a marker at the top counts down
to it; during it, today's card gets the pulsing dot.

**Language.** English and Japanese, toggled from the header and remembered in
`localStorage`. With no saved preference the site guesses: the browser timezone
gives an instant hint, then it asks for location and switches to Japanese if the
device is inside Japan's bounding box. A denied or unavailable location changes
nothing — see [`src/i18n/`](src/i18n/).

**Theme.** Dark by default, light available from the header, stored in
`localStorage` and applied by an inline script in `index.html` so the page never
flashes the wrong theme on load.

**Day timeline progress.** Times are local to the day's place: each city in
`cities.ts` carries its time zone, so Kuala Lumpur and Singapore run an hour
behind Japan. On the day you are actually travelling, the block happening right now gets a pulsing dot, earlier
blocks fade back, and later ones stay outlined. Refreshes every minute.

**Weather.** Each day's hero fetches a forecast from Open-Meteo. Open-Meteo only
forecasts about 16 days ahead, so until a trip comes close this correctly reads
"Forecast not yet available". Days already gone use Open-Meteo's historical
archive instead, so a past trip shows the weather it actually had.

**Maps.** Each trip's page has a map with a numbered pin for each of its
cities, in the order the trip reaches them, each named beside its pin and
opening on the days spent there. Each day's page has one with a numbered pin
for each place the day goes, opening on what we do there and when, with a link
to Google Maps. A place we come back to, like the hotel, keeps one pin, and so
do places within about 75 m of each other, like a shop inside the building
before it. Each plan on the day's timeline with a place has a "Show on the map"
button carrying its pin's number, which zooms the map in on that pin and opens
it. On a phone the map comes first; on a wide screen it sits beside the timeline
and stays in view as the timeline scrolls past. The button in the map's corner
opens it over the whole screen; Escape or "Close the map" puts it back. Inline
on a phone, one finger scrolls the page past the map and two move it; opened
up, it takes both. The maps are drawn with [Leaflet](https://leafletjs.com/) on
OpenStreetMap's own tiles, which need no key, and the dark theme darkens the
tiles with a CSS filter. Their tile server asks sites to keep traffic light,
which a site for two easily does. See
[`src/components/PinMap.tsx`](src/components/PinMap.tsx) and
[`src/lib/maps.ts`](src/lib/maps.ts).

**Printing.** The printer button opens the browser print dialog with a
print stylesheet that drops the chrome, so the itinerary saves cleanly to PDF.

## Layout

```
src/
  components/   Hero, day selector, timeline, detail sheet, header, map
  data/         The trips (one file each in trips/), places, and types
  hooks/        Theme, clock, scroll and parallax hooks
  i18n/         Language provider, UI strings, Japan geolocation check
  lib/          Date formatting, block helpers, map pins, class-name utility
  pages/        Home timeline, trip overview, and single-day routes
```
