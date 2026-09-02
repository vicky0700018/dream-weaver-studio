import { createFileRoute } from "@tanstack/react-router";

import { AdminCard, AdminShell, ImagePicker, Labeled } from "@/components/admin/AdminShell";
import { img } from "@/data/images";
import { newId, useCollection } from "@/lib/store";

export const Route = createFileRoute("/admin/banners")({
  head: () => ({
    meta: [
      { title: "Hero Banners | Dream Factory Events Admin" },
      { name: "description", content: "Add, edit and disable homepage hero banners." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Hero Banners | Admin" },
      { property: "og:description", content: "Manage homepage hero banners." },
    ],
  }),
  component: BannersAdmin,
});

function BannersAdmin() {
  const { items, add, update, remove } = useCollection("banners");

  return (
    <AdminShell title="Hero Banners" description="These slides appear in the homepage hero slider.">
      <button
        type="button"
        className="btn-primary mb-5 !px-5 !py-2.5 !text-sm"
        onClick={() =>
          add({
            id: newId(),
            image: img.bannerBirthday,
            title: "New Banner Title",
            subtitle: "Add a short supporting line here.",
            buttonText: "Explore Our Work",
            active: true,
          })
        }
      >
        + Add Banner
      </button>

      {items.length === 0 ? (
        <AdminCard>
          <p className="text-sm text-muted-foreground">No banners yet. Add your first hero slide.</p>
        </AdminCard>
      ) : (
        <div className="grid gap-5 xl:grid-cols-2">
          {items.map((b) => (
            <AdminCard key={b.id}>
              <div className="space-y-4">
                <Labeled label="Image">
                  <ImagePicker value={b.image} onChange={(v) => update(b.id, { image: v })} />
                </Labeled>
                <Labeled label="Title">
                  <input className="field" value={b.title} onChange={(e) => update(b.id, { title: e.target.value })} />
                </Labeled>
                <Labeled label="Subtitle">
                  <textarea
                    className="field"
                    rows={2}
                    value={b.subtitle}
                    onChange={(e) => update(b.id, { subtitle: e.target.value })}
                  />
                </Labeled>
                <Labeled label="Button Text">
                  <input
                    className="field"
                    value={b.buttonText}
                    onChange={(e) => update(b.id, { buttonText: e.target.value })}
                  />
                </Labeled>
                <div className="flex items-center justify-between gap-3 pt-1">
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={b.active}
                      onChange={(e) => update(b.id, { active: e.target.checked })}
                    />
                    Enabled
                  </label>
                  <button
                    type="button"
                    onClick={() => remove(b.id)}
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
