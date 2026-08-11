import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

const base =
  "w-full rounded-[--radius-brand] border border-border bg-surface/50 px-3.5 py-2.5 text-sm text-primary placeholder:text-primary/40 transition-colors focus:border-secondary focus:bg-background focus:outline-none focus:ring-2 focus:ring-secondary/30"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, label, id, ...props }, ref) => {
  const input = <input ref={ref} id={id} className={cn(base, className)} {...props} />
  if (!label) return input
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.08em] text-primary/60">{label}</span>
      {input}
    </label>
  )
})
Input.displayName = "Input"

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={cn(base, "min-h-24 resize-y", className)} {...props} />
  ),
)
Textarea.displayName = "Textarea"

export function Field({
  label,
  children,
  hint,
}: {
  label: string
  children: React.ReactNode
  hint?: string
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.08em] text-primary/60">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs font-light text-primary/50">{hint}</span>}
    </label>
  )
}
