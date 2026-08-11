import { useEffect } from "react"
import { X, ArrowRight, ShieldCheck } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { Logo } from "@/components/ui/Logo"
import { Button } from "@/components/ui/Button"

export function AuthModal() {
  const { authModalOpen, closeAuthModal, login } = useAuth()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeAuthModal()
    if (authModalOpen) {
      document.addEventListener("keydown", onKey)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [authModalOpen, closeAuthModal])

  if (!authModalOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-title"
    >
      <div
        className="absolute inset-0 animate-[fade-up_0.2s_ease-out] bg-[rgba(49,103,95,0.18)] backdrop-blur-sm"
        onClick={closeAuthModal}
      />
      <div className="relative w-full animate-[fade-up_0.35s_cubic-bezier(0.22,1,0.36,1)] rounded-t-2xl border border-border bg-background p-7 shadow-[0_20px_60px_rgba(49,103,95,0.28)] sm:max-w-md sm:rounded-[--radius-brand]">
        <button
          onClick={closeAuthModal}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-primary/50 transition-colors hover:bg-surface hover:text-primary"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col items-center text-center">
          <Logo showText={false} className="[&>span]:h-12 [&>span]:w-12" />
          <h2 id="auth-title" className="mt-4 text-2xl font-bold tracking-[-0.02em] text-primary">
            Join UniHub Workshop
          </h2>
          <p className="mt-2 max-w-xs text-sm font-light leading-relaxed text-primary/60">
            Sign in with your university Keycloak account to register for workshops.
          </p>
        </div>

        <div className="mt-7 flex flex-col gap-3">
          <Button variant="primary" size="lg" className="group w-full" onClick={login}>
            Sign In
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button variant="secondary" size="lg" className="w-full" onClick={login}>
            Create Account
          </Button>
        </div>

        <p className="mt-5 flex items-center justify-center gap-1.5 text-xs font-light text-primary/45">
          <ShieldCheck className="h-3.5 w-3.5" />
          Using your university SSO account
        </p>
      </div>
    </div>
  )
}
