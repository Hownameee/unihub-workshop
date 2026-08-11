import { useState } from "react"
import { Avatar } from "../components/ui/Avatar"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Bell, Mail, Shield, Trash2 } from "lucide-react"

export function SettingsPage() {
  const [notifyEmail, setNotifyEmail] = useState(true)
  const [notifyReminders, setNotifyReminders] = useState(true)
  const [notifyDigest, setNotifyDigest] = useState(false)

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <header className="fade-up-delayed">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-2">Account</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-ink">Settings</h1>
        <p className="mt-2 text-ink-soft">Manage your profile and notification preferences.</p>
      </header>

      <section className="mt-8 rounded-brand border border-line bg-background p-6">
        <div className="flex items-center gap-4">
          <Avatar name="Alex Morgan" size="lg" />
          <div>
            <p className="text-lg font-semibold text-ink">Alex Morgan</p>
            <p className="text-sm text-ink-soft">alex.morgan@fpt.edu.vn</p>
          </div>
          <Button variant="ghost" size="sm" className="ml-auto">
            Change photo
          </Button>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Input label="Full name" defaultValue="Alex Morgan" />
          <Input label="Student ID" defaultValue="SE180234" />
          <Input label="University email" defaultValue="alex.morgan@fpt.edu.vn" type="email" />
          <Input label="Phone" defaultValue="+84 90 123 4567" />
        </div>

        <div className="mt-6 flex justify-end">
          <Button>Save changes</Button>
        </div>
      </section>

      <section className="mt-6 rounded-brand border border-line bg-background p-6">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-brand-2" />
          <h2 className="text-base font-semibold text-ink">Notifications</h2>
        </div>
        <div className="mt-4 divide-y divide-line">
          <Toggle
            icon={<Mail className="h-4 w-4" />}
            title="Registration confirmations"
            desc="Get an email each time you register or cancel."
            on={notifyEmail}
            onChange={setNotifyEmail}
          />
          <Toggle
            icon={<Bell className="h-4 w-4" />}
            title="Workshop reminders"
            desc="A nudge one hour before each session begins."
            on={notifyReminders}
            onChange={setNotifyReminders}
          />
          <Toggle
            icon={<Mail className="h-4 w-4" />}
            title="Weekly digest"
            desc="A summary of newly added workshops every Monday."
            on={notifyDigest}
            onChange={setNotifyDigest}
          />
        </div>
      </section>

      <section className="mt-6 rounded-brand border border-danger/25 bg-danger/[0.04] p-6">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-danger" />
          <h2 className="text-base font-semibold text-ink">Danger zone</h2>
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-soft">
            Delete your account and remove all registration history. This cannot be undone.
          </p>
          <Button variant="danger" size="sm" className="shrink-0">
            <Trash2 className="h-4 w-4" />
            Delete account
          </Button>
        </div>
      </section>
    </div>
  )
}

function Toggle({
  icon,
  title,
  desc,
  on,
  onChange,
}: {
  icon: React.ReactNode
  title: string
  desc: string
  on: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-brand bg-surface text-ink-soft">
          {icon}
        </span>
        <div>
          <p className="font-medium text-ink">{title}</p>
          <p className="text-sm text-ink-soft">{desc}</p>
        </div>
      </div>
      <button
        role="switch"
        aria-checked={on}
        aria-label={title}
        onClick={() => onChange(!on)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? "bg-brand" : "bg-line"}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-background shadow transition-all ${
            on ? "left-[22px]" : "left-0.5"
          }`}
        />
      </button>
    </div>
  )
}
