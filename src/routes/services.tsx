import { Link, createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/PageHeader";
import { PublicLayout } from "@/components/PublicLayout";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Event Services | Decoration, Catering & Planning in Pune" },
      {
        name: "description",
        content:
          "Birthday decoration, wedding and haldi decor, balloon art, catering, photography, sound and lighting, and complete event management in Pune.",
      },
      { property: "og:title", content: "Event Services in Pune | Dream Factory Events" },
      {
        property: "og:description",
        content:
          "Explore our decoration, catering, photography and full event management services.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { data } = useStore();
  const services = data.services.filter((s) => s.active);

  return (
    <PublicLayout>
      <PageHeader
        eyebrow="Our Services"
        title="Complete event solutions"
        subtitle="Choose one service or let us handle your entire celebration from start to finish."
      />

      <section className="bg-background px-4 py-16">
        <div className="mx-auto max-w-7xl space-y-8">
          {services.map((s, i) => (
            <article
              key={s.id}
              className={`card-soft grid items-center gap-6 overflow-hidden lg:grid-cols-2 ${
                i % 2 === 1 ? "lg:[&>figure]:order-2" : ""
              }`}
            >
              <figure className="h-full">
                <img
                  src={s.image}
                  alt={`${s.title} service in Pune`}
                  className="h-64 w-full object-cover lg:h-full lg:min-h-[280px]"
                  loading="lazy"
                />
              </figure>
              <div className="p-6 sm:p-8">
                <h2 className="font-display text-2xl font-bold text-foreground">{s.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-magenta">✦</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-peach px-4 py-1.5 text-sm font-semibold text-magenta">
                    {s.priceRange}
                  </span>
                  <Link to="/contact" className="btn-primary !px-6 !py-2.5 !text-sm">
                    Enquire Now
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
