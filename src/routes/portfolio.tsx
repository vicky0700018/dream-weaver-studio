import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { PageHeader } from "@/components/PageHeader";
import { PublicLayout } from "@/components/PublicLayout";
import { categories } from "@/data/portfolio";
import type { Project } from "@/data/types";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio | Event Decoration Projects in Pune" },
      {
        name: "description",
        content:
          "Browse our birthday, wedding, haldi, mehendi and corporate event decoration projects across Pune.",
      },
      { property: "og:title", content: "Event Portfolio | Dream Factory Events" },
      {
        property: "og:description",
        content: "Real birthday, wedding and corporate event setups styled by Dream Factory Events.",
      },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const { data } = useStore();
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<Project | null>(null);

  const projects = data.portfolio.filter((p) => p.active);
  const items = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <PublicLayout>
      <PageHeader
        eyebrow="Our Portfolio"
        title="Celebrations we have styled"
        subtitle="A closer look at the birthdays, weddings and corporate events we have designed in Pune."
      />

      <section className="bg-background px-4 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap justify-center gap-2">
            {["All", ...categories].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  filter === c
                    ? "gradient-brand border-transparent text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {items.length === 0 ? (
            <p className="mt-14 text-center text-sm text-muted-foreground">
              No projects in this category yet. Please check another category.
            </p>
          ) : (
            <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <article key={p.id} className="card-soft group overflow-hidden">
                  <div className="overflow-hidden">
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      loading="lazy"
                      className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <span className="rounded-full bg-lavender px-3 py-1 text-xs font-semibold text-primary">
                      {p.category}
                    </span>
                    <h2 className="mt-3 text-lg font-bold text-foreground">{p.title}</h2>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
                    <p className="mt-3 text-xs text-muted-foreground">
                      {p.location} · {p.date}
                    </p>
                    <button
                      type="button"
                      onClick={() => setOpen(p)}
                      className="btn-primary mt-5 !px-5 !py-2 !text-sm"
                    >
                      View Project
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-foreground/40 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(null)}
        >
          <div
            className="my-8 w-full max-w-3xl rounded-3xl bg-card p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="rounded-full bg-peach px-3 py-1 text-xs font-semibold text-magenta">
                  {open.category}
                </span>
                <h2 className="mt-3 text-2xl font-bold text-foreground">{open.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {open.location} · {open.date} · Theme: {open.theme}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close project details"
                onClick={() => setOpen(null)}
                className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground hover:text-primary"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {open.images.map((src, i) => (
                <img
                  key={`${open.id}-${i}`}
                  src={src}
                  alt={`${open.title} photo ${i + 1}`}
                  loading="lazy"
                  className="h-32 w-full rounded-xl object-cover"
                />
              ))}
            </div>

            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{open.description}</p>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-bold text-foreground">Services Provided</h3>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {open.services.map((s) => (
                    <li key={s}>✦ {s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">Event Highlights</h3>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {open.highlights.map((h) => (
                    <li key={h}>✦ {h}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </PublicLayout>
  );
}
