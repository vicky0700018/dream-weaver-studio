import { img } from "./images";
import type { Service } from "./types";

export const services: Service[] = [
  {
    id: "s1",
    title: "Event Decoration",
    short: "Balloon decor, backdrops, stage and floral styling for every occasion.",
    description:
      "Balloon decorations, themed backdrops, stage decoration, floral arrangements and fully customized theme setups for homes, lawns and banquet halls across Pune.",
    image: img.balloon,
    features: ["Balloon Arches", "Themed Backdrops", "Stage Designs", "Floral Decoration"],
    active: true,
  },
  {
    id: "s2",
    title: "Birthday Themes",
    short: "Kids birthday themes and milestone birthdays styled beautifully.",
    description:
      "Kids birthday themes, milestone birthdays, customized backdrops, balloon arches and cake table decoration designed around your child's favourite theme.",
    image: img.kids,
    features: ["Custom Themes", "Cake Table Styling", "Photo Corners", "Props & Signage"],
    active: true,
  },
  {
    id: "s3",
    title: "Balloon Art",
    short: "Sculpted balloon installations, garlands and grand entry arches.",
    description:
      "Organic balloon garlands, arches, ceiling installations and sculpted balloon art created with premium quality balloons in your chosen colour palette.",
    image: img.bannerBirthday,
    features: ["Organic Garlands", "Entry Arches", "Ceiling Installations", "Colour Palettes"],
    active: true,
  },
  {
    id: "s4",
    title: "Wedding & Pre-Wedding",
    short: "Haldi, Mehendi, engagement and wedding decoration.",
    description:
      "Haldi, Mehendi, engagement and other pre-wedding functions styled with drapes, marigolds, florals and elegant stage setups, plus complete wedding-day decoration.",
    image: img.bannerWedding,
    features: ["Haldi Decoration", "Mehendi Setups", "Mandap & Stage", "Floral Design"],
    active: true,
  },
  {
    id: "s5",
    title: "Catering",
    short: "Multi-cuisine menus customized to your guest count and budget.",
    description:
      "Multi-cuisine menus for weddings, corporate events and private celebrations, with live counters, customized menus and professional serving staff.",
    image: img.catering,
    features: ["Multi-Cuisine Menus", "Live Counters", "Custom Menus", "Trained Staff"],
    active: true,
  },
  {
    id: "s6",
    title: "Photography",
    short: "Candid and traditional event photography that keeps memories alive.",
    description:
      "Professional event photography and videography covering candid moments, decor shots, family portraits and full event coverage.",
    image: img.privateEvent,
    features: ["Candid Coverage", "Decor Shoots", "Family Portraits", "Edited Albums"],
    active: true,
  },
  {
    id: "s7",
    title: "Sound & Lighting",
    short: "Ambience lighting, uplighters and crisp sound systems.",
    description:
      "Sound systems, DJ setups, ambience and stage lighting managed end-to-end so your celebration looks and sounds perfect.",
    image: img.lighting,
    features: ["Stage Lighting", "Uplighters", "Sound Systems", "DJ & Entertainment"],
    active: true,
  },
  {
    id: "s8",
    title: "Complete Event Management",
    short: "One team for planning, decor, catering and event-day execution.",
    description:
      "End-to-end event planning and execution — concept, vendors, decor, catering, entertainment and on-ground coordination handled by a single team.",
    image: img.corporate,
    features: ["Concept & Planning", "Vendor Management", "Event-Day Coordination", "Execution"],
    active: true,
  },
];
