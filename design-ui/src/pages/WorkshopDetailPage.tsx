import { useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import {
  MapPin,
  Clock,
  Calendar,
  ArrowRight,
  Sparkles,
  Users,
  ChevronLeft,
} from "lucide-react"
import { getWorkshop, workshops, seatStatus, attendees } from "@/lib/data"
import { formatDate } from "@/lib/utils"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { SeatBadge } from "@/components/ui/SeatBadge"
import { Avatar } from "@/components/ui/Avatar"
import { WorkshopCard } from "@/components/WorkshopCard"
import { Card } from "@/components/ui/Card"
import { cn } from "@/lib/utils"
import { NotFoundPage } from "./NotFoundPage"

type Tab = "overview" | "summary" | "attendees"

export function WorkshopDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthed, openAuthModal } = useAuth()
  const [tab, setTab] = useState<Tab>("overview")

  const w = getWorkshop(id ?? "")
  if (!w) return <NotFoundPage />

  const status = seatStatus(w)
  const left = Math.max(0, w.capacity - w.registered)
  const pct = Math.round((w.registered / w.capacity) * 100)
  const related = workshops.filter((r) => r.category === w.category && r.id !== w.id).slice(0, 3)

  const onRegister = () => {
    if (!isAuthed) return openAuthModal()
    navigate(`/workshops/${w.id}/register`)
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary/60 transition-colors hover:text-secondary"
      >
        <ChevronLeft className="h-4 w-4" />
        All workshops
      </Link>

      {/* Header */}
      <div className="stagger">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="tertiary" uppercase>
            {w.category}
          </Badge>
          <Badge tone="secondary" uppercase>
            Day {w.day}
          </Badge>
          {w.price === 0 ? <Badge tone="tertiary">Free</Badge> : <Badge tone="secondary">${w.price}</Badge>}
        </div>
        <h1 className="mt-4 max-w-3xl text-balance text-[clamp(1.9rem,4vw,3.25rem)] font-bold leading-[1.02] tracking-[-0.03em] text-primary">
          {w.title}
        </h1>
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-light text-primary/65">
          <span className="inline-flex items-center gap-2">
            <Calendar className="h-4 w-4 text-secondary" />
            {formatDate(w.dateISO)}
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock className="h-4 w-4 text-secondary" />
            {w.start} – {w.end}
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-secondary" />
            {w.room}, {w.floor}
          </span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_1fr]">
        {/* Left column */}
        <div>
          {/* Tabs */}
          <div className="flex gap-1 rounded-[--radius-brand] border border-border bg-surface/60 p-1">
            <TabButton active={tab === "overview"} onClick={() => setTab("overview")}>
              Overview
            </TabButton>
            <TabButton active={tab === "summary"} onClick={() => setTab("summary")}>
              AI Summary
            </TabButton>
            <TabButton active={tab === "attendees"} onClick={() => setTab("attendees")}>
              Attendees
            </TabButton>
          </div>

          <div className="mt-6">
            {tab === "overview" && (
              <div className="animate-[fade-up_0.3s_ease-out] space-y-6">
                <div>
                  <h2 className="text-lg font-bold tracking-[-0.01em] text-primary">About this workshop</h2>
                  <p className="mt-3 text-[15px] font-light leading-relaxed text-primary/70">{w.description}</p>
                </div>
                {/* Speaker bio card */}
                <Card className="p-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-primary/45">Speaker</p>
                  <div className="flex items-start gap-4">
                    <Avatar name={w.speaker} size="lg" />
                    <div>
                      <p className="text-base font-bold text-primary">{w.speaker}</p>
                      <p className="text-sm font-medium text-secondary">{w.speakerRole}</p>
                      <p className="mt-2 text-sm font-light leading-relaxed text-primary/65">{w.speakerBio}</p>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {tab === "summary" && (
              <div className="animate-[fade-up_0.3s_ease-out] rounded-[--radius-brand] border border-tertiary/50 bg-tertiary/10 p-6">
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-[--radius-brand] bg-secondary/15 text-secondary">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-primary">AI-generated summary</p>
                    <p className="text-xs font-light text-primary/50">Generated from the speaker&apos;s uploaded materials</p>
                  </div>
                </div>
                <p className="text-[15px] font-light leading-relaxed text-primary/75">{w.aiSummary}</p>
              </div>
            )}

            {tab === "attendees" && (
              <div className="animate-[fade-up_0.3s_ease-out] overflow-hidden rounded-[--radius-brand] border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-surface/60 text-xs font-semibold uppercase tracking-[0.06em] text-primary/50">
                    <tr>
                      <th className="px-4 py-3">Attendee</th>
                      <th className="px-4 py-3">Student ID</th>
                      <th className="px-4 py-3">Registered</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {attendees.slice(0, 5).map((a) => (
                      <tr key={a.studentId} className="transition-colors hover:bg-surface/40">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <Avatar name={a.name} size="sm" />
                            <span className="font-medium text-primary">{a.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-light tabular text-primary/60">{a.studentId}</td>
                        <td className="px-4 py-3 font-light text-primary/60">{a.regTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right column — sticky register panel */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Card className="overflow-hidden p-6">
            <div className="flex items-center justify-between">
              <SeatBadge status={status} seatsLeft={left} />
              <span className="text-xs font-light text-primary/50">{w.capacity} capacity</span>
            </div>

            {/* progress */}
            <div className="mt-4">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold tabular text-primary">{w.registered}</span>
                <span className="text-sm font-light text-primary/50">/ {w.capacity} registered</span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-surface">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="mt-2 flex items-center gap-1.5 text-xs font-light text-primary/50">
                <Users className="h-3.5 w-3.5" />
                {status === "full" ? "This session is full" : `${left} seats still available`}
              </p>
            </div>

            <Button
              variant="gradient"
              size="lg"
              className="group mt-6 w-full text-base"
              onClick={onRegister}
              disabled={status === "full"}
            >
              {status === "full" ? "Join waitlist" : w.price === 0 ? "Register — Free" : `Register — $${w.price}`}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            {!isAuthed && (
              <p className="mt-3 text-center text-xs font-light text-primary/45">
                You&apos;ll be asked to sign in with your university account
              </p>
            )}
          </Card>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold tracking-[-0.02em] text-primary">Related workshops</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <WorkshopCard key={r.id} w={r} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function TabButton({
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
        "flex-1 rounded-[calc(var(--radius-brand))] px-4 py-2 text-sm font-medium transition-all",
        active ? "bg-background text-primary shadow-[0_2px_8px_rgba(49,103,95,0.12)]" : "text-primary/55 hover:text-primary",
      )}
    >
      {children}
    </button>
  )
}
