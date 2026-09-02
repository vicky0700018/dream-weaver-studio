import { createFileRoute } from "@tanstack/react-router";

import { AdminCard, AdminShell, Labeled } from "@/components/admin/AdminShell";
import { newId, useStore } from "@/lib/store";

export const Route = createFileRoute("/admin/about")({
  head: () => ({
    meta: [
      { title: "About Content | Dream Factory Events Admin" },
      { name: "description", content: "Edit company story, mission, vision and statistics." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "About Content | Admin" },
      { property: "og:description", content: "Edit About page content." },
    ],
  }),
  component: AboutAdmin,
});

const fields = [
  ["intro", "Introduction"],
  ["story", "Our Story"],
  ["mission", "Mission"],
  ["vision", "Vision"],
  ["approach", "Creative Approach"],
  ["philosophy", "Service Philosophy"],
] as const;

function AboutAdmin() {
  const { data, patch } = useStore();
  const about = data.about;

  const setField = (key: (typeof fields)[number][0], value: string) =>
    patch({ about: { ...about, [key]: value } });

  const setStat = (id: string, changes: Partial<{ label: string; value: string }>) =>
    patch({
      about: { ...about, stats: about.stats.map((s) => (s.id === id ? { ...s, ...changes } : s)) },
    });

  return (
    <AdminShell title="About Page" description="This content is shown on the public About page.">
      <div className="grid gap-5 xl:grid-cols-2">
        {fields.map(([key, label]) => (
          <AdminCard key={key}>
            <Labeled label={label}>
              <textarea
                className="field"
                rows={5}
                value={about[key]}
                onChange={(e) => setField(key, e.target.value)}
              />
            </Labeled>
          </AdminCard>
        ))}
      </div>

      <AdminCard className="mt-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-foreground">Statistics</h2>
          <button
            type="button"
            className="btn-outline !px-4 !py-2 !text-xs"
            onClick={() =>
              patch({
                about: { ...about, stats: [...about.stats, { id: newId(), label: "New Stat", value: "0" }] },
              })
            }
          >
            + Add Stat
          </button>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {about.stats.map((s) => (
            <div key={s.id} className="rounded-xl border border-border p-4">
              <Labeled label="Value">
                <input className="field" value={s.value} onChange={(e) => setStat(s.id, { value: e.target.value })} />
              </Labeled>
              <div className="mt-3">
                <Labeled label="Label">
                  <input className="field" value={s.label} onChange={(e) => setStat(s.id, { label: e.target.value })} />
                </Labeled>
              </div>
              <button
                type="button"
                onClick={() => patch({ about: { ...about, stats: about.stats.filter((x) => x.id !== s.id) } })}
                className="mt-3 rounded-full border border-border px-4 py-2 text-xs font-semibold text-destructive"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </AdminCard>
    </AdminShell>
  );
}
