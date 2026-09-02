import { createFileRoute } from "@tanstack/react-router";

import { AdminCard, AdminShell, Labeled } from "@/components/admin/AdminShell";
import { img } from "@/data/images";
import { categories } from "@/data/portfolio";
import { newId, useCollection } from "@/lib/store";

export const Route = createFileRoute("/admin/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio | Dream Factory Events Admin" },
      { name: "description", content: "Add, edit and disable portfolio projects." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Portfolio | Admin" },
      { property: "og:description", content: "Manage portfolio projects." },
    ],
  }),
  component: PortfolioAdmin,
});

function PortfolioAdmin() {
  const { items, add, update, remove } = useCollection("portfolio");

  return (
    <AdminShell title="Portfolio" description="Projects shown on the public portfolio page.">
      <button
        type="button"
        className="btn-primary mb-5 !px-5 !py-2.5 !text-sm"
        onClick={() =>
          add({
            id: newId(),
            title: "New Project",
            category: categories[0]!,
            description: "Describe the event setup and styling.",
            location: "Pune",
            date: String(new Date().getFullYear()),
            theme: "Custom Theme",
            images: [img.bannerBirthday],
            services: ["Decoration"],
            highlights: ["Highlight one"],
            active: true,
          })
        }
      >
        + Add Project
      </button>

      {items.length === 0 ? (
        <AdminCard>
          <p className="text-sm text-muted-foreground">No projects yet.</p>
        </AdminCard>
      ) : (
        <div className="grid gap-5 xl:grid-cols-2">
          {items.map((p) => (
            <AdminCard key={p.id}>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {p.images.map((src, i) => (
                    <img key={`${p.id}-${i}`} src={src} alt="" className="h-14 w-20 rounded-lg object-cover" />
                  ))}
                </div>
                <Labeled label="Images (one URL per line)">
                  <textarea
                    className="field"
                    rows={3}
                    value={p.images.join("\n")}
                    onChange={(e) =>
                      update(p.id, { images: e.target.value.split("\n").filter((v) => v.trim() !== "") })
                    }
                  />
                </Labeled>
                <Labeled label="Title">
                  <input className="field" value={p.title} onChange={(e) => update(p.id, { title: e.target.value })} />
                </Labeled>
                <Labeled label="Category">
                  <select
                    className="field"
                    value={p.category}
                    onChange={(e) => update(p.id, { category: e.target.value })}
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Labeled>
                <Labeled label="Description">
                  <textarea
                    className="field"
                    rows={3}
                    value={p.description}
                    onChange={(e) => update(p.id, { description: e.target.value })}
                  />
                </Labeled>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Labeled label="Location">
                    <input
                      className="field"
                      value={p.location}
                      onChange={(e) => update(p.id, { location: e.target.value })}
                    />
                  </Labeled>
                  <Labeled label="Date / Year">
                    <input className="field" value={p.date} onChange={(e) => update(p.id, { date: e.target.value })} />
                  </Labeled>
                  <Labeled label="Theme">
                    <input
                      className="field"
                      value={p.theme}
                      onChange={(e) => update(p.id, { theme: e.target.value })}
                    />
                  </Labeled>
                </div>
                <Labeled label="Services Provided (one per line)">
                  <textarea
                    className="field"
                    rows={3}
                    value={p.services.join("\n")}
                    onChange={(e) =>
                      update(p.id, { services: e.target.value.split("\n").filter((v) => v.trim() !== "") })
                    }
                  />
                </Labeled>
                <Labeled label="Event Highlights (one per line)">
                  <textarea
                    className="field"
                    rows={3}
                    value={p.highlights.join("\n")}
                    onChange={(e) =>
                      update(p.id, { highlights: e.target.value.split("\n").filter((v) => v.trim() !== "") })
                    }
                  />
                </Labeled>
                <div className="flex items-center justify-between gap-3">
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={p.active}
                      onChange={(e) => update(p.id, { active: e.target.checked })}
                    />
                    Enabled
                  </label>
                  <button
                    type="button"
                    onClick={() => remove(p.id)}
                    className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-destructive"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </AdminCard>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
