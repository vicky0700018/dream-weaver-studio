export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <header className="surface-soft border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-14 text-center sm:py-20">
        <span className="inline-block rounded-full bg-card/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-magenta">
          {eyebrow}
        </span>
        <h1 className="mt-4 text-4xl font-bold leading-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      </div>
    </header>
  );
}
