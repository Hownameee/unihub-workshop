import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[--radius-brand] border border-border bg-background shadow-[0_4px_24px_rgba(49,103,95,0.08)]",
        className,
      )}
      {...props}
    />
  )
}
