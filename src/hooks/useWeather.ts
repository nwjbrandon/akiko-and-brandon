import { useEffect, useState } from "react"
import type { Localized } from "@/i18n/types"
import { todayInJapan } from "@/lib/date"

const FORECAST_ENDPOINT = "https://api.open-meteo.com/v1/forecast"
const ARCHIVE_ENDPOINT = "https://archive-api.open-meteo.com/v1/archive"

const UNKNOWN_CONDITION: Localized = { en: "Conditions unavailable", ja: "天気不明" }

const CONDITIONS: Record<number, Localized> = {
  0: { en: "Clear", ja: "快晴" },
  1: { en: "Mainly clear", ja: "晴れ" },
  2: { en: "Partly cloudy", ja: "晴れ時々曇り" },
  3: { en: "Overcast", ja: "曇り" },
  45: { en: "Fog", ja: "霧" },
  48: { en: "Rime fog", ja: "着氷性の霧" },
  51: { en: "Light drizzle", ja: "弱い霧雨" },
  53: { en: "Drizzle", ja: "霧雨" },
  55: { en: "Dense drizzle", ja: "強い霧雨" },
  56: { en: "Freezing drizzle", ja: "着氷性の霧雨" },
  57: { en: "Dense freezing drizzle", ja: "強い着氷性の霧雨" },
  61: { en: "Slight rain", ja: "小雨" },
  63: { en: "Rain", ja: "雨" },
  65: { en: "Heavy rain", ja: "大雨" },
  66: { en: "Freezing rain", ja: "着氷性の雨" },
  67: { en: "Heavy freezing rain", ja: "強い着氷性の雨" },
  71: { en: "Slight snow", ja: "小雪" },
  73: { en: "Snow", ja: "雪" },
  75: { en: "Heavy snow", ja: "大雪" },
  77: { en: "Snow grains", ja: "霧雪" },
  80: { en: "Slight showers", ja: "弱いにわか雨" },
  81: { en: "Showers", ja: "にわか雨" },
  82: { en: "Violent showers", ja: "激しいにわか雨" },
  85: { en: "Slight snow showers", ja: "弱いにわか雪" },
  86: { en: "Heavy snow showers", ja: "強いにわか雪" },
  95: { en: "Thunderstorm", ja: "雷雨" },
  96: { en: "Thunderstorm with hail", ja: "ひょうを伴う雷雨" },
  99: { en: "Thunderstorm with heavy hail", ja: "激しいひょうを伴う雷雨" },
}

export interface Forecast {
  tempMax: number
  tempMin: number
  condition: Localized
}

export type WeatherState =
  | { status: "loading" }
  | { status: "unavailable" }
  | { status: "ok"; forecast: Forecast }

/**
 * Open-Meteo only forecasts ~16 days out, so for a trip further away this
 * settles on "unavailable" — which the UI states plainly rather than hiding.
 * Days already gone come from Open-Meteo's historical archive instead, so a
 * trip we have taken shows the weather it actually had.
 */
export function useWeather(lat: number, lon: number, date: string) {
  const [state, setState] = useState<WeatherState>({ status: "loading" })

  useEffect(() => {
    const controller = new AbortController()
    setState({ status: "loading" })

    const url = new URL(date < todayInJapan() ? ARCHIVE_ENDPOINT : FORECAST_ENDPOINT)
    url.searchParams.set("latitude", String(lat))
    url.searchParams.set("longitude", String(lon))
    url.searchParams.set("daily", "temperature_2m_max,temperature_2m_min,weather_code")
    url.searchParams.set("timezone", "auto")
    url.searchParams.set("start_date", date)
    url.searchParams.set("end_date", date)

    fetch(url, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        const index = data?.daily?.time?.indexOf(date) ?? -1
        if (index < 0) return setState({ status: "unavailable" })

        const tempMax = data.daily.temperature_2m_max[index]
        const tempMin = data.daily.temperature_2m_min[index]
        const code = data.daily.weather_code[index]
        if (tempMax == null || tempMin == null || code == null) {
          return setState({ status: "unavailable" })
        }

        setState({
          status: "ok",
          forecast: {
            tempMax,
            tempMin,
            condition: CONDITIONS[code] ?? UNKNOWN_CONDITION,
          },
        })
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") return
        setState({ status: "unavailable" })
      })

    return () => controller.abort()
  }, [lat, lon, date])

  return state
}
