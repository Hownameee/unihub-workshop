import { useParams, useNavigate, Link } from "react-router-dom"
import { QRCodeSVG } from "qrcode.react"
import { registrations, getWorkshop } from "../lib/data"
import { formatDayLabel } from "../lib/utils"
import { Logo } from "../components/ui/Logo"
import { NotFoundPage } from "./NotFoundPage"
import { ChevronLeft, MapPin, Clock, User, ShieldCheck } from "lucide-react"

export function TicketPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const reg = registrations.find((r) => r.id === id)
  const w = reg ? getWorkshop(reg.workshopId) : undefined

  if (!reg || !w) return <NotFoundPage />

  const payload = JSON.stringify({ reg: reg.id, ws: w.id, sid: "SE180234" })

  return (
    <div className="grid min-h-screen place-items-center bg-brand px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex items-center justify-between text-brand-foreground/80">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-sm font-medium transition hover:text-brand-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>
          <Logo variant="light" />
        </div>

        <div className="overflow-hidden rounded-brand bg-background shadow-brand-lg">
          {/* Header */}
          <div className="px-6 pb-5 pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-2">Admission ticket</p>
            <h1 className="mt-2 text-xl font-bold leading-snug text-ink text-balance">{w.title}</h1>
          </div>

          {/* Perforation */}
          <div className="relative">
            <div className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-brand" />
            <div className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-brand" />
            <div className="mx-6 border-t-2 border-dashed border-line" />
          </div>

          {/* QR */}
          <div className="flex flex-col items-center px-6 py-7">
            <div className="rounded-brand border border-line bg-surface-2 p-4">
              <QRCodeSVG value={payload} size={176} bgColor="transparent" fgColor="#31675f" level="M" />
            </div>
            <p className="mt-4 font-mono text-xs tracking-widest text-ink-soft">{reg.id.toUpperCase()}-SE180234</p>
          </div>

          {/* Details */}
          <div className="space-y-3 border-t border-line px-6 py-5 text-sm">
            <Detail icon={<User className="h-4 w-4" />} label="Attendee" value="Alex Morgan · SE180234" />
            <Detail
              icon={<Clock className="h-4 w-4" />}
              label="When"
              value={`${formatDayLabel(w.day)} · ${w.start}–${w.end}`}
            />
            <Detail icon={<MapPin className="h-4 w-4" />} label="Where" value={`${w.room}, ${w.floor}`} />
          </div>

          <div className="flex items-center justify-center gap-1.5 bg-surface-2 py-3 text-xs text-ink-soft">
            <ShieldCheck className="h-3.5 w-3.5" />
            Present this QR at the door for check-in
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-brand-foreground/70">
          Can&apos;t make it?{" "}
          <Link to="/my-registrations" className="font-medium text-brand-foreground underline underline-offset-2">
            Manage registration
          </Link>
        </p>
      </div>
    </div>
  )
}

function Detail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-brand bg-brand/10 text-brand">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wider text-ink-soft">{label}</p>
        <p className="truncate font-medium text-ink">{value}</p>
      </div>
    </div>
  )
}
