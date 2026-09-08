import { useEffect, useState } from "react"
import { nowMinutesInJapan, todayInJapan } from "@/lib/date"

/** Japan-local "now", refreshed every minute so the timeline stays honest. */
export function useNow() {
  const [now, setNow] = useState(() => ({
    today: todayInJapan(),
    minutes: nowMinutesInJapan(),
  }))

  useEffect(() => {
    const id = window.setInterval(() => {
      setNow({ today: todayInJapan(), minutes: nowMinutesInJapan() })
    }, 60_000)
    return () => window.clearInterval(id)
  }, [])

  return now
}
