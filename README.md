# Akiko & Brandon

Itineraries for our trips around Japan, day by day:

- **Our First Date**, 31 March 2026: sushi by Yokohama Station, coffee at
  BASEGATE Yokohama Kannai, and the light show at Wonderia Yokohama.
- **Matsumoto, for Two**, 11–16 August 2026: a day at Tokyo DisneySea, then
  Matsumoto Castle, the Lake Suwa fireworks and a morning in Kamikochi.
- **Fukui, for Two**, 20–24 November 2026: Tsuruga, the Echizen Crab Festival,
  the Ichijōdani ruins and Eiheiji temple, with a dinner in Yokohama either side.

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

Each day has a `summary`, a `cityId` (the place in
[`src/data/cities.ts`](src/data/cities.ts) its weather forecast comes from) and
a list of `blocks`. Each block carries a start and end time (`end: null` reads
as "onwards"), a `type`, and optional `location`, `note` (the route, for travel),
`map` (a Google Maps link) and `link` (a reference page such as Tabelog or the
official site).

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

To add a trip, copy one of the trip files, give it a new `id`, add any new
places to `cities.ts`, and list it in `TRIPS` in `itinerary.ts`. The home page
timeline and the routes pick it up from there.

Every visible string is a `{ en, ja }` pair, so adding or changing an entry
means writing both languages. Block `type` drives the icon, the label and the
card's tint; the available types are `commute`, `meal`, `activity`, `lodging`,
`meeting` and `logistics`.

Note: the Fukui CSV labels its second day `11/21`. That is a typo for `11/22`
— the day opens by checking out of the Tsuruga hotel checked into on the 21st —
and the data file uses the corrected date.

## How a few things work

**Home timeline.** The trips run down one rail in date order. A marker shows
where today falls between them; a trip underway gets the pulsing dot instead,
past trips fade back, and each upcoming trip counts down the days to its start.

**Language.** English and Japanese, toggled from the header and remembered in
`localStorage`. With no saved preference the site guesses: the browser timezone
gives an instant hint, then it asks for location and switches to Japanese if the
device is inside Japan's bounding box. A denied or unavailable location changes
nothing — see [`src/i18n/`](src/i18n/).

**Theme.** Dark by default, light available from the header, stored in
`localStorage` and applied by an inline script in `index.html` so the page never
flashes the wrong theme on load.

**Day timeline progress.** Times are treated as Japan local time. On the day you are
actually travelling, the block happening right now gets a pulsing dot, earlier
blocks fade back, and later ones stay outlined. Refreshes every minute.

**Weather.** Each day's hero fetches a forecast from Open-Meteo. Open-Meteo only
forecasts about 16 days ahead, so until a trip comes close this correctly reads
"Forecast not yet available". Days already gone use Open-Meteo's historical
archive instead, so a past trip shows the weather it actually had.

**Printing.** The printer button opens the browser print dialog with a
print stylesheet that drops the chrome, so the itinerary saves cleanly to PDF.

## Layout

```
src/
  components/   Hero, day selector, timeline, detail sheet, header
  data/         The trips (one file each in trips/), places, and types
  hooks/        Theme, clock, scroll and parallax hooks
  i18n/         Language provider, UI strings, Japan geolocation check
  lib/          Date formatting, block helpers, class-name utility
  pages/        Home timeline, trip overview, and single-day routes
```
