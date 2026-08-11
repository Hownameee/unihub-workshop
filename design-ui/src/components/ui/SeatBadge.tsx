import type { SeatStatus } from "@/lib/data"
import { cn } from "@/lib/utils"

const map: Record<SeatStatus, { dot: string; label: string; cls: string }> = {
  available: { dot: "text-[#2f9e6f]", label: "seats left", cls: "bg-[#2f9e6f]/12 text-[#237a55]" },
  low: { dot: "text-[#d99a1c]", label: "almost full", cls: "bg-[#d99a1c]/15 text-[#a9760f]" },
  full: { dot: "text-[#d0454c]", label: "full", cls: "bg-[#d0454c]/12 text-[#b3383e]" },
}

export function SeatBadge({
  status,
  seatsLeft,
  className,
}: {
  status: SeatStatus
  seatsLeft: number
  className?: string
}) {
  const s = map[status]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium",
        s.cls,
        className,
      )}
    >
      <span className={cn("relative flex h-2 w-2", s.dot)}>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
      </span>
      {status === "full" ? "Full" : `${seatsLeft} ${s.label}`}
    </span>
  )
}
