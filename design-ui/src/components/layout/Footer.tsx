import { Link } from "react-router-dom"
import { Logo } from "@/components/ui/Logo"

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-3 text-sm font-light leading-relaxed text-primary/55">
              The event platform powering Skills &amp; Career Week — browse, register, and check into
              workshops across five days.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <FooterCol
              title="Explore"
              links={[
                { label: "All Workshops", to: "/" },
                { label: "My Registrations", to: "/my-registrations" },
                { label: "Settings", to: "/settings" },
              ]}
            />
            <FooterCol
              title="Organizers"
              links={[
                { label: "Dashboard", to: "/admin" },
                { label: "Manage Workshops", to: "/admin/workshops" },
                { label: "Check-in", to: "/checkin" },
              ]}
            />
            <FooterCol
              title="Support"
              links={[
                { label: "Help Center", to: "/" },
                { label: "Contact", to: "/" },
              ]}
            />
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs font-light text-primary/45 sm:flex-row">
          <p>© 2026 UniHub Workshop. All rights reserved.</p>
          <p>Secured by university Keycloak SSO</p>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({
  title,
  links,
}: {
  title: string
  links: { label: string; to: string }[]
}) {
  return (
    <div>
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-primary/50">{title}</h4>
      <ul className="flex flex-col gap-2">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="text-sm font-light text-primary/70 transition-colors hover:text-secondary">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
