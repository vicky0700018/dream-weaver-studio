import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { about as defaultAbout } from "@/data/about";
import { banners as defaultBanners } from "@/data/banners";
import { enquiries as defaultEnquiries } from "@/data/enquiries";
import { gallery as defaultGallery } from "@/data/gallery";
import { portfolio as defaultPortfolio } from "@/data/portfolio";
import { services as defaultServices } from "@/data/services";
import { settings as defaultSettings } from "@/data/settings";
import { testimonials as defaultTestimonials } from "@/data/testimonials";
import type {
  AboutContent,
  Banner,
  Enquiry,
  GalleryItem,
  Project,
  Service,
  Settings,
  Testimonial,
} from "@/data/types";

const STORAGE_KEY = "dfe_site_data_v1";

export type SiteData = {
  banners: Banner[];
  services: Service[];
  portfolio: Project[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  enquiries: Enquiry[];
  about: AboutContent;
  settings: Settings;
};

const defaults: SiteData = {
  banners: defaultBanners,
  services: defaultServices,
  portfolio: defaultPortfolio,
  gallery: defaultGallery,
  testimonials: defaultTestimonials,
  enquiries: defaultEnquiries,
  about: defaultAbout,
  settings: defaultSettings,
};

type StoreValue = {
  data: SiteData;
  hydrated: boolean;
  patch: (partial: Partial<SiteData>) => void;
  resetAll: () => void;
};

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(defaults);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<SiteData>;
        setData({ ...defaults, ...parsed });
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* storage full or unavailable */
    }
  }, [data, hydrated]);

  const patch = useCallback((partial: Partial<SiteData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  }, []);

  const resetAll = useCallback(() => setData(defaults), []);

  const value = useMemo(
    () => ({ data, hydrated, patch, resetAll }),
    [data, hydrated, patch, resetAll],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

/** Helper for admin CRUD on a list field of the store. */
export function useCollection<K extends "banners" | "services" | "portfolio" | "gallery" | "testimonials">(
  key: K,
) {
  const { data, patch } = useStore();
  const items = data[key] as SiteData[K];

  const setItems = (next: SiteData[K]) => patch({ [key]: next } as Partial<SiteData>);

  return {
    items,
    add: (item: SiteData[K][number]) => setItems([...(items as any[]), item] as SiteData[K]),
    update: (id: string, changes: Partial<SiteData[K][number]>) =>
      setItems(
        (items as any[]).map((i) => (i.id === id ? { ...i, ...changes } : i)) as SiteData[K],
      ),
    remove: (id: string) =>
      setItems((items as any[]).filter((i) => i.id !== id) as SiteData[K]),
  };
}

export const newId = () => Math.random().toString(36).slice(2, 10);
