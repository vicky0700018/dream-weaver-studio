import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { useStore } from "@/lib/store";

export function Hero() {
  const { data } = useStore();
  const slides = data.banners.filter((b) => b.active);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  useEffect(() => {
    if (index >= slides.length) setIndex(0);
  }, [index, slides.length]);

  if (slides.length === 0) {
    return (
      <section className="surface-soft px-4 py-24 text-center">
        <h1 className="font-display text-4xl font-bold text-foreground">
          Dream Factory Events
        </h1>
        <p className="mt-3 text-muted-foreground">
          Banners will appear here once added from the admin panel.
        </p>
      </section>
    );
  }

  const active = slides[Math.min(index, slides.length - 1)];
  const go = (dir: number) => setIndex((i) => (i + dir + slides.length) % slides.length);

  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="relative h-[560px] w-full sm:h-[620px]">
        {slides.map((s, i) => (
          <img
            key={s.id}
            src={s.image}
            alt={s.title}
            width={1600}
            height={1000}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-r from-cream/95 via-cream/55 to-transparent" />

        <div className="relative mx-auto flex h-full max-w-7xl items-center px-4">
          <div className="max-w-xl rounded-3xl bg-card/70 p-6 backdrop-blur-sm sm:p-9">
            <span className="inline-block rounded-full bg-lavender px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Event Planner in Pune
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-[1.1] text-foreground sm:text-5xl">
              {active.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {active.subtitle}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/portfolio" className="btn-primary">
                {active.buttonText}
              </Link>
              <Link to="/contact" className="btn-outline">
                Plan Your Event
              </Link>
            </div>
          </div>
        </div>

        {slides.length > 1 ? (
          <>
            <button
              type="button"
              aria-label="Previous banner"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 text-primary shadow-md transition hover:bg-card sm:flex"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next banner"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 text-primary shadow-md transition hover:bg-card sm:flex"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  aria-label={`Go to banner ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    i === index ? "w-8 bg-magenta" : "w-2.5 bg-card/90"
                  }`}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
