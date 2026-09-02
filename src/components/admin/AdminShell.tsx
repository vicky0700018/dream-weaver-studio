import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import { useAdminAuth } from "@/lib/auth";
import { useStore } from "@/lib/store";

const menu = [
  { to: "/admin", label: "Dashboard" },
  { to: "/admin/banners", label: "Hero Banners" },
  { to: "/admin/about", label: "About" },
  { to: "/admin/services", label: "Services" },
  { to: "/admin/portfolio", label: "Portfolio" },
  { to: "/admin/gallery", label: "Gallery" },
  { to: "/admin/testimonials", label: "Testimonials" },
  { to: "/admin/enquiries", label: "Enquiries" },
  { to: "/admin/settings", label: "Contact Settings" },
] as const;

export function AdminShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  const { checked, isAuthed, logout } = useAdminAuth();
  const navigate = useNavigate();
  const { data } = useStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (checked && !isAuthed) navigate({ to: "/admin/login" });
  }, [checked, isAuthed, navigate]);

  if (!checked || !isAuthed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Checking your session…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Toggle admin menu"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-primary lg:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            </button>
            <Link to="/" className="flex items-center gap-2">
              <span className="gradient-brand flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-primary-foreground">
                DF
              </span>
              <span className="font-display text-base font-bold text-foreground sm:text-lg">
                {data.settings.businessName}
              </span>
            </Link>
            <span className="hidden rounded-full bg-lavender px-3 py-1 text-xs font-semibold text-primary sm:inline">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="btn-outline hidden !px-4 !py-2 !text-xs sm:inline-flex">
              View Site
            </Link>
            <button
              type="button"
              onClick={() => {
                logout();
                navigate({ to: "/admin/login" });
              }}
              className="btn-primary !px-4 !py-2 !text-xs"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1500px] gap-6 px-4 py-6">
        <aside
          className={`${
            open ? "block" : "hidden"
          } fixed inset-x-4 top-20 z-30 rounded-2xl border border-border bg-card p-3 shadow-lg lg:sticky lg:top-24 lg:block lg:h-fit lg:w-60 lg:shrink-0`}
        >
          <nav>
            <ul className="space-y-1">
              {menu.map((m) => (
                <li key={m.to}>
                  <Link
                    to={m.to}
                    onClick={() => setOpen(false)}
                    activeOptions={{ exact: m.to === "/admin" }}
                    activeProps={{ className: "bg-lavender !text-primary font-semibold" }}
                    className="block rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-lavender hover:text-primary"
                  >
                    {m.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{title}</h1>
            {description ? (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

export function AdminCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-border bg-card p-5 shadow-[0_10px_30px_-20px_oklch(0.4_0.2_305/0.35)] ${className}`}
    >
      {children}
    </div>
  );
}

export function Labeled({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

export function ImagePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <img src={value} alt="" className="h-14 w-20 rounded-lg object-cover" />
      <input
        className="field"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Image URL"
      />
    </div>
  );
}
