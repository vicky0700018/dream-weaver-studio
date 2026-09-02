import { Link } from "@tanstack/react-router";

import { useStore } from "@/lib/store";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

const serviceLinks = [
  "Event Decoration",
  "Birthday Events",
  "Wedding & Pre-Wedding",
  "Catering",
  "Corporate Events",
];

export function Footer() {
  const { data } = useStore();
  const s = data.settings;

  return (
    <footer className="surface-soft border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="gradient-brand flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-primary-foreground">
              DF
            </span>
            <span className="font-display text-lg font-bold text-foreground">{s.businessName}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Event planning, decoration and catering in Pune. From colourful birthdays to elegant
            pre-wedding celebrations, we craft beautiful, budget-friendly experiences.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Quick Links</h3>
          <ul className="mt-4 space-y-2">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-magenta"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Services</h3>
          <ul className="mt-4 space-y-2">
            {serviceLinks.map((l) => (
              <li key={l}>
                <Link
                  to="/services"
                  className="text-sm text-muted-foreground transition-colors hover:text-magenta"
                >
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href={`tel:${s.phone1.replace(/\s/g, "")}`} className="hover:text-magenta">
                {s.phone1}
              </a>
            </li>
            <li>
              <a href={`tel:${s.phone2.replace(/\s/g, "")}`} className="hover:text-magenta">
                {s.phone2}
              </a>
            </li>
            <li>
              <a href={`mailto:${s.email}`} className="hover:text-magenta">
                {s.email}
              </a>
            </li>
            <li>{s.address}</li>
            <li className="pt-1 text-xs">{s.hours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {s.businessName}. Event Planner in Pune.
          </p>
          <Link
            to="/admin/login"
            className="text-xs text-muted-foreground/80 underline underline-offset-4 transition-colors hover:text-primary"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
