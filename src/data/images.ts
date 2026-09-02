import bannerBirthday from "@/assets/banner-birthday.jpg";
import bannerWedding from "@/assets/banner-wedding.jpg";
import haldi from "@/assets/haldi.jpg";
import mehendi from "@/assets/mehendi.jpg";
import kids from "@/assets/kids.jpg";
import catering from "@/assets/catering.jpg";
import corporate from "@/assets/corporate.jpg";
import balloon from "@/assets/balloon.jpg";
import privateEvent from "@/assets/private.jpg";
import lighting from "@/assets/lighting.jpg";

export const img = {
  bannerBirthday,
  bannerWedding,
  haldi,
  mehendi,
  kids,
  catering,
  corporate,
  balloon,
  privateEvent,
  lighting,
};

export const imageOptions = Object.entries(img).map(([key, value]) => ({
  key,
  value,
}));
