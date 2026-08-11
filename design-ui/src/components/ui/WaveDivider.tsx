import { cn } from "@/lib/utils"

export function WaveDivider({
  className,
  fill = "var(--color-surface)",
  flip = false,
}: {
  className?: string
  fill?: string
  flip?: boolean
}) {
  return (
    <div className={cn("pointer-events-none w-full leading-[0]", flip && "rotate-180", className)}>
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="h-12 w-full md:h-[90px]"
        aria-hidden="true"
      >
        <path
          d="M0 45C240 10 480 10 720 40s480 45 720 5v50H0V45Z"
          fill={fill}
        />
      </svg>
    </div>
  )
}
