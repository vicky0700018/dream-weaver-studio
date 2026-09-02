import { useState } from "react";

import type { Enquiry } from "@/data/types";
import { newId, useStore } from "@/lib/store";

const eventTypes = [
  "Birthday Decoration",
  "Kids Birthday",
  "Wedding & Pre-Wedding",
  "Haldi Function",
  "Mehendi Function",
  "Corporate Event",
  "Private Party",
  "Catering",
  "Complete Event Management",
];

const budgets = [
  "Under ₹25,000",
  "₹25,000 - ₹50,000",
  "₹50,000 - ₹1,00,000",
  "₹1,00,000 - ₹2,00,000",
  "₹2,00,000+",
];

const empty = {
  name: "",
  phone: "",
  email: "",
  eventType: eventTypes[0],
  eventDate: "",
  guests: "",
  venue: "",
  budget: budgets[1],
  requirements: "",
};

export function EnquiryForm({ compact = false }: { compact?: boolean }) {
  const { data, patch } = useStore();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = (key: keyof typeof empty, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Please enter your full name.";
    if (!/^[+\d][\d\s-]{7,15}$/.test(form.phone.trim())) e.phone = "Enter a valid phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Enter a valid email.";
    if (!form.eventDate) e.eventDate = "Please pick an event date.";
    if (form.requirements.trim().length < 5) e.requirements = "Tell us a little about your event.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    window.setTimeout(() => {
      const enquiry: Enquiry = {
        id: newId(),
        ...form,
        name: form.name.trim().slice(0, 100),
        email: form.email.trim().slice(0, 255),
        requirements: form.requirements.trim().slice(0, 1000),
        submittedAt: new Date().toISOString().slice(0, 10),
        status: "New",
      };
      patch({ enquiries: [enquiry, ...data.enquiries] });
      setLoading(false);
      setDone(true);
      setForm(empty);
    }, 600);
  };

  if (done) {
    return (
      <div className="card-soft p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-lavender text-2xl">
          🎉
        </div>
        <h3 className="mt-4 text-xl font-bold text-foreground">
          Thank you! Our team will get in touch with you soon.
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          We usually respond within a few hours during business hours.
        </p>
        <button type="button" onClick={() => setDone(false)} className="btn-outline mt-6">
          Send another enquiry
        </button>
      </div>
    );
  }

  const err = (k: string) =>
    errors[k] ? <p className="mt-1 text-xs text-destructive">{errors[k]}</p> : null;

  return (
    <form onSubmit={submit} className="card-soft p-6 sm:p-8" noValidate>
      <h3 className="text-xl font-bold text-foreground">Plan Your Event</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Share a few details and we'll design a setup around your budget.
      </p>

      <div className={`mt-6 grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div>
          <label className="text-sm font-medium text-foreground" htmlFor="ef-name">
            Full Name
          </label>
          <input
            id="ef-name"
            className="field mt-1"
            value={form.name}
            maxLength={100}
            onChange={(e) => set("name", e.target.value)}
          />
          {err("name")}
        </div>
        <div>
          <label className="text-sm font-medium text-foreground" htmlFor="ef-phone">
            Phone Number
          </label>
          <input
            id="ef-phone"
            className="field mt-1"
            value={form.phone}
            maxLength={20}
            onChange={(e) => set("phone", e.target.value)}
          />
          {err("phone")}
        </div>
        <div>
          <label className="text-sm font-medium text-foreground" htmlFor="ef-email">
            Email
          </label>
          <input
            id="ef-email"
            type="email"
            className="field mt-1"
            value={form.email}
            maxLength={255}
            onChange={(e) => set("email", e.target.value)}
          />
          {err("email")}
        </div>
        <div>
          <label className="text-sm font-medium text-foreground" htmlFor="ef-type">
            Event Type
          </label>
          <select
            id="ef-type"
            className="field mt-1"
            value={form.eventType}
            onChange={(e) => set("eventType", e.target.value)}
          >
            {eventTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground" htmlFor="ef-date">
            Event Date
          </label>
          <input
            id="ef-date"
            type="date"
            className="field mt-1"
            value={form.eventDate}
            onChange={(e) => set("eventDate", e.target.value)}
          />
          {err("eventDate")}
        </div>
        <div>
          <label className="text-sm font-medium text-foreground" htmlFor="ef-guests">
            Guest Count
          </label>
          <input
            id="ef-guests"
            className="field mt-1"
            value={form.guests}
            maxLength={10}
            onChange={(e) => set("guests", e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground" htmlFor="ef-venue">
            Venue / Location
          </label>
          <input
            id="ef-venue"
            className="field mt-1"
            value={form.venue}
            maxLength={150}
            onChange={(e) => set("venue", e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground" htmlFor="ef-budget">
            Budget Range
          </label>
          <select
            id="ef-budget"
            className="field mt-1"
            value={form.budget}
            onChange={(e) => set("budget", e.target.value)}
          >
            {budgets.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="text-sm font-medium text-foreground" htmlFor="ef-req">
          Requirements
        </label>
        <textarea
          id="ef-req"
          rows={4}
          className="field mt-1"
          maxLength={1000}
          value={form.requirements}
          onChange={(e) => set("requirements", e.target.value)}
        />
        {err("requirements")}
      </div>

      <button type="submit" disabled={loading} className="btn-primary mt-6 w-full sm:w-auto">
        {loading ? "Sending..." : "Request a Consultation"}
      </button>
    </form>
  );
}
