import { useNavigate } from "react-router-dom"
import { MapPin, Clock, ArrowUpRight } from "lucide-react"
import type { Workshop } from "@/lib/data"
import { seatStatus } from "@/lib/data"
import { formatDate } from "@/lib/utils"
import { useAuth } from "@/lib/auth"
import { Avatar } from "@/components/ui/Avatar"
import { Badge } from "@/components/ui/Badge"
import { SeatBadge } from "@/components/ui/SeatBadge"
import { Button } from "@/components/ui/Button"

export function WorkshopCard({ w }: { w: Workshop }) {
  const navigate = useNavigate()
  const { isAuthed, openAuthModal } = useAuth()
  const status = seatStatus(w)
  const seatsLeft = Math.max(0, w.capacity - w.registered)

  const handleRegister = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isAuthed) {
      openAuthModal()
      return
    }
    navigate(`/workshops/${w.id}/register`)
  }

  return (
    <article
      onClick={() => navigate(`/workshops/${w.id}`)}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-[--radius-brand] border border-border bg-background p-5 shadow-[0_4px_24px_rgba(49,103,95,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_44px_rgba(49,103,95,0.16)]"
    >
      {/* left accent stroke lights up on hover */}
      <span className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-secondary transition-transform duration-300 group-hover:scale-y-100" />

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Badge tone="tertiary" uppercase>
            {w.category}
          </Badge>
          {w.price === 0 ? (
            <Badge tone="tertiary">Free</Badge>
          ) : (
            <Badge tone="secondary">${w.price}</Badge>
          )}
        </div>
        <span className="text-xs font-medium uppercase tracking-[0.08em] text-primary/40">
          Day {w.day}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-bold leading-snug tracking-[-0.01em] text-primary line-clamp-2">
        {w.title}
      </h3>

      <div className="mt-4 flex items-center gap-2.5">
        <Avatar name={w.speaker} size="sm" />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-primary">{w.speaker}</p>
          <p className="truncate text-xs font-light text-primary/50">{w.speakerRole}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-light text-primary/60">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-secondary" />
          {formatDate(w.dateISO)} · {w.start}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-secondary" />
          {w.room}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
        <SeatBadge status={status} seatsLeft={seatsLeft} />
        <Button
          size="sm"
          variant={status === "full" ? "secondary" : "primary"}
          onClick={handleRegister}
          disabled={status === "full"}
          className="group/btn"
        >
          {status === "full" ? "Full" : "Register"}
          {status !== "full" && (
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          )}
        </Button>
      </div>
    </article>
  )
}
