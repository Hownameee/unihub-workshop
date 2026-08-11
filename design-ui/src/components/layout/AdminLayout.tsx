import { Outlet, NavLink, useNavigate } from "react-router-dom"
import { LayoutDashboard, CalendarRange, ScanLine, Settings, LogOut, ArrowLeft } from "lucide-react"
import { Logo } from "@/components/ui/Logo"
import { Avatar } from "@/components/ui/Avatar"
import { useAuth } from "@/lib/auth"
import { cn } from "@/lib/utils"

const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/workshops", label: "Workshops", icon: CalendarRange, end: false },
  { to: "/checkin", label: "Check-in", icon: ScanLine, end: false },
  { to: "/settings", label: "Settings", icon: Settings, end: false },
]

export function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen bg-surface/40">
      {/* Collapsible icon-rail — expands on hover */}
      <aside className="group/rail sticky top-0 z-30 flex h-screen w-[76px] flex-col border-r border-border bg-background transition-all duration-300 hover:w-60">
        <div className="flex h-16 items-center overflow-hidden border-b border-border px-[18px]">
          <span className="group-hover/rail:hidden">
            <Logo showText={false} />
          </span>
          <span className="hidden group-hover/rail:block">
            <Logo />
          </span>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "flex h-11 items-center gap-3 overflow-hidden rounded-[--radius-brand] px-[13px] text-sm font-medium transition-colors",
                  isActive ? "bg-primary text-primary-foreground" : "text-primary/70 hover:bg-primary/5",
                )
              }
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span className="whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover/rail:opacity-100">
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-border p-3">
          <button
            onClick={() => navigate("/")}
            className="flex h-11 w-full items-center gap-3 overflow-hidden rounded-[--radius-brand] px-[13px] text-sm font-medium text-primary/70 transition-colors hover:bg-primary/5"
          >
            <ArrowLeft className="h-5 w-5 shrink-0" />
            <span className="whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover/rail:opacity-100">
              Back to site
            </span>
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-xl">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.1em] text-primary/45">Organizer Console</p>
            <p className="text-sm font-semibold text-primary">Skills &amp; Career Week 2026</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-primary">{user?.name ?? "Organizer"}</p>
              <p className="text-xs font-light text-primary/50">Administrator</p>
            </div>
            <Avatar name={user?.name ?? "Organizer"} size="sm" />
            <button
              onClick={() => {
                logout()
                navigate("/")
              }}
              aria-label="Sign out"
              className="flex h-9 w-9 items-center justify-center rounded-full text-primary/50 transition-colors hover:bg-surface hover:text-[#b3383e]"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>
        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
