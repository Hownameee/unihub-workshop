import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ChevronDown, LogOut, Settings, Ticket, LayoutDashboard } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { Logo } from "@/components/ui/Logo"
import { Button } from "@/components/ui/Button"
import { Avatar } from "@/components/ui/Avatar"
import { cn } from "@/lib/utils"

export function Navbar() {
  const { isAuthed, user, openAuthModal, logout } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "border-b border-primary/10 bg-primary/[0.04] backdrop-blur-xl supports-[backdrop-filter]:bg-primary/[0.04]"
          : "border-b border-transparent bg-background",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link to="/" aria-label="UniHub Workshop home" className="transition-transform hover:scale-[1.02]">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-sm font-medium text-primary/70 transition-colors hover:text-primary">
            Workshops
          </Link>
          <a href="#schedule" className="text-sm font-medium text-primary/70 transition-colors hover:text-primary">
            Schedule
          </a>
          {isAuthed && (
            <Link
              to="/my-registrations"
              className="text-sm font-medium text-primary/70 transition-colors hover:text-primary"
            >
              My Registrations
            </Link>
          )}
        </nav>

        {isAuthed && user ? (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2.5 transition-colors hover:bg-primary/5"
            >
              <Avatar name={user.name} size="sm" />
              <span className="hidden text-sm font-medium text-primary sm:block">{user.name}</span>
              <ChevronDown className={cn("h-4 w-4 text-primary/50 transition-transform", menuOpen && "rotate-180")} />
            </button>
            {menuOpen && (
              <div className="animate-[fade-up_0.2s_ease-out] absolute right-0 mt-2 w-60 overflow-hidden rounded-[--radius-brand] border border-border bg-background shadow-[0_12px_40px_rgba(49,103,95,0.16)]">
                <div className="border-b border-border px-4 py-3">
                  <p className="text-sm font-semibold text-primary">{user.name}</p>
                  <p className="truncate text-xs font-light text-primary/50">{user.email}</p>
                </div>
                <div className="p-1.5">
                  {user.role === "admin" && (
                    <MenuItem icon={<LayoutDashboard className="h-4 w-4" />} onClick={() => go("/admin")}>
                      Admin Dashboard
                    </MenuItem>
                  )}
                  <MenuItem icon={<Ticket className="h-4 w-4" />} onClick={() => go("/my-registrations")}>
                    My Registrations
                  </MenuItem>
                  <MenuItem icon={<Settings className="h-4 w-4" />} onClick={() => go("/settings")}>
                    Settings
                  </MenuItem>
                  <MenuItem
                    icon={<LogOut className="h-4 w-4" />}
                    onClick={() => {
                      logout()
                      setMenuOpen(false)
                      navigate("/")
                    }}
                    danger
                  >
                    Sign Out
                  </MenuItem>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Button variant="secondary" size="sm" onClick={openAuthModal}>
            Sign In
          </Button>
        )}
      </div>
    </header>
  )

  function go(path: string) {
    setMenuOpen(false)
    navigate(path)
  }
}

function MenuItem({
  icon,
  children,
  onClick,
  danger,
}: {
  icon: React.ReactNode
  children: React.ReactNode
  onClick: () => void
  danger?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-[--radius-brand] px-3 py-2 text-sm font-medium transition-colors",
        danger ? "text-[#b3383e] hover:bg-[#d0454c]/8" : "text-primary/80 hover:bg-primary/5",
      )}
    >
      {icon}
      {children}
    </button>
  )
}
