import type { Enquiry } from "./types";

export const enquiries: Enquiry[] = [
  {
    id: "e1",
    name: "Meera Joshi",
    phone: "+91 98220 11223",
    email: "meera.joshi@example.com",
    eventType: "Birthday Decoration",
    eventDate: "2026-10-12",
    guests: "60",
    venue: "Kharadi, Pune",
    budget: "₹25,000 - ₹50,000",
    requirements: "Pastel theme balloon decor with cake table styling.",
    submittedAt: "2026-08-28",
    status: "New",
  },
  {
    id: "e2",
    name: "Sagar Kadam",
    phone: "+91 91560 44872",
    email: "sagar.kadam@example.com",
    eventType: "Wedding & Pre-Wedding",
    eventDate: "2026-12-04",
    guests: "500",
    venue: "Wagholi, Pune",
    budget: "₹2,00,000+",
    requirements: "Haldi, Mehendi and wedding stage decoration with catering.",
    submittedAt: "2026-08-24",
    status: "Contacted",
  },
];
