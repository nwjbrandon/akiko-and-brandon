import { Navigate, Route, Routes } from "react-router-dom"
import { SiteHeader } from "@/components/SiteHeader"
import { DAYS } from "@/data/itinerary"
import { todayInJapan } from "@/lib/date"
import { DayPage } from "@/pages/DayPage"
import { OverviewPage } from "@/pages/OverviewPage"

/** The day being lived, or the first day when the trip is not underway. */
function defaultDate() {
  const today = todayInJapan()
  return DAYS.find((day) => day.date === today)?.date ?? DAYS[0].date
}

export default function App() {
  return (
    <>
      <SiteHeader />
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/itinerary" element={<Navigate to={`/itinerary/${defaultDate()}`} replace />} />
        <Route path="/itinerary/:date" element={<DayPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
