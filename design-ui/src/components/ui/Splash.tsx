import { Logo } from "./Logo"

export function Splash({ message = "Loading…" }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      {/* top progress bar */}
      <div className="absolute inset-x-0 top-0 h-0.5 overflow-hidden bg-surface">
        <div className="h-full w-1/3 animate-[shimmer_1.4s_ease-in-out_infinite] bg-gradient-to-r from-primary to-secondary" />
      </div>
      <div className="animate-[pulse-dot_1.6s_ease-in-out_infinite]">
        <Logo showText={false} className="[&>span]:h-14 [&>span]:w-14" />
      </div>
      <p className="mt-5 text-sm font-light text-primary/55">{message}</p>
    </div>
  )
}
