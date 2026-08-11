import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { recentScans as seedScans } from "../lib/data"
import { Logo } from "../components/ui/Logo"
import { Avatar } from "../components/ui/Avatar"
import { ArrowLeft, ScanLine, Check, X, CheckCircle2 } from "lucide-react"

interface Scan {
  name: string
  studentId: string
  time: string
  ok: boolean
}

const pool = [
  { name: "Linh Dang", studentId: "SE180777", ok: true },
  { name: "Bao Nguyen", studentId: "SE180311", ok: true },
  { name: "Expired ticket", studentId: "—", ok: false },
  { name: "Trang Vo", studentId: "SE179220", ok: true },
  { name: "Minh Le", studentId: "SE180540", ok: true },
]

export function CheckinPage() {
  const navigate = useNavigate()
  const [scans, setScans] = useState<Scan[]>(seedScans)
  const [flash, setFlash] = useState<null | "ok" | "err">(null)
  const [count, setCount] = useState(seedScans.filter((s) => s.ok).length)
  const idx = useRef(0)

  function simulateScan() {
    const next = pool[idx.current % pool.length]
    idx.current += 1
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    setScans((prev) => [{ ...next, time }, ...prev].slice(0, 8))
    setFlash(next.ok ? "ok" : "err")
    if (next.ok) setCount((c) => c + 1)
    setTimeout(() => setFlash(null), 700)
  }

  useEffect(() => {
    const t = setInterval(simulateScan, 3200)
    return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-primary text-primary-foreground">
      <header className="flex items-center justify-between px-6 py-4">
        <button
          onClick={() => navigate("/admin")}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-foreground/80 transition hover:text-primary-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Console
        </button>
        <Logo variant="light" showText={false} />
        <div className="text-right">
          <p className="text-xs uppercase tracking-wider text-primary-foreground/60">Checked in</p>
          <p className="tabular text-lg font-bold">{count}</p>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-5xl flex-1 gap-8 px-6 py-6 lg:grid-cols-2">
        {/* Scanner viewport */}
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-primary-foreground/60">
            Skills &amp; Career Week
          </p>
          <h1 className="mt-1 text-2xl font-bold">Door Check-in</h1>

          <div className="relative mt-8 aspect-square w-full max-w-xs overflow-hidden rounded-2xl border-2 border-primary-foreground/20 bg-black/20">
            {/* corner frames */}
            <Corner className="left-3 top-3 border-l-2 border-t-2" />
            <Corner className="right-3 top-3 border-r-2 border-t-2" />
            <Corner className="bottom-3 left-3 border-b-2 border-l-2" />
            <Corner className="bottom-3 right-3 border-b-2 border-r-2" />

            {/* scan line */}
            <div className="absolute inset-x-6 top-6 h-0.5 animate-[scanline_2.4s_ease-in-out_infinite] bg-accent shadow-[0_0_12px_var(--color-accent)]" />

            <div className="absolute inset-0 grid place-items-center">
              {flash === "ok" ? (
                <Check className="h-20 w-20 text-success" strokeWidth={2.5} />
              ) : flash === "err" ? (
                <X className="h-20 w-20 text-danger" strokeWidth={2.5} />
              ) : (
                <ScanLine className="h-16 w-16 text-primary-foreground/40" />
              )}
            </div>
          </div>

          <button
            onClick={simulateScan}
            className="mt-8 inline-flex items-center gap-2 rounded-[--radius-brand] bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary transition hover:brightness-95 active:scale-[0.97]"
          >
            <ScanLine className="h-4 w-4" />
            Simulate scan
          </button>
          <p className="mt-3 text-xs text-primary-foreground/50">Point a ticket QR at the camera to check a student in.</p>
        </div>

        {/* Live feed */}
        <div className="rounded-2xl bg-primary-foreground/8 p-5 backdrop-blur">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            Live feed
          </div>
          <ul className="mt-4 space-y-2">
            {scans.map((s, i) => (
              <li
                key={i}
                className="flex items-center gap-3 rounded-[--radius-brand] bg-primary-foreground/8 px-3 py-2.5 animate-[fade-up_0.4s_ease-out]"
              >
                {s.ok ? (
                  <Avatar name={s.name} size="sm" />
                ) : (
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-danger/25 text-danger">
                    <X className="h-4 w-4" />
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{s.name}</p>
                  <p className="tabular text-xs text-primary-foreground/50">{s.studentId}</p>
                </div>
                {s.ok ? (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-success">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    In
                  </span>
                ) : (
                  <span className="text-xs font-medium text-danger">Invalid</span>
                )}
                <span className="tabular text-xs text-primary-foreground/40">{s.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function Corner({ className }: { className: string }) {
  return <span className={`absolute h-6 w-6 rounded-[3px] border-accent ${className}`} />
}
