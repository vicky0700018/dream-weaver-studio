import { createFileRoute } from "@tanstack/react-router";

import { EnquiryForm } from "@/components/EnquiryForm";
import { PageHeader } from "@/components/PageHeader";
import { PublicLayout } from "@/components/PublicLayout";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Dream Factory Events | Event Planner in Kharadi, Pune" },
      {
        name: "description",
        content:
          "Contact Dream Factory Events in Kharadi, Pune for event decoration, catering and planning. Call, WhatsApp or send an enquiry for a free quote.",
      },
      { property: "og:title", content: "Contact Dream Factory Events, Pune" },
      {
        property: "og:description",
        content: "Call, WhatsApp or send us an enquiry for your next celebration in Pune.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { data } = useStore();
  const s = data.settings;
  const waNumber = s.whatsapp.replace(/[^0-9]/g, "");

  const details = [
    { label: "Address", value: s.address, icon: "📍" },
    { label: "Phone", value: `${s.phone1} · ${s.phone2}`, icon: "📞" },
    { label: "Email", value: s.email, icon: "✉️" },
    { label: "Working Hours", value: s.hours, icon: "🕘" },
    { label: "Service Areas", value: s.serviceAreas, icon: "🗺️" },
  ];

  return (
    <PublicLayout>
      <PageHeader
        eyebrow="Contact Us"
        title="Let's plan something beautiful"
        subtitle="Share your event details and our team will get back to you with a theme and quote."
      />

      <section className="bg-background px-4 py-16">
        <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-6">
            <div className="card-soft p-6">
              <h2 className="text-xl font-bold text-foreground">Reach us directly</h2>
              <ul className="mt-5 space-y-4">
                {details.map((d) => (
                  <li key={d.label} className="flex gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blush text-lg">
                      {d.icon}
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {d.label}
                      </p>
                      <p className="text-sm text-foreground">{d.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={`tel:${s.phone1}`} className="btn-primary !px-6 !py-2.5 !text-sm">
                  Call Now
                </a>
                <a
                  href={`https://wa.me/${waNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline !px-6 !py-2.5 !text-sm"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-border">
              <iframe
                title="Dream Factory Events location in Pune"
                src={`https://www.google.com/maps?q=${encodeURIComponent(s.address)}&output=embed`}
                className="h-64 w-full"
                loading="lazy"
              />
            </div>
          </div>

          <EnquiryForm />
        </div>
      </section>
    </PublicLayout>
  );
}
