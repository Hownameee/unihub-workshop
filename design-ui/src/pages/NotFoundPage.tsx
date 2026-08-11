import { useNavigate } from "react-router-dom"
import { Home, ArrowLeft } from "lucide-react"
import { Logo } from "@/components/ui/Logo"
import { Button } from "@/components/ui/Button"

export function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-5">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(600px 400px at 50% 30%, rgba(150,198,189,0.28), transparent 60%)",
        }}
      />
      <div className="relative flex max-w-md flex-col items-center text-center">
        <Logo />
        {/* abstract geometric illustration */}
        <div className="relative mt-10 h-40 w-64">
          <div className="absolute left-6 top-4 h-24 w-24 rotate-12 rounded-[--radius-brand] bg-tertiary/50" />
          <div className="absolute right-8 top-0 h-16 w-16 -rotate-6 rounded-full bg-accent/60" />
          <div className="absolute bottom-2 left-1/2 h-20 w-20 -translate-x-1/2 rounded-[--radius-brand] bg-secondary/20" />
          <span className="absolute inset-0 flex items-center justify-center text-6xl font-bold tracking-[-0.04em] text-primary">
            404
          </span>
        </div>
        <h1 className="mt-8 text-3xl font-bold tracking-[-0.02em] text-primary">Page not found</h1>
        <p className="mt-3 text-sm font-light leading-relaxed text-primary/60">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved. Let&apos;s get you back
          on track.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button variant="primary" onClick={() => navigate("/")}>
            <Home className="h-4 w-4" />
            Go back home
          </Button>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
            Go back
          </Button>
        </div>
      </div>
    </div>
  )
}
