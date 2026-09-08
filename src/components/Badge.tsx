import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type Variant = "secondary" | "muted" | "accent"

const VARIANTS: Record<Variant, string> = {
  secondary: "bg-secondary text-secondary-foreground",
  muted: "bg-muted text-muted-foreground",
  accent: "bg-accent text-accent-foreground",
}

export function Badge({
  variant = "secondary",
  className,
  children,
}: {
  variant?: Variant
  className?: string
  children: ReactNode
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold",
        VARIANTS[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
