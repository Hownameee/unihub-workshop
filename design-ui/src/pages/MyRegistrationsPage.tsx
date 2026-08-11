import { useState } from "react"
import { Link } from "react-router-dom"
import { registrations as seedRegs, getWorkshop } from "../lib/data"
import type { Registration } from "../lib/data"
import { formatDayLabel, formatMoney } from "../lib/utils"
import { Button } from "../components/ui/Button"
import { Badge } from "../components/ui/Badge"
import { QrCode, MapPin, Clock, CreditCard, X, CalendarX, Calendar } from "lucide-react"

type Filter = "All" | "Confirmed" | "Pending Payment" | "Cancelled"
const FILTERS: Filter[] = ["All", "Confirmed", "Pending Payment", "Cancelled"]

export function MyRegistrationsPage() {
  const [regs, setRegs] = useState<Registration[]>(seedRegs)
  const [filter, setFilter] = useState<Filter>("All")

  const visible = regs.filter((r) => (filter === "All" ? true : r.status === filter))

  function cancel(id: string) {
    setRegs((prev) => prev.map((r) => (r.id === id ? { ...r, status: "Cancelled", checkin: "No-show" } : r)))
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <header className="fade-up-delayed">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-2">Your schedule</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-ink">My Registrations</h1>
        <p className="mt-2 text-ink-soft">Manage your seats, complete payments, and pull up your tickets.</p>
      </header>

      <div className="mt-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const count = f === "All" ? regs.length : regs.filter((r) => r.status === f).length
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                filter === f
                  ? "bg-brand text-brand-foreground"
                  : "border border-line bg-background text-ink-soft hover:border-brand-3"
              }`}
            >
              {f} <span className="tabular opacity-70">({count})</span>
            </button>
          )
        })}
      </div>

      {visible.length === 0 ? (
        <div className="mt-16 flex flex-col items-center text-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-surface text-ink-soft">
            <CalendarX className="h-8 w-8" />
          </div>
          <h2 className="mt-5 text-lg font-semibold text-ink">Nothing here yet</h2>
          <p className="mt-1 max-w-sm text-sm text-ink-soft">
            You have no {filter !== "All" ? filter.toLowerCase() : ""} registrations. Browse the catalog to find your
            next workshop.
          </p>
          <Button className="mt-6" asChild>
            <Link to="/">Explore workshops</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {visible.map((r) => {
            const w = getWorkshop(r.workshopId)
            if (!w) return null
            const cancelled = r.status === "Cancelled"
            return (
              <div
                key={r.id}
                className={`overflow-hidden rounded-brand border border-line bg-background transition ${
                  cancelled ? "opacity-60" : "hover:shadow-brand"
                }`}
              >
                <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge status={r.status} />
                      {r.checkin === "Checked-in" && <Badge tone="success">Checked in</Badge>}
                    </div>
                    <h3 className="mt-2 truncate text-lg font-semibold text-ink">
                      <Link to={`/workshops/${w.id}`} className="hover:text-brand">
                        {w.title}
                      </Link>
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-ink-soft">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        {formatDayLabel(w.day)} · {w.start}–{w.end}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        {w.room}
                      </span>
                      {w.price > 0 && (
                        <span className="inline-flex items-center gap-1.5 font-medium text-ink">
                          {formatMoney(w.price)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    {r.status === "Pending Payment" && (
                      <Button size="sm">
                        <CreditCard className="h-4 w-4" />
                        Pay now
                      </Button>
                    )}
                    {r.status === "Confirmed" && (
                      <Button size="sm" variant="secondary" asChild>
                        <Link to={`/my-registrations/${r.id}/ticket`}>
                          <QrCode className="h-4 w-4" />
                          Ticket
                        </Link>
                      </Button>
                    )}
                    {!cancelled && (
                      <Button size="sm" variant="ghost" onClick={() => cancel(r.id)}>
                        <X className="h-4 w-4" />
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: Registration["status"] }) {
  if (status === "Confirmed") return <Badge tone="success">Confirmed</Badge>
  if (status === "Pending Payment") return <Badge tone="warning">Pending payment</Badge>
  return (
    <Badge tone="danger">
      <Calendar className="mr-1 h-3 w-3" />
      Cancelled
    </Badge>
  )
}
