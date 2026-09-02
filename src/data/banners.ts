import { img } from "./images";
import type { Banner } from "./types";

export const banners: Banner[] = [
  {
    id: "b1",
    image: img.bannerBirthday,
    title: "Turning Moments Into Magical Memories",
    subtitle: "Creative Events. Beautiful Decor. Unforgettable Celebrations.",
    buttonText: "Explore Our Work",
    active: true,
  },
  {
    id: "b2",
    image: img.bannerWedding,
    title: "Celebrate. We Create The Magic.",
    subtitle: "Complete Event Planning, Decoration & Catering in Pune",
    buttonText: "Plan Your Event",
    active: true,
  },
  {
    id: "b3",
    image: img.balloon,
    title: "Balloon Art & Themed Backdrops",
    subtitle: "Budget-friendly setups styled with a premium finish",
    buttonText: "See Our Themes",
    active: true,
  },
];
