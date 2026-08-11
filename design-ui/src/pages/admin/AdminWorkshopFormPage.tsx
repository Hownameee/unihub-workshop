import { useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getWorkshop, CATEGORIES } from "../../lib/data"
import { Button } from "../../components/ui/Button"
import { Input, Textarea, Field } from "../../components/ui/Input"
import { ChevronLeft, Sparkles, Save } from "lucide-react"

export function AdminWorkshopFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const existing = id ? getWorkshop(id) : undefined
  const editing = Boolean(existing)

  const [aiLoading, setAiLoading] = useState(false)
  const [summary, setSummary] = useState(existing?.aiSummary ?? "")
  const [saving, setSaving] = useState(false)
  const [isPaid, setIsPaid] = useState((existing?.price ?? 0) > 0)

  function generate() {
    setAiLoading(true)
    setTimeout(() => {
      setSummary(
        "This workshop guides attendees through a practical, hands-on curriculum with clear takeaways. Participants leave with an actionable framework, real examples worked through live, and templates they can reuse immediately.",
      )
      setAiLoading(false)
    }, 1600)
  }

  function save() {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      navigate("/admin/workshops")
    }, 1200)
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/admin/workshops"
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary/60 transition hover:text-secondary"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to workshops
      </Link>

      <div className="fade-up-delayed">
        <h1 className="text-2xl font-bold tracking-tight text-primary">
          {editing ? "Edit workshop" : "Create workshop"}
        </h1>
        <p className="mt-1 text-sm text-primary/55">
          {editing ? "Update the details below and save your changes." : "Fill in the details to add a new session."}
        </p>
      </div>

      <div className="mt-6 space-y-6 rounded-[--radius-brand] border border-border bg-background p-6">
        <Field label="Workshop title">
          <Input defaultValue={existing?.title} placeholder="e.g. Mastering the Technical Interview" />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Speaker name">
            <Input defaultValue={existing?.speaker} placeholder="Full name" />
          </Field>
          <Field label="Speaker role">
            <Input defaultValue={existing?.speakerRole} placeholder="Title, Company" />
          </Field>
        </div>

        <Field label="Description">
          <Textarea defaultValue={existing?.description} placeholder="What will attendees learn and do?" />
        </Field>

        {/* AI summary generator */}
        <div className="rounded-[--radius-brand] border border-tertiary/50 bg-tertiary/10 p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-[--radius-brand] bg-secondary/15 text-secondary">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-primary">AI summary</p>
                <p className="text-xs text-primary/50">Draft an attendee-facing summary from the description.</p>
              </div>
            </div>
            <Button size="sm" variant="secondary" onClick={generate} loading={aiLoading}>
              {aiLoading ? "Generating…" : "Generate"}
            </Button>
          </div>
          {summary && !aiLoading && (
            <p className="mt-4 rounded-[--radius-brand] bg-background/70 p-3 text-sm leading-relaxed text-primary/75">
              {summary}
            </p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Category">
            <select
              defaultValue={existing?.category}
              className="w-full rounded-[--radius-brand] border border-border bg-surface/50 px-3.5 py-2.5 text-sm text-primary focus:border-secondary focus:bg-background focus:outline-none focus:ring-2 focus:ring-secondary/30"
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Room">
            <Input defaultValue={existing?.room} placeholder="e.g. Lab 204" />
          </Field>
          <Field label="Capacity">
            <Input type="number" defaultValue={existing?.capacity ?? 60} min={1} />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Date">
            <Input type="date" defaultValue={existing?.dateISO ?? "2026-09-14"} />
          </Field>
          <Field label="Start time">
            <Input type="time" defaultValue={existing?.start ?? "09:00"} />
          </Field>
          <Field label="End time">
            <Input type="time" defaultValue={existing?.end ?? "10:30"} />
          </Field>
        </div>

        {/* Pricing */}
        <div>
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.08em] text-primary/60">Pricing</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsPaid(false)}
              className={`flex-1 rounded-[--radius-brand] border px-4 py-3 text-sm font-medium transition ${
                !isPaid ? "border-secondary bg-secondary/10 text-secondary" : "border-border text-primary/60"
              }`}
            >
              Free
            </button>
            <button
              type="button"
              onClick={() => setIsPaid(true)}
              className={`flex-1 rounded-[--radius-brand] border px-4 py-3 text-sm font-medium transition ${
                isPaid ? "border-secondary bg-secondary/10 text-secondary" : "border-border text-primary/60"
              }`}
            >
              Paid
            </button>
          </div>
          {isPaid && (
            <div className="mt-3">
              <Input type="number" defaultValue={existing?.price || 15} min={1} placeholder="Price in USD" />
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        <Button variant="ghost" onClick={() => navigate("/admin/workshops")}>
          Cancel
        </Button>
        <Button onClick={save} loading={saving}>
          <Save className="h-4 w-4" />
          {editing ? "Save changes" : "Create workshop"}
        </Button>
      </div>
    </div>
  )
}
