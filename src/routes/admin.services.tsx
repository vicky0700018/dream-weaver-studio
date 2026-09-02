import { createFileRoute } from "@tanstack/react-router";

import { AdminCard, AdminShell, ImagePicker, Labeled } from "@/components/admin/AdminShell";
import { img } from "@/data/images";
import { newId, useCollection } from "@/lib/store";

export const Route = createFileRoute("/admin/services")({
  head: () => ({
    meta: [
      { title: "Services | Dream Factory Events Admin" },
      { name: "description", content: "Add, edit and disable the services shown on the public website." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Services | Admin" },
      { property: "og:description", content: "Manage the services list." },
    ],
  }),
  component: ServicesAdmin,
});

function ServicesAdmin() {
  const { items, add, update, remove } = useCollection("services");

  return (
    <AdminShell title="Services" description="Manage the services shown on the home and services pages.">
      <button
        type="button"
        className="btn-primary mb-5 !px-5 !py-2.5 !text-sm"
        onClick={() =>
          add({
            id: newId(),
            title: "New Service",
            short: "Short summary of this service.",
            description: "Detailed description of what this service includes.",
            image: img.balloon,
            features: ["Feature one", "Feature two"],
            active: true,
          })
        }
      >
        + Add Service
      </button>

      {items.length === 0 ? (
        <AdminCard>
          <p className="text-sm text-muted-foreground">No services yet.</p>
        </AdminCard>
      ) : (
        <div className="grid gap-5 xl:grid-cols-2">
          {items.map((s) => (
            <AdminCard key={s.id}>
              <div className="space-y-4">
                <Labeled label="Image">
                  <ImagePicker value={s.image} onChange={(v) => update(s.id, { image: v })} />
                </Labeled>
                <Labeled label="Title">
                  <input className="field" value={s.title} onChange={(e) => update(s.id, { title: e.target.value })} />
                </Labeled>
                <Labeled label="Short Description">
                  <input className="field" value={s.short} onChange={(e) => update(s.id, { short: e.target.value })} />
                </Labeled>
                <Labeled label="Full Description">
                  <textarea
                    className="field"
                    rows={3}
                    value={s.description}
                    onChange={(e) => update(s.id, { description: e.target.value })}
                  />
                </Labeled>
                <Labeled label="Features (one per line)">
                  <textarea
                    className="field"
                    rows={4}
                    value={s.features.join("\n")}
                    onChange={(e) =>
                      update(s.id, { features: e.target.value.split("\n").filter((f) => f.trim() !== "") })
                    }
                  />
                </Labeled>
                <div className="flex items-center justify-between gap-3">
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={s.active}
                      onChange={(e) => update(s.id, { active: e.target.checked })}
                    />
                    Enabled
                  </label>
                  <button
                    type="button"
                    onClick={() => remove(s.id)}
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
