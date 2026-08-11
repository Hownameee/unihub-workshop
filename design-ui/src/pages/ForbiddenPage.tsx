import { useNavigate } from "react-router-dom"
import { ShieldAlert, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function ForbiddenPage() {
  const navigate = useNavigate()
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-5">
      <div className="flex max-w-md flex-col items-center text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#d99a1c]/12 text-[#a9760f]">
          <ShieldAlert className="h-9 w-9" />
        </span>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-primary/45">Error 403</p>
        <h1 className="mt-2 text-3xl font-bold tracking-[-0.02em] text-primary">Access denied</h1>
        <p className="mt-3 text-sm font-light leading-relaxed text-primary/60">
          You don&apos;t have permission to access this page.
        </p>
        <div className="mt-4 rounded-[--radius-brand] border border-tertiary/50 bg-tertiary/10 px-4 py-3 text-sm font-light text-primary/70">
          This area is for <span className="font-semibold text-primary">Organizers</span> only. Ask an
          administrator to grant you access.
        </div>
        <Button variant="primary" className="mt-7" onClick={() => navigate("/")}>
          <ArrowLeft className="h-4 w-4" />
          Go back
        </Button>
      </div>
    </div>
  )
}
