import { Link } from "react-router-dom"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
} from "recharts"
import {
  Users,
  CalendarCheck,
  TicketCheck,
  TrendingUp,
  ArrowUpRight,
  Plus,
} from "lucide-react"
import { CountUp } from "../../components/ui/CountUp"
import { Badge } from "../../components/ui/Badge"
import { Button } from "../../components/ui/Button"
import { Avatar } from "../../components/ui/Avatar"
import { workshops, registrationTrend, recentRegistrations } from "../../lib/data"

const totalRegistrations = workshops.reduce((s, w) => s + w.registered, 0)
const totalCapacity = workshops.reduce((s, w) => s + w.capacity, 0)
const fillRate = Math.round((totalRegistrations / totalCapacity) * 100)

const categoryData = Object.entries(
  workshops.reduce<Record<string, number>>((acc, w) => {
    acc[w.category] = (acc[w.category] ?? 0) + w.registered
    return acc
  }, {}),
).map(([name, value]) => ({ name, value }))

const barColors = ["#31675f", "#1697bd", "#96c6bd", "#9fc3e3", "#2f9e6f", "#d99a1c"]

export function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-4 fade-up-delayed">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-primary">Dashboard</h1>
          <p className="mt-1 text-sm text-primary/55">A live pulse on Skills &amp; Career Week 2026.</p>
        </div>
        <Button asChild>
          <Link to="/admin/workshops/new">
            <Plus className="h-4 w-4" />
            New workshop
          </Link>
        </Button>
      </div>

      {/* Stat cards */}
      <div className="mt-6 grid gap-4 stagger sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={<Users className="h-5 w-5" />} label="Total registrations" value={totalRegistrations} trend="+12%" />
        <Stat icon={<CalendarCheck className="h-5 w-5" />} label="Active workshops" value={workshops.filter((w) => w.status === "Published").length} trend="+3" />
        <Stat icon={<TrendingUp className="h-5 w-5" />} label="Seat fill rate" value={fillRate} suffix="%" trend="+5%" />
        <Stat icon={<TicketCheck className="h-5 w-5" />} label="Checked in" value={1284} trend="+218" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {/* Trend chart */}
        <div className="rounded-[--radius-brand] border border-border bg-background p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-primary">Registrations over the week</h2>
            <Badge tone="brand-2">Daily</Badge>
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={registrationTrend} margin={{ left: -20, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="reg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1697bd" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#1697bd" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#d3dcdd" vertical={false} />
                <XAxis dataKey="day" stroke="#5a726d" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#5a726d" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #d3dcdd",
                    fontSize: 13,
                    boxShadow: "0 8px 24px rgba(49,103,95,0.12)",
                  }}
                />
                <Area type="monotone" dataKey="registrations" stroke="#1697bd" strokeWidth={2.5} fill="url(#reg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category bars */}
        <div className="rounded-[--radius-brand] border border-border bg-background p-5">
          <h2 className="text-base font-semibold text-primary">By category</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ left: 8, right: 16 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" width={92} stroke="#5a726d" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: "rgba(150,198,189,0.15)" }} contentStyle={{ borderRadius: 8, border: "1px solid #d3dcdd", fontSize: 13 }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={16}>
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={barColors[i % barColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="mt-6 rounded-[--radius-brand] border border-border bg-background">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-base font-semibold text-primary">Recent registrations</h2>
          <Link to="/admin/workshops" className="inline-flex items-center gap-1 text-sm font-medium text-secondary hover:underline">
            View all
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <ul className="divide-y divide-border">
          {recentRegistrations.map((r, i) => (
            <li key={i} className="flex items-center gap-4 px-5 py-3.5">
              <Avatar name={r.name} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-primary">{r.name}</p>
                <p className="truncate text-xs text-primary/50">{r.workshop}</p>
              </div>
              <StatusTag status={r.status} />
              <span className="hidden w-20 text-right text-xs text-primary/45 sm:block">{r.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Stat({
  icon,
  label,
  value,
  suffix,
  trend,
}: {
  icon: React.ReactNode
  label: string
  value: number
  suffix?: string
  trend: string
}) {
  return (
    <div className="rounded-[--radius-brand] border border-border bg-background p-5">
      <div className="flex items-center justify-between">
        <span className="grid h-10 w-10 place-items-center rounded-[--radius-brand] bg-primary/8 text-primary">{icon}</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-success/12 px-2 py-0.5 text-xs font-semibold text-[#1f7a52]">
          <ArrowUpRight className="h-3 w-3" />
          {trend}
        </span>
      </div>
      <p className="mt-4 text-3xl font-bold tabular text-primary">
        <CountUp to={value} />
        {suffix}
      </p>
      <p className="mt-1 text-sm text-primary/55">{label}</p>
    </div>
  )
}

function StatusTag({ status }: { status: string }) {
  if (status === "Confirmed") return <Badge tone="success">Confirmed</Badge>
  if (status === "Pending Payment") return <Badge tone="warning">Pending</Badge>
  return <Badge tone="danger">Cancelled</Badge>
}
