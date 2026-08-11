import { useMemo, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getWorkshop, seatStatus } from "../lib/data"
import { formatMoney, formatDayLabel } from "../lib/utils"
import { Button } from "../components/ui/Button"
import { SeatBadge } from "../components/ui/SeatBadge"
import { NotFoundPage } from "./NotFoundPage"
import { Check, CreditCard, ChevronLeft, ShieldCheck, Ticket } from "lucide-react"

export function RegisterPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const workshop = getWorkshop(id ?? "")
  const [agree, setAgree] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const isPaid = useMemo(() => (workshop ? workshop.price > 0 : false), [workshop])

  if (!workshop) return <NotFoundPage />

  function submit() {
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setDone(true)
    }, 1400)
  }

  if (done) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-6 text-center">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-success/12 text-success">
          <Check className="h-10 w-10" strokeWidth={2.5} />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-ink">You&apos;re registered</h1>
        <p className="mt-2 text-ink-soft">
          {isPaid
            ? "Your seat is reserved. Complete payment from My Registrations to confirm."
            : "Your seat is confirmed. A ticket with your QR code is ready."}
        </p>
        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={() => navigate("/my-registrations")}>
            <Ticket className="h-4 w-4" />
            View my registrations
          </Button>
          <Button variant="ghost" onClick={() => navigate("/")}>
            Browse more workshops
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Link
        to={`/workshops/${workshop.id}`}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition hover:text-brand"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to workshop
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="fade-up-delayed">
          <h1 className="text-3xl font-bold tracking-tight text-ink text-balance">Confirm your registration</h1>
          <p className="mt-2 text-ink-soft">Review the details below and secure your seat.</p>

          <div className="mt-8 space-y-5">
            <Field label="Full name" value="Alex Morgan" />
            <Field label="Student ID" value="SE180234" />
            <Field label="University email" value="alex.morgan@fpt.edu.vn" />
          </div>

          {isPaid && (
            <div className="mt-8 rounded-brand border border-line bg-surface-2 p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                <CreditCard className="h-4 w-4 text-brand-2" />
                Payment required
              </div>
              <p className="mt-1.5 text-sm text-ink-soft">
                This workshop costs {formatMoney(workshop.price)}. You can reserve your seat now and pay within 24 hours
                to confirm it.
              </p>
            </div>
          )}

          <label className="mt-8 flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-0.5 h-5 w-5 rounded border-line accent-brand"
            />
            <span className="text-sm text-ink-soft">
              I understand that seats are limited and agree to the event code of conduct. I will cancel in advance if I
              can no longer attend.
            </span>
          </label>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-brand border border-line bg-background shadow-brand">
            <div className="bg-brand p-5 text-brand-foreground">
              <p className="text-xs font-medium uppercase tracking-wider text-brand-foreground/70">{workshop.category}</p>
              <h2 className="mt-1.5 text-lg font-semibold leading-snug text-balance">{workshop.title}</h2>
            </div>
            <div className="space-y-3 p-5 text-sm">
              <Row label="Speaker" value={workshop.speaker} />
              <Row label="When" value={`${formatDayLabel(workshop.day)} · ${workshop.start}–${workshop.end}`} />
              <Row label="Where" value={`${workshop.room}, ${workshop.floor}`} />
              <div className="flex items-center justify-between">
                <span className="text-ink-soft">Seats</span>
                <SeatBadge status={seatStatus(workshop)} seatsLeft={workshop.capacity - workshop.registered} />
              </div>
              <div className="border-t border-line pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-ink-soft">Price</span>
                  <span className="text-xl font-bold text-ink">
                    {workshop.price === 0 ? "Free" : formatMoney(workshop.price)}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-5 pt-0">
              <Button className="w-full" disabled={!agree || submitting} loading={submitting} onClick={submit}>
                {isPaid ? "Reserve seat" : "Confirm registration"}
              </Button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-ink-soft">
                <ShieldCheck className="h-3.5 w-3.5" />
                Secured with your university account
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-ink-soft">{label}</label>
      <div className="mt-1.5 rounded-brand border border-line bg-surface-2 px-4 py-3 text-sm font-medium text-ink">
        {value}
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-ink-soft">{label}</span>
      <span className="text-right font-medium text-ink">{value}</span>
    </div>
  )
}
