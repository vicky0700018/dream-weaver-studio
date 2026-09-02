import { img } from "./images";
import type { GalleryItem } from "./types";

export const galleryCategories = [
  "Birthday",
  "Decoration",
  "Wedding",
  "Haldi",
  "Mehendi",
  "Corporate",
  "Catering",
];

export const gallery: GalleryItem[] = [
  { id: "g1", title: "Blush Balloon Arch", category: "Birthday", image: img.bannerBirthday, active: true },
  { id: "g2", title: "Pastel Backdrop Setup", category: "Decoration", image: img.balloon, active: true },
  { id: "g3", title: "Ivory Wedding Stage", category: "Wedding", image: img.bannerWedding, active: true },
  { id: "g4", title: "Marigold Haldi Canopy", category: "Haldi", image: img.haldi, active: true },
  { id: "g5", title: "Umbrella Mehendi Decor", category: "Mehendi", image: img.mehendi, active: true },
  { id: "g6", title: "Corporate Gala Stage", category: "Corporate", image: img.corporate, active: true },
  { id: "g7", title: "Live Buffet Counters", category: "Catering", image: img.catering, active: true },
  { id: "g8", title: "Rainbow Kids Party", category: "Birthday", image: img.kids, active: true },
  { id: "g9", title: "Rose Table Styling", category: "Decoration", image: img.privateEvent, active: true },
  { id: "g10", title: "Stage Lighting Design", category: "Decoration", image: img.lighting, active: true },
  { id: "g11", title: "Floral Wedding Detail", category: "Wedding", image: img.privateEvent, active: true },
  { id: "g12", title: "Dessert Table Styling", category: "Catering", image: img.kids, active: true },
];
