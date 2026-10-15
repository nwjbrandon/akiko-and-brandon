import { Link, useMatch } from "react-router-dom"
import { Heart, Moon, Printer, Sun } from "lucide-react"
import { getTrip, tripPath } from "@/data/itinerary"
import { useScrolled } from "@/hooks/useScrolled"
import { useTheme } from "@/hooks/useTheme"
import { useLang } from "@/i18n/LanguageProvider"
import { cn } from "@/lib/utils"

const BUTTON =
  "grid size-9 place-items-center rounded-full text-black/70 transition-colors hover:bg-white/25 hover:text-black dark:text-white/75 dark:hover:bg-white/10 dark:hover:text-white"

export function SiteHeader() {
  const { theme, toggleTheme } = useTheme()
  const { lang, toggleLang, ui, tx } = useLang()
  const scrolled = useScrolled()
  // Inside a trip the header names it and leads back to its overview; anywhere
  // else it names the site and leads home.
  const trip = getTrip(useMatch({ path: "/:tripId", end: false })?.params.tripId)

  return (
    <header
      className={cn(
        // Transparent over the top of the hero; a scrim once content runs beneath it.
        "no-print fixed inset-x-0 top-0 z-50 h-(--header-height) transition-colors duration-200",
        scrolled && "border-b border-border/60 bg-background/80 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-full max-w-[480px] items-center justify-between px-4 sm:px-6">
        <Link
          to={trip ? tripPath(trip) : "/"}
          className="flex items-center gap-1.5 text-base font-extrabold tracking-tight text-black drop-shadow-sm dark:text-white"
        >
          <Heart className="size-4 fill-current text-primary" aria-hidden />
          {trip ? tx(trip.title) : ui("siteName")}
        </Link>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggleLang}
            aria-label={ui("switchLanguage")}
            className="rounded-full px-2.5 py-1.5 text-xs font-extrabold tracking-wide text-black/70 transition-colors hover:bg-white/25 hover:text-black dark:text-white/75 dark:hover:bg-white/10 dark:hover:text-white"
          >
            {lang === "ja" ? "EN" : "日本語"}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            aria-label={ui("print")}
            className={BUTTON}
          >
            <Printer className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? ui("toLight") : ui("toDark")}
            className={BUTTON}
          >
            {theme === "dark" ? (
              <Sun className="size-5" aria-hidden />
            ) : (
              <Moon className="size-5" aria-hidden />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
