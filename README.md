# Fukui, for Two

A three-day itinerary site for a trip to Fukui, 21–23 November 2026 — Tsuruga,
the Echizen Crab Festival, and the cliffs at Tojinbo.

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

Vite prints a local URL (http://localhost:5173 by default). Open it and the
site redirects to the overview; each day lives at `/itinerary/2026-11-21`
through `/itinerary/2026-11-23`.

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
`index.html` or a refresh on `/itinerary/2026-11-22` will 404. `vercel.json`
already sets that rewrite for Vercel; on Netlify the equivalent is a
`public/_redirects` file containing `/* /index.html 200`.

## Editing the itinerary

Everything shown on the site comes from [`src/data/itinerary.ts`](src/data/itinerary.ts),
transcribed from `Japan 202611 - 11_21-23.csv`. Each day has a `summary` and a
list of `blocks`; each block carries a start and end time, a `type`, and
optional `location`, `note` and `link`.

```ts
{
  start: "13:21",
  end: "15:05",
  type: "activity",
  title: { en: "Sightseeing", ja: "観光" },
  location: { en: "Avenue of Metasequoias", ja: "メタセコイア並木" },
}
```

Every visible string is a `{ en, ja }` pair, so adding or changing an entry
means writing both languages. Block `type` drives the icon, the label and the
card's tint; the available types are `commute`, `meal`, `activity`, `lodging`,
`meeting` and `logistics`.

Note: the source CSV labels its second day `11/21`. That is a typo for `11/22`
— the day opens by checking out of the Tsuruga hotel checked into on the 21st —
and the data file uses the corrected date.

## How a few things work

**Language.** English and Japanese, toggled from the header and remembered in
`localStorage`. With no saved preference the site guesses: the browser timezone
gives an instant hint, then it asks for location and switches to Japanese if the
device is inside Japan's bounding box. A denied or unavailable location changes
nothing — see [`src/i18n/`](src/i18n/).

**Theme.** Dark by default, light available from the header, stored in
`localStorage` and applied by an inline script in `index.html` so the page never
flashes the wrong theme on load.

**Timeline progress.** Times are treated as Japan local time. On the day you are
actually travelling, the block happening right now gets a pulsing dot, earlier
blocks fade back, and later ones stay outlined. Refreshes every minute.

**Weather.** Each day's hero fetches a forecast from Open-Meteo. Open-Meteo only
forecasts about 16 days ahead, so until November 2026 comes close this correctly
reads "Forecast not yet available".

**Printing.** The printer button opens the browser print dialog with a
print stylesheet that drops the chrome, so the itinerary saves cleanly to PDF.

## Layout

```
src/
  components/   Hero, day selector, timeline, detail sheet, header
  data/         The itinerary itself, and its types
  hooks/        Theme, clock, scroll and parallax hooks
  i18n/         Language provider, UI strings, Japan geolocation check
  lib/          Date formatting, block helpers, class-name utility
  pages/        Overview and single-day routes
```
