import { Link, createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/PageHeader";
import { PublicLayout } from "@/components/PublicLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { img } from "@/data/images";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Dream Factory Events | Event Planner in Pune" },
      {
        name: "description",
        content:
          "Learn about Dream Factory Events, a Kharadi-based event planning, decoration and catering company creating customized celebrations across Pune.",
      },
      { property: "og:title", content: "About Dream Factory Events" },
      {
        property: "og:description",
        content:
          "Our story, mission and creative approach to event decoration and planning in Pune.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { data } = useStore();
  const a = data.about;

  const blocks = [
    { title: "Our Story", text: a.story },
    { title: "Our Mission", text: a.mission },
    { title: "Our Vision", text: a.vision },
    { title: "Creative Approach", text: a.approach },
    { title: "Service Philosophy", text: a.philosophy },
  ];

  return (
    <PublicLayout>
      <PageHeader
        eyebrow="About Us"
        title="A creative event company built in Pune"
        subtitle={a.intro}
      />

      <section className="bg-card px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {a.stats.map((s) => (
            <div key={s.id} className="rounded-3xl border border-border bg-lavender p-6 text-center">
              <p className="font-display text-3xl font-bold text-primary">{s.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-background px-4 pb-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-6">
            {blocks.map((b) => (
              <div key={b.title} className="card-soft p-6">
                <h2 className="text-xl font-bold text-foreground">{b.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
              </div>
            ))}
          </div>
          <div className="grid h-fit gap-4 sm:grid-cols-2">
            {[img.bannerWedding, img.kids, img.mehendi, img.catering].map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Event decoration by Dream Factory Events in Pune"
                className="h-48 w-full rounded-3xl object-cover"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="surface-soft px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeading
            eyebrow="Why Clients Choose Us"
            title="Beautiful events, honest pricing, zero stress"
            subtitle="One team handles the theme, decor, catering, photography and event-day coordination — so you only have to enjoy the celebration."
          />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/portfolio" className="btn-primary">
              See Our Work
            </Link>
            <Link to="/contact" className="btn-outline">
              Plan Your Event
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
