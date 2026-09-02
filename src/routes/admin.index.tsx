import { Link, createFileRoute } from "@tanstack/react-router";

import { AdminCard, AdminShell } from "@/components/admin/AdminShell";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard | Dream Factory Events" },
      { name: "description", content: "Overview of portfolio, gallery, services, testimonials and enquiries." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Dashboard | Dream Factory Events" },
      { property: "og:description", content: "Manage website content for Dream Factory Events." },
    ],
  }),
  component: Dashboard,
});

const quickActions = [
  { to: "/admin/portfolio", label: "Add Portfolio" },
  { to: "/admin/gallery", label: "Add Gallery" },
  { to: "/admin/services", label: "Add Service" },
  { to: "/admin/testimonials", label: "Add Testimonial" },
  { to: "/admin/banners", label: "Add Banner" },
] as const;

function Dashboard() {
  const { data } = useStore();

  const stats = [
    { label: "Portfolio Projects", value: data.portfolio.length },
    { label: "Gallery Images", value: data.gallery.length },
    { label: "Services", value: data.services.length },
    { label: "Testimonials", value: data.testimonials.length },
    { label: "Enquiries", value: data.enquiries.length },
    { label: "Hero Banners", value: data.banners.length },
  ];

  return (
    <AdminShell title="Dashboard" description="A quick overview of your website content and enquiries.">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((s) => (
          <AdminCard key={s.label}>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{s.label}</p>
            <p className="mt-2 text-3xl font-bold text-primary">{s.value}</p>
          </AdminCard>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {quickActions.map((a) => (
          <Link key={a.to} to={a.to} className="btn-outline !px-4 !py-2 !text-xs">
            {a.label}
          </Link>
        ))}
      </div>

      <AdminCard className="mt-6 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-foreground">Recent Enquiries</h2>
          <Link to="/admin/enquiries" className="text-sm font-semibold text-primary">
            View all
          </Link>
        </div>

        {data.enquiries.length === 0 ? (
          <p className="mt-6 text-sm text-muted-foreground">No enquiries yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Event Type</th>
                  <th className="py-2 pr-4">Phone</th>
                  <th className="py-2 pr-4">Date</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.enquiries.slice(0, 6).map((e) => (
                  <tr key={e.id} className="border-t border-border">
                    <td className="py-3 pr-4 font-semibold text-foreground">{e.name}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{e.eventType}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{e.phone}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{e.submittedAt}</td>
                    <td className="py-3">
                      <span className="rounded-full bg-lavender px-3 py-1 text-xs font-semibold text-primary">
                        {e.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminCard>
    </AdminShell>
  );
}
