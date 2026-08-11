import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { RefreshCw, Home, ChevronDown, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

export function ErrorPage() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-5">
      <div className="flex w-full max-w-md flex-col items-center text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#d0454c]/12 text-[#b3383e]">
          <AlertTriangle className="h-9 w-9" />
        </span>
        <h1 className="mt-6 text-3xl font-bold tracking-[-0.02em] text-primary">Something went wrong</h1>
        <p className="mt-3 text-sm font-light leading-relaxed text-primary/60">
          An unexpected error occurred while loading this page. You can try reloading or head back home.
        </p>

        <button
          onClick={() => setOpen((v) => !v)}
          className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-primary/55 transition-colors hover:text-primary"
        >
          Technical details
          <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
        </button>
        {open && (
          <pre className="mt-3 w-full overflow-x-auto rounded-[--radius-brand] border border-border bg-surface/60 p-4 text-left text-xs font-light leading-relaxed text-primary/70">
{`TypeError: Cannot read properties of undefined
  at WorkshopList (app/pages/HomePage.tsx:42:18)
  at renderWithHooks (react-dom.js:15012:18)
  Error ID: 8f3a-22c1-4e90`}
          </pre>
        )}

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button variant="primary" onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4" />
            Reload page
          </Button>
          <Button variant="secondary" onClick={() => navigate("/")}>
            <Home className="h-4 w-4" />
            Go home
          </Button>
        </div>
      </div>
    </div>
  )
}
