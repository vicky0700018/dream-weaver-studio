import { Link, createFileRoute } from "@tanstack/react-router";

import { EnquiryForm } from "@/components/EnquiryForm";
import { Hero } from "@/components/Hero";
import { PublicLayout } from "@/components/PublicLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { Stars } from "@/components/Stars";
import { img } from "@/data/images";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dream Factory Events | Event Planning, Decoration & Catering in Pune" },
      {
        name: "description",
        content:
          "Event planner in Pune for birthday decoration, wedding and haldi decoration, balloon art, catering and complete event management. Creative, budget-friendly setups.",
      },
      {
        property: "og:title",
        content: "Dream Factory Events | Event Planner & Decorator in Pune",
      },
      {
        property: "og:description",
        content:
          "Creative events, beautiful decor and unforgettable celebrations across Pune — decoration, catering, photography and full event management.",
      },
    ],
  }),
  component: Home,
});

const benefits = [
  {
    icon: "🎨",
    title: "Creative & Customized Themes",
    text: "Every setup is designed around your story, colours and venue.",
  },
  {
    icon: "💰",
    title: "Budget-Friendly Packages",
    text: "Premium-looking decor planned smartly to fit your budget.",
  },
  {
    icon: "🤝",
    title: "End-to-End Management",
    text: "Decor, catering, photography, sound and lighting from one team.",
  },
  {
    icon: "⏱️",
    title: "Professional Execution",
    text: "On-time setup, trained staff and clean handover of the venue.",
  },
  {
    icon: "✨",
    title: "Premium Visual Styling",
    text: "Photo-ready backdrops, florals and lighting in every package.",
  },
  {
    icon: "💬",
    title: "Personalized Service",
    text: "One point of contact from first call to the final guest exit.",
  },
];

const eventCategories = [
  { label: "Birthday Celebrations", image: img.bannerBirthday },
  { label: "Kids Parties", image: img.kids },
  { label: "Wedding Events", image: img.bannerWedding },
  { label: "Haldi Functions", image: img.haldi },
  { label: "Mehendi Functions", image: img.mehendi },
  { label: "Corporate Events", image: img.corporate },
  { label: "Private Parties", image: img.privateEvent },
];

const steps = [
  { no: "01", title: "Consultation", text: "We understand your event requirements, guest count and budget." },
  { no: "02", title: "Theme & Planning", text: "We create the concept, theme, colour palette and event plan." },
  { no: "03", title: "Decoration & Coordination", text: "We prepare the venue and coordinate every service." },
  { no: "04", title: "Event Execution", text: "Our team professionally manages the entire event day." },
  { no: "05", title: "Memorable Celebration", text: "You get a beautiful, unforgettable experience." },
];

function Home() {
  const { data } = useStore();
  const services = data.services.filter((s) => s.active).slice(0, 8);
  const projects = data.portfolio.filter((p) => p.active).slice(0, 6);
  const reviews = data.testimonials.filter((t) => t.active).slice(0, 3);

  return (
    <PublicLayout>
      <Hero />

      {/* Introduction */}
      <section className="bg-card px-4 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            <img
              src={img.balloon}
              alt="Balloon decoration in Pune"
              className="h-52 w-full rounded-3xl object-cover sm:h-64"
              loading="lazy"
            />
            <img
              src={img.haldi}
              alt="Haldi decoration in Pune"
              className="mt-8 h-52 w-full rounded-3xl object-cover sm:h-64"
              loading="lazy"
            />
          </div>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Who We Are"
              title="Celebrations designed with heart and colour"
              subtitle="From colorful birthdays to elegant pre-wedding celebrations, Dream Factory Events turns every occasion into a beautifully crafted experience."
            />
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {data.about.stats.map((s) => (
                <div key={s.id} className="rounded-2xl bg-lavender p-4 text-center">
                  <p className="font-display text-xl font-bold text-primary">{s.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
            <Link to="/about" className="btn-primary mt-8">
              Discover Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="surface-soft px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Our Services"
            title="Everything your celebration needs"
            subtitle="Decoration, catering, photography, sound and complete event management under one roof."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <article key={s.id} className="card-soft overflow-hidden">
                <div className="overflow-hidden">
                  <img
                    src={s.image}
                    alt={`${s.title} in Pune`}
                    className="h-40 w-full object-cover transition-transform duration-500 hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
                  <Link
                    to="/services"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-magenta hover:gap-2"
                  >
                    View Details →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-card px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="A creative partner you can trust"
            subtitle="We combine imaginative themes with honest pricing and flawless on-ground execution."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-3xl border border-border bg-cream p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blush text-2xl">
                  {b.icon}
                </span>
                <h3 className="mt-4 text-base font-bold text-foreground">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured portfolio */}
      <section className="bg-background px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Featured Work"
            title="Recent events we styled"
            subtitle="A glimpse of birthdays, weddings, haldi functions and corporate events across Pune."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <article key={p.id} className="card-soft overflow-hidden">
                <div className="overflow-hidden">
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="h-56 w-full object-cover transition-transform duration-500 hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <span className="rounded-full bg-peach px-3 py-1 text-xs font-semibold text-magenta">
                    {p.category}
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-foreground">{p.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
                  <Link
                    to="/portfolio"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-magenta hover:gap-2"
                  >
                    View Project →
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/portfolio" className="btn-primary">
              View Full Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="surface-soft px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Event Categories" title="What we love to create" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {eventCategories.map((c) => (
              <Link
                key={c.label}
                to="/portfolio"
                className="group relative block overflow-hidden rounded-3xl"
              >
                <img
                  src={c.image}
                  alt={c.label}
                  className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/80 to-transparent p-4 text-sm font-bold text-primary-foreground">
                  {c.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-card px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="How It Works"
            title="Five simple steps to a beautiful event"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((s) => (
              <div key={s.no} className="rounded-3xl border border-border bg-background p-5">
                <span className="font-display text-3xl font-bold text-gradient-brand">{s.no}</span>
                <h3 className="mt-3 text-base font-bold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-background px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Testimonials"
            title="Families and companies who celebrated with us"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((t) => (
              <blockquote key={t.id} className="card-soft p-6">
                <Stars rating={t.rating} />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">"{t.review}"</p>
                <footer className="mt-5">
                  <p className="text-sm font-bold text-foreground">{t.name}</p>
                  <p className="text-xs text-magenta">{t.eventType}</p>
                </footer>
              </blockquote>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/testimonials" className="btn-outline">
              Read All Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* CTA + enquiry */}
      <section className="surface-soft px-4 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Let's Celebrate"
              title="Tell us about your event"
              subtitle="Share your date, guest count and budget — we'll come back with a theme and a quote."
            />
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li>📍 {data.settings.address}</li>
              <li>
                📞 {data.settings.phone1} · {data.settings.phone2}
              </li>
              <li>✉️ {data.settings.email}</li>
              <li>🕘 {data.settings.hours}</li>
            </ul>
          </div>
          <EnquiryForm compact />
        </div>
      </section>
    </PublicLayout>
  );
}
