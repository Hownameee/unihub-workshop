import { cn } from "@/lib/utils"

export function Logo({
  className,
  showText = true,
  variant = "default",
}: {
  className?: string
  showText?: boolean
  variant?: "default" | "light"
}) {
  const light = variant === "light"
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "relative flex h-9 w-9 items-center justify-center rounded-[--radius-brand] shadow-[0_4px_12px_rgba(22,151,189,0.3)]",
          light
            ? "bg-brand-foreground text-brand"
            : "bg-gradient-to-br from-primary to-secondary text-primary-foreground",
        )}
      >
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 3 3 7.5l9 4.5 9-4.5L12 3Z" fill="currentColor" fillOpacity="0.95" />
          <path
            d="M6 10.5v4.2c0 1.4 2.7 2.8 6 2.8s6-1.4 6-2.8v-4.2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </span>
      {showText && (
        <span
          className={cn(
            "text-lg font-bold tracking-[-0.02em]",
            light ? "text-brand-foreground" : "text-primary",
          )}
        >
          Uni<span className={light ? "text-accent" : "text-secondary"}>Hub</span>
        </span>
      )}
    </span>
  )
}
