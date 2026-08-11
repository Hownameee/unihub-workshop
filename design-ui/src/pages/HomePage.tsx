import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Search, Calendar, ArrowRight } from "lucide-react"
import { workshops, CATEGORIES, seatStatus, type Workshop } from "@/lib/data"
import { formatDate } from "@/lib/utils"
import { WorkshopCard } from "@/components/WorkshopCard"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { SeatBadge } from "@/components/ui/SeatBadge"
import { Avatar } from "@/components/ui/Avatar"
import { CountUp } from "@/components/ui/CountUp"
import { WaveDivider } from "@/components/ui/WaveDivider"
import { cn } from "@/lib/utils"

const DAYS = [1, 2, 3, 4, 5]

export function HomePage() {
  const [query, setQuery] = useState("")
  const [day, setDay] = useState<number | null>(null)
  const [category, setCategory] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return workshops.filter((w) => {
      const matchQuery =
        !query ||
        w.title.toLowerCase().includes(query.toLowerCase()) ||
        w.speaker.toLowerCase().includes(query.toLowerCase())
      const matchDay = !day || w.day === day
      const matchCat = !category || w.category === category
      return matchQuery && matchDay && matchCat
    })
  }, [query, day, category])

  const totalSeats = workshops.reduce((a, w) => a + w.capacity, 0)
  const totalRegistered = workshops.reduce((a, w) => a + w.registered, 0)

  return (
    <div>
      <Hero query={query} setQuery={setQuery} totalSeats={totalSeats} totalReg={totalRegistered} />

      <WaveDivider fill="color-mix(in srgb, var(--color-surface) 40%, transparent)" className="-mt-1" />

      {/* Filters + Grid */}
      <section id="schedule" className="bg-surface/40 pb-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-col gap-6 pt-14">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary">
                  The full programme
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-primary md:text-4xl">
                  Browse every workshop
                </h2>
              </div>
              <p className="text-sm font-light text-primary/55">
                Showing <span className="font-semibold text-primary">{filtered.length}</span> of{" "}
                {workshops.length} sessions
              </p>
            </div>

            {/* Filter bar */}
            <div className="flex flex-col gap-4 rounded-[--radius-brand] border border-border bg-background p-4 shadow-[0_4px_24px_rgba(49,103,95,0.06)]">
              <FilterRow label="Day">
                <Chip active={day === null} onClick={() => setDay(null)}>
                  All days
                </Chip>
                {DAYS.map((d) => (
                  <Chip key={d} active={day === d} onClick={() => setDay(d)}>
                    Day {d}
                  </Chip>
                ))}
              </FilterRow>
              <div className="h-px bg-border" />
              <FilterRow label="Topic">
                <Chip active={category === null} onClick={() => setCategory(null)}>
                  All topics
                </Chip>
                {CATEGORIES.map((c) => (
                  <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
                    {c}
                  </Chip>
                ))}
              </FilterRow>
            </div>
          </div>

          {/* Masonry-style grid */}
          {filtered.length > 0 ? (
            <div className="stagger mt-8 columns-1 gap-6 sm:columns-2 xl:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
              {filtered.map((w) => (
                <WorkshopCard key={w.id} w={w} />
              ))}
            </div>
          ) : (
            <div className="mt-16 flex flex-col items-center justify-center rounded-[--radius-brand] border border-dashed border-border bg-background py-20 text-center">
              <Search className="h-8 w-8 text-primary/30" />
              <p className="mt-4 text-lg font-semibold text-primary">No workshops match your filters</p>
              <p className="mt-1 text-sm font-light text-primary/50">Try clearing a filter or searching a different topic.</p>
              <Button
                variant="secondary"
                size="sm"
                className="mt-5"
                onClick={() => {
                  setQuery("")
                  setDay(null)
                  setCategory(null)
                }}
              >
                Reset filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function Hero({
  query,
  setQuery,
  totalSeats,
  totalReg,
}: {
  query: string
  setQuery: (v: string) => void
  totalSeats: number
  totalReg: number
}) {
  const preview = workshops.slice(0, 4)
  return (
    <section className="relative overflow-hidden">
      {/* radial depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1000px 520px at 15% -5%, rgba(150,198,189,0.28), transparent 60%), radial-gradient(760px 460px at 100% 10%, rgba(159,195,227,0.24), transparent 55%)",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 pb-16 pt-14 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24 lg:pt-20">
        {/* Left: headline + CTA */}
        <div className="stagger max-w-xl">
          <Badge tone="secondary" uppercase className="mb-5">
            <Calendar className="h-3 w-3" />
            Sep 14–18, 2026
          </Badge>
          <h1 className="text-balance text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.98] tracking-[-0.04em] text-primary">
            Skills &amp; Career{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Week
            </span>
          </h1>
          <p className="mt-5 max-w-md text-lg font-light leading-relaxed text-primary/60">
            Five days of hands-on workshops led by industry mentors. Find your session, reserve a seat,
            and walk in with a QR ticket.
          </p>

          {/* Search */}
          <div className="mt-7 flex items-center gap-2 rounded-[--radius-brand] border border-border bg-background p-2 shadow-[0_8px_30px_rgba(49,103,95,0.1)]">
            <div className="flex flex-1 items-center gap-2.5 pl-2.5">
              <Search className="h-5 w-5 shrink-0 text-primary/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search workshops or speakers…"
                className="w-full bg-transparent py-2 text-sm text-primary placeholder:text-primary/40 focus:outline-none"
                aria-label="Search workshops"
              />
            </div>
            <Button
              variant="gradient"
              size="md"
              className="group"
              onClick={() => document.getElementById("schedule")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explore
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>

          {/* Stat strip */}
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
            <Stat value={<CountUp to={workshops.length} />} label="Workshops" />
            <Stat value={<><CountUp to={totalReg} />+</>} label="Registered" />
            <Stat value={<CountUp to={totalSeats} />} label="Total seats" />
          </div>
        </div>

        {/* Right: staggered card mosaic */}
        <div className="relative hidden lg:block">
          <MosaicCard w={preview[0]} className="translate-y-2" delay={0} />
          <div className="mt-5 grid grid-cols-2 gap-5">
            <MosaicCard w={preview[1]} className="translate-y-6" delay={90} compact />
            <MosaicCard w={preview[2]} className="-translate-y-2" delay={160} compact />
          </div>
          <MosaicCard w={preview[3]} className="mt-5" delay={230} />
        </div>
      </div>
    </section>
  )
}

function MosaicCard({
  w,
  className,
  delay,
  compact,
}: {
  w: Workshop
  className?: string
  delay: number
  compact?: boolean
}) {
  const navigate = useNavigate()
  const status = seatStatus(w)
  const left = Math.max(0, w.capacity - w.registered)
  return (
    <button
      onClick={() => navigate(`/workshops/${w.id}`)}
      style={{ animationDelay: `${delay}ms` }}
      className={cn(
        "animate-[fade-up_0.7s_cubic-bezier(0.22,1,0.36,1)_both] group block w-full rounded-[--radius-brand] border border-border bg-background/80 p-4 text-left shadow-[0_8px_30px_rgba(49,103,95,0.1)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(49,103,95,0.18)]",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <Badge tone="tertiary" uppercase>
          Day {w.day}
        </Badge>
        <SeatBadge status={status} seatsLeft={left} />
      </div>
      <h3 className={cn("mt-3 font-bold leading-snug tracking-[-0.01em] text-primary", compact ? "text-sm line-clamp-2" : "text-base line-clamp-2")}>
        {w.title}
      </h3>
      {!compact && (
        <div className="mt-3 flex items-center gap-2">
          <Avatar name={w.speaker} size="sm" />
          <div>
            <p className="text-sm font-medium text-primary">{w.speaker}</p>
            <p className="text-xs font-light text-primary/50">{formatDate(w.dateISO)} · {w.start}</p>
          </div>
        </div>
      )}
    </button>
  )
}

function Stat({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div>
      <p className="text-3xl font-bold tracking-[-0.02em] text-primary">{value}</p>
      <p className="text-xs font-medium uppercase tracking-[0.1em] text-primary/45">{label}</p>
    </div>
  )
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <span className="w-16 shrink-0 text-xs font-semibold uppercase tracking-[0.1em] text-primary/45">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full px-3.5 py-1.5 text-xs font-medium transition-all active:scale-95",
        active
          ? "bg-primary text-primary-foreground shadow-[0_2px_8px_rgba(49,103,95,0.25)]"
          : "bg-surface text-primary/70 hover:bg-tertiary/40",
      )}
    >
      {children}
    </button>
  )
}
