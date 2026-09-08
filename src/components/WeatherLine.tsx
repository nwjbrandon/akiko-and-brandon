import { CloudSun } from "lucide-react"
import { useWeather } from "@/hooks/useWeather"
import { useLang } from "@/i18n/LanguageProvider"
import { cn } from "@/lib/utils"

export function WeatherLine({
  lat,
  lon,
  date,
  className,
}: {
  lat: number
  lon: number
  date: string
  className?: string
}) {
  const state = useWeather(lat, lon, date)
  const { ui } = useLang()

  if (state.status === "loading") {
    return (
      <p
        className={cn(
          "flex items-center justify-center gap-1.5 text-xs font-medium text-black/50 dark:text-white/50",
          className,
        )}
      >
        <CloudSun className="size-3.5 shrink-0" aria-hidden />
        {ui("loading")}
      </p>
    )
  }

  if (state.status === "unavailable") {
    return (
      <p
        className={cn(
          "text-xs font-medium text-black/50 dark:text-white/50",
          className,
        )}
      >
        {ui("forecastUnavailable")}
      </p>
    )
  }

  const { forecast } = state
  return (
    <p
      className={cn(
        "flex items-center justify-center gap-1.5 text-xs font-semibold text-black dark:text-white",
        className,
      )}
    >
      <CloudSun className="size-3.5 shrink-0" aria-hidden />
      <span className="tabular-nums">
        {Math.round(forecast.tempMax)}° / {Math.round(forecast.tempMin)}°C
      </span>
      <span className="font-medium opacity-80">{forecast.condition}</span>
    </p>
  )
}
