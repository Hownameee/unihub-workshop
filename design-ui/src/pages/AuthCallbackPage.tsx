import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../lib/auth"
import { Logo } from "../components/ui/Logo"

export function AuthCallbackPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  useEffect(() => {
    const timer = setTimeout(() => {
      login()
      navigate("/my-registrations", { replace: true })
    }, 1800)
    return () => clearTimeout(timer)
  }, [login, navigate])

  return (
    <div className="grid min-h-screen place-items-center bg-surface px-6">
      <div className="flex flex-col items-center gap-6 text-center">
        <Logo className="scale-125" />
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-brand [animation-delay:-0.3s]" />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-brand [animation-delay:-0.15s]" />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-brand" />
        </div>
        <div>
          <p className="text-lg font-semibold text-ink">Signing you in</p>
          <p className="mt-1 text-sm text-ink-soft">Verifying your university credentials…</p>
        </div>
      </div>
    </div>
  )
}
