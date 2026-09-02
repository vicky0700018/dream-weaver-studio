import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { PageHeader } from "@/components/PageHeader";
import { PublicLayout } from "@/components/PublicLayout";
import { galleryCategories } from "@/data/gallery";
import type { GalleryItem } from "@/data/types";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Birthday & Wedding Decoration Photos in Pune" },
      {
        name: "description",
        content:
          "Photo gallery of birthday decoration, wedding stages, haldi and mehendi decor, catering and corporate event setups in Pune.",
      },
      { property: "og:title", content: "Event Gallery | Dream Factory Events" },
      {
        property: "og:description",
        content: "Browse photos of our decoration, catering and celebration setups.",
      },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const { data } = useStore();
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<GalleryItem | null>(null);

  const images = data.gallery.filter((g) => g.active);
  const items = filter === "All" ? images : images.filter((g) => g.category === filter);

  return (
    <PublicLayout>
      <PageHeader
        eyebrow="Gallery"
        title="Moments from our events"
        subtitle="Balloon art, floral stages, haldi canopies and beautifully plated catering — captured on event day."
      />

      <section className="bg-background px-4 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap justify-center gap-2">
            {["All", ...galleryCategories].map((c) => (
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
              No photos in this category yet.
            </p>
          ) : (
            <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
              {items.map((g, i) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setOpen(g)}
                  className="card-soft group block w-full overflow-hidden break-inside-avoid text-left"
                >
                  <img
                    src={g.image}
                    alt={g.title}
                    loading="lazy"
                    className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                      i % 3 === 1 ? "h-72" : "h-56"
                    }`}
                  />
                  <div className="flex items-center justify-between gap-3 p-4">
                    <span className="text-sm font-semibold text-foreground">{g.title}</span>
                    <span className="rounded-full bg-lavender px-3 py-1 text-xs font-semibold text-primary">
                      {g.category}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(null)}
        >
          <div className="max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={open.image}
              alt={open.title}
              className="max-h-[78vh] w-full rounded-2xl object-contain"
            />
            <div className="mt-3 flex items-center justify-between gap-4 rounded-xl bg-card px-4 py-3">
              <div>
                <p className="text-sm font-bold text-foreground">{open.title}</p>
                <p className="text-xs text-magenta">{open.category}</p>
              </div>
              <button
                type="button"
                aria-label="Close image"
                onClick={() => setOpen(null)}
                className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground hover:text-primary"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </PublicLayout>
  );
}
