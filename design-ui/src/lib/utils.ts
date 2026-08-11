import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateISO: string) {
  return new Date(dateISO).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })
}

const DAY_DATES = ["", "Mon, Sep 14", "Tue, Sep 15", "Wed, Sep 16", "Thu, Sep 17", "Fri, Sep 18"]

export function formatDayLabel(day: number) {
  return `Day ${day} · ${DAY_DATES[day] ?? ""}`.trim()
}

export function formatMoney(amount: number) {
  if (amount === 0) return "Free"
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(amount)
}

export function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}
