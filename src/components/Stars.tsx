export function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${n <= rating ? "text-gold" : "text-border"}`}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10 1.6l2.47 5.2 5.53.72-4.06 3.9 1.03 5.6L10 14.4l-4.97 2.62 1.03-5.6L2 7.52l5.53-.72L10 1.6z" />
        </svg>
      ))}
    </div>
  );
}
