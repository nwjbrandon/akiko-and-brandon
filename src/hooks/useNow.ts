import { useEffect, useState } from "react"
import { JAPAN_TIME_ZONE, nowMinutesIn, todayIn } from "@/lib/date"

function readNow(timeZone: string) {
  return { today: todayIn(timeZone), minutes: nowMinutesIn(timeZone) }
}

/**
 * "Now" in a time zone (Japan unless given), refreshed every minute so the
 * timeline stays honest.
 */
export function useNow(timeZone = JAPAN_TIME_ZONE) {
  const [now, setNow] = useState(() => readNow(timeZone))

  useEffect(() => {
    const id = window.setInterval(() => setNow(readNow(timeZone)), 60_000)
    return () => window.clearInterval(id)
  }, [timeZone])

  return now
}
