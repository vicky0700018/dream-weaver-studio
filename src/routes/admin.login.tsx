import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { useAdminAuth } from "@/lib/auth";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Login | Dream Factory Events" },
      { name: "description", content: "Secure admin sign in for Dream Factory Events content management." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Login | Dream Factory Events" },
      { property: "og:description", content: "Admin sign in for Dream Factory Events." },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const { checked, isAuthed, login } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (checked && isAuthed) navigate({ to: "/admin" });
  }, [checked, isAuthed, navigate]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    window.setTimeout(() => {
      const ok = login(email, password);
      setLoading(false);
      if (ok) navigate({ to: "/admin" });
      else setError("Incorrect email or password. Please try again.");
    }, 500);
  };

  return (
    <main className="surface-soft flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-[0_25px_60px_-40px_oklch(0.4_0.2_305/0.6)]">
        <Link to="/" className="flex items-center justify-center gap-2">
          <span className="gradient-brand flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-primary-foreground">
            DF
          </span>
          <span className="font-display text-lg font-bold text-foreground">Dream Factory Events</span>
        </Link>

        <h1 className="mt-6 text-center text-2xl font-bold text-foreground">Admin Login</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Sign in to manage banners, portfolio, gallery and enquiries.
        </p>

        <form className="mt-7 space-y-4" onSubmit={submit} noValidate>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Email</span>
            <input
              type="email"
              className="field mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@dreamfactoryevents.co"
              autoComplete="username"
            />
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Password</span>
            <div className="relative mt-1">
              <input
                type={show ? "text" : "password"}
                className="field !pr-16"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-primary"
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          {error ? (
            <p className="rounded-xl bg-peach px-4 py-2.5 text-sm font-medium text-magenta">{error}</p>
          ) : null}

          <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
            {loading ? "Signing in…" : "Login"}
          </button>
        </form>

        <p className="mt-6 rounded-xl bg-lavender px-4 py-3 text-center text-xs text-primary">
          Demo credentials: admin@dreamfactoryevents.co / Dream@123
        </p>
      </div>
    </main>
  );
}
