import { useEffect, useState } from "react"

const ENDPOINT = "https://api.open-meteo.com/v1/forecast"

const CONDITIONS: Record<number, string> = {
  0: "Clear",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Rime fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Dense drizzle",
  56: "Freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Rain",
  65: "Heavy rain",
  66: "Freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snow",
  73: "Snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Slight showers",
  81: "Showers",
  82: "Violent showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Thunderstorm with heavy hail",
}

export interface Forecast {
  tempMax: number
  tempMin: number
  condition: string
}

export type WeatherState =
  | { status: "loading" }
  | { status: "unavailable" }
  | { status: "ok"; forecast: Forecast }

/**
 * Open-Meteo only forecasts ~16 days out, so for a trip further away this
 * settles on "unavailable" — which the UI states plainly rather than hiding.
 */
export function useWeather(lat: number, lon: number, date: string) {
  const [state, setState] = useState<WeatherState>({ status: "loading" })

  useEffect(() => {
    const controller = new AbortController()
    setState({ status: "loading" })

    const url = new URL(ENDPOINT)
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
            condition: CONDITIONS[code] ?? "Conditions unavailable",
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
