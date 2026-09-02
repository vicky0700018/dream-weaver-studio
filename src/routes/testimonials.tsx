import { Link, createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/PageHeader";
import { PublicLayout } from "@/components/PublicLayout";
import { Stars } from "@/components/Stars";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Client Testimonials | Dream Factory Events Pune" },
      {
        name: "description",
        content:
          "Read reviews from families and companies who celebrated birthdays, weddings, haldi functions and corporate events with Dream Factory Events in Pune.",
      },
      { property: "og:title", content: "Client Testimonials | Dream Factory Events" },
      {
        property: "og:description",
        content: "Real reviews from our happy clients across Pune.",
      },
    ],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  const { data } = useStore();
  const items = data.testimonials.filter((t) => t.active);
  const avg =
    items.length > 0
      ? (items.reduce((sum, t) => sum + t.rating, 0) / items.length).toFixed(1)
      : "0.0";

  return (
    <PublicLayout>
      <PageHeader
        eyebrow="Testimonials"
        title="Loved by our clients"
        subtitle={`${avg} average rating from ${items.length} reviews across birthdays, weddings and corporate events.`}
      />

      <section className="bg-background px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <blockquote key={t.id} className="card-soft flex flex-col p-6">
              <Stars rating={t.rating} />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                "{t.review}"
              </p>
              <footer className="mt-6 border-t border-border pt-4">
                <p className="text-sm font-bold text-foreground">{t.name}</p>
                <p className="text-xs text-magenta">{t.eventType}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t.date}</p>
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-2xl rounded-3xl bg-lavender p-8 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Ready to create your own story?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Tell us your date and theme — we'll take care of the rest.
          </p>
          <Link to="/contact" className="btn-primary mt-6">
            Get a Free Quote
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
