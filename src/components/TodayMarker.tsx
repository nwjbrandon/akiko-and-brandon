import type { Ref } from "react"
import { useLang } from "@/i18n/LanguageProvider"
import { formatFullDate } from "@/lib/date"
import { Badge } from "./Badge"
import { TimelineRail } from "./TimelineRail"

/** Where today falls on a rail of trips or days: a "Today" pill and the date. */
export function TodayMarker({
  ref,
  today,
  note,
  isFirst,
  isLast,
}: {
  ref?: Ref<HTMLLIElement>
  today: string
  /** Said after the date: "In 35 days". */
  note?: string
  isFirst: boolean
  isLast: boolean
}) {
  const { lang, ui } = useLang()
  return (
    <li ref={ref} className="relative flex gap-4">
      <TimelineRail
        status="future"
        isFirst={isFirst}
        isLast={isLast}
        dotClassName="border-accent bg-accent ring-4 ring-accent/25"
      />
      {/* Padded so the pill sits level with the dot. */}
      <div className="-ml-3 mb-6 flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-1 pt-[0.9375rem] sm:-ml-4 sm:pt-[1.1875rem]">
        <Badge variant="accent">{ui("today")}</Badge>
        <span className="text-sm font-semibold text-muted-foreground">
          {formatFullDate(today, lang)}
          {note ? ` · ${note}` : null}
        </span>
      </div>
    </li>
  )
}
