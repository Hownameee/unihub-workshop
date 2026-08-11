import { useState } from "react"
import { Link } from "react-router-dom"
import { workshops as seed } from "../../lib/data"
import type { Workshop } from "../../lib/data"
import { formatDayLabel, formatMoney } from "../../lib/utils"
import { Button } from "../../components/ui/Button"
import { Badge } from "../../components/ui/Badge"
import { Input } from "../../components/ui/Input"
import { Plus, Search, BarChart3, Pencil, Trash2, Users } from "lucide-react"

export function AdminWorkshopsPage() {
  const [rows, setRows] = useState<Workshop[]>(seed)
  const [q, setQ] = useState("")
  const [status, setStatus] = useState<"All" | "Published" | "Draft">("All")

  const filtered = rows.filter((w) => {
    const matchesQ =
      w.title.toLowerCase().includes(q.toLowerCase()) || w.speaker.toLowerCase().includes(q.toLowerCase())
    const matchesStatus = status === "All" ? true : w.status === status
    return matchesQ && matchesStatus
  })

  function remove(id: string) {
    setRows((prev) => prev.filter((w) => w.id !== id))
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-4 fade-up-delayed">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-primary">Workshops</h1>
          <p className="mt-1 text-sm text-primary/55">{rows.length} sessions across the event.</p>
        </div>
        <Button asChild>
          <Link to="/admin/workshops/new">
            <Plus className="h-4 w-4" />
            New workshop
          </Link>
        </Button>
      </div>

      {/* Controls */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/40" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by title or speaker…"
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {(["All", "Published", "Draft"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`rounded-[--radius-brand] px-3.5 py-2.5 text-sm font-medium transition ${
                status === s
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-background text-primary/70 hover:border-tertiary"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="mt-5 overflow-hidden rounded-[--radius-brand] border border-border bg-background">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-border bg-surface/50 text-xs font-semibold uppercase tracking-[0.06em] text-primary/50">
              <tr>
                <th className="px-5 py-3">Workshop</th>
                <th className="px-5 py-3">Schedule</th>
                <th className="px-5 py-3">Seats</th>
                <th className="px-5 py-3">Price</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((w) => {
                const pct = Math.round((w.registered / w.capacity) * 100)
                return (
                  <tr key={w.id} className="transition-colors hover:bg-surface/40">
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-primary line-clamp-1">{w.title}</p>
                      <p className="text-xs text-primary/50">{w.speaker}</p>
                    </td>
                    <td className="px-5 py-3.5 text-primary/70">
                      {formatDayLabel(w.day)}
                      <span className="block text-xs text-primary/45">
                        {w.start}–{w.end}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-surface">
                          <div
                            className="h-full rounded-full bg-secondary"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="tabular text-xs text-primary/60">
                          {w.registered}/{w.capacity}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-primary">
                      {w.price === 0 ? "Free" : formatMoney(w.price)}
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge tone={w.status === "Published" ? "success" : "neutral"}>{w.status}</Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <IconLink to={`/admin/workshops/${w.id}/stats`} label="Stats">
                          <BarChart3 className="h-4 w-4" />
                        </IconLink>
                        <IconLink to={`/admin/workshops/${w.id}/edit`} label="Edit">
                          <Pencil className="h-4 w-4" />
                        </IconLink>
                        <button
                          onClick={() => remove(w.id)}
                          aria-label="Delete"
                          className="grid h-8 w-8 place-items-center rounded-[--radius-brand] text-primary/50 transition hover:bg-[#d0454c]/10 hover:text-[#b3383e]"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center py-16 text-center">
            <Users className="h-8 w-8 text-primary/30" />
            <p className="mt-3 text-sm font-medium text-primary">No workshops match your search</p>
          </div>
        )}
      </div>
    </div>
  )
}

function IconLink({ to, label, children }: { to: string; label: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      aria-label={label}
      className="grid h-8 w-8 place-items-center rounded-[--radius-brand] text-primary/50 transition hover:bg-primary/8 hover:text-primary"
    >
      {children}
    </Link>
  )
}
