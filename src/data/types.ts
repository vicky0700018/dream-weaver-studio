export type Banner = {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  active: boolean;
};

export type Service = {
  id: string;
  title: string;
  short: string;
  description: string;
  image: string;
  features: string[];
  active: boolean;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  date: string;
  theme: string;
  images: string[];
  services: string[];
  highlights: string[];
  active: boolean;
};

export type GalleryItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  active: boolean;
};

export type Testimonial = {
  id: string;
  name: string;
  eventType: string;
  rating: number;
  review: string;
  active: boolean;
};

export type EnquiryStatus = "New" | "Contacted" | "In Progress" | "Completed";

export type Enquiry = {
  id: string;
  name: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  guests: string;
  venue: string;
  budget: string;
  requirements: string;
  submittedAt: string;
  status: EnquiryStatus;
};

export type AboutContent = {
  intro: string;
  story: string;
  mission: string;
  vision: string;
  approach: string;
  philosophy: string;
  stats: { id: string; label: string; value: string }[];
};

export type Settings = {
  businessName: string;
  address: string;
  phone1: string;
  phone2: string;
  email: string;
  hours: string;
  instagram: string;
  facebook: string;
  whatsapp: string;
};
