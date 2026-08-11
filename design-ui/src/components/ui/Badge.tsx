import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type Tone =
  | "brand"
  | "brand-2"
  | "brand-3"
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "warning"
  | "danger"
  | "neutral"

const tones: Record<Tone, string> = {
  brand: "bg-brand/12 text-brand",
  "brand-2": "bg-brand-2/12 text-brand-2",
  "brand-3": "bg-brand-3/25 text-[#2b5851]",
  primary: "bg-brand/12 text-brand",
  secondary: "bg-brand-2/12 text-brand-2",
  tertiary: "bg-brand-3/25 text-[#2b5851]",
  success: "bg-success/14 text-[#1f7a52]",
  warning: "bg-warning/15 text-[#a9760f]",
  danger: "bg-danger/12 text-[#b3383e]",
  neutral: "bg-surface text-ink/70",
}

export function Badge({
  children,
  tone = "neutral",
  className,
  uppercase,
}: {
  children: ReactNode
  tone?: Tone
  className?: string
  uppercase?: boolean
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        uppercase && "uppercase tracking-[0.1em] text-[0.65rem]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
