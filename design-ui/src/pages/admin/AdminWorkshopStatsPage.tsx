import { useParams, Link } from "react-router-dom"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { getWorkshop, attendees } from "../../lib/data"
import { formatDayLabel, formatMoney } from "../../lib/utils"
import { Badge } from "../../components/ui/Badge"
import { Avatar } from "../../components/ui/Avatar"
import { Button } from "../../components/ui/Button"
import { NotFoundPage } from "../NotFoundPage"
import { ChevronLeft, Download, Users, TicketCheck, Clock, DollarSign } from "lucide-react"

export function AdminWorkshopStatsPage() {
  const { id } = useParams()
  const w = getWorkshop(id ?? "")
  if (!w) return <NotFoundPage />

  const checkedIn = attendees.filter((a) => a.checkin === "Checked-in").length
  const noShow = attendees.filter((a) => a.checkin === "No-show").length
  const notYet = attendees.length - checkedIn - noShow

  const checkinData = [
    { name: "Checked in", value: checkedIn, color: "#2f9e6f" },
    { name: "Not yet", value: notYet, color: "#9fc3e3" },
    { name: "No-show", value: noShow, color: "#d0454c" },
  ]

  const revenue = w.price * w.registered

  return (
    <div className="mx-auto max-w-6xl">
      <Link
        to="/admin/workshops"
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary/60 transition hover:text-secondary"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to workshops
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4 fade-up-delayed">
        <div>
          <Badge tone="brand-2">{w.category}</Badge>
          <h1 className="mt-2 max-w-2xl text-2xl font-bold tracking-tight text-primary text-balance">{w.title}</h1>
          <p className="mt-1 text-sm text-primary/55">
            {w.speaker} · {formatDayLabel(w.day)} · {w.room}
          </p>
        </div>
        <Button variant="secondary">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={<Users className="h-5 w-5" />} label="Registered" value={`${w.registered}/${w.capacity}`} />
        <Stat icon={<TicketCheck className="h-5 w-5" />} label="Checked in" value={`${checkedIn}`} />
        <Stat icon={<Clock className="h-5 w-5" />} label="Awaiting check-in" value={`${notYet}`} />
        <Stat
          icon={<DollarSign className="h-5 w-5" />}
          label="Revenue"
          value={w.price === 0 ? "Free" : formatMoney(revenue)}
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {/* Check-in donut */}
        <div className="rounded-[--radius-brand] border border-border bg-background p-5">
          <h2 className="text-base font-semibold text-primary">Check-in breakdown</h2>
          <div className="mt-2 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={checkinData} dataKey="value" innerRadius={50} outerRadius={78} paddingAngle={3} strokeWidth={0}>
                  {checkinData.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #d3dcdd", fontSize: 13 }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendee list */}
        <div className="overflow-hidden rounded-[--radius-brand] border border-border bg-background lg:col-span-2">
          <div className="border-b border-border px-5 py-4">
            <h2 className="text-base font-semibold text-primary">Attendees</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="border-b border-border bg-surface/50 text-xs font-semibold uppercase tracking-[0.06em] text-primary/50">
                <tr>
                  <th className="px-5 py-3">Student</th>
                  <th className="px-5 py-3">Registered</th>
                  <th className="px-5 py-3">Payment</th>
                  <th className="px-5 py-3">Check-in</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {attendees.map((a) => (
                  <tr key={a.studentId} className="hover:bg-surface/40">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={a.name} size="sm" />
                        <div>
                          <p className="font-medium text-primary">{a.name}</p>
                          <p className="tabular text-xs text-primary/50">{a.studentId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-primary/60">{a.regTime}</td>
                    <td className="px-5 py-3">
                      <PaymentTag payment={a.payment} />
                    </td>
                    <td className="px-5 py-3">
                      <CheckinTag checkin={a.checkin} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-[--radius-brand] border border-border bg-background p-5">
      <span className="grid h-10 w-10 place-items-center rounded-[--radius-brand] bg-primary/8 text-primary">{icon}</span>
      <p className="mt-3 text-2xl font-bold tabular text-primary">{value}</p>
      <p className="mt-0.5 text-sm text-primary/55">{label}</p>
    </div>
  )
}

function PaymentTag({ payment }: { payment: string }) {
  if (payment === "Paid") return <Badge tone="success">Paid</Badge>
  if (payment === "Pending") return <Badge tone="warning">Pending</Badge>
  return <Badge tone="neutral">Free</Badge>
}

function CheckinTag({ checkin }: { checkin: string }) {
  if (checkin === "Checked-in") return <Badge tone="success">Checked in</Badge>
  if (checkin === "No-show") return <Badge tone="danger">No-show</Badge>
  return <Badge tone="neutral">Not yet</Badge>
}
