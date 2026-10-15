import { Navigate, Route, Routes, useParams } from "react-router-dom"
import { SiteHeader } from "@/components/SiteHeader"
import { TRIPS, dayPath, findDay, isPlanned, tripPath, tripStart } from "@/data/itinerary"
import { todayInJapan } from "@/lib/date"
import { DayPage } from "@/pages/DayPage"
import { HomePage } from "@/pages/HomePage"
import { TripPage } from "@/pages/TripPage"

/**
 * The day being lived, else the first day of the next trip (its overview, if
 * it is not planned yet), else home.
 */
function currentPath() {
  const today = todayInJapan()
  const live = findDay(today)
  if (live) return dayPath(live.trip, today)
  const next = TRIPS.find((trip) => tripStart(trip) > today)
  if (!next) return "/"
  return isPlanned(next) ? dayPath(next, tripStart(next)) : tripPath(next)
}

/** Days used to live at /itinerary/:date; keep those links working. */
function LegacyDayRedirect() {
  const { date = "" } = useParams()
  const found = findDay(date)
  return <Navigate to={found ? dayPath(found.trip, date) : "/"} replace />
}

export default function App() {
  return (
    <>
      <SiteHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/itinerary" element={<Navigate to={currentPath()} replace />} />
        <Route path="/itinerary/:date" element={<LegacyDayRedirect />} />
        <Route path="/:tripId" element={<TripPage />} />
        <Route path="/:tripId/:date" element={<DayPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
