import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow && (
        <p
          className={cn(
            "mb-3 font-display text-sm font-bold uppercase tracking-[0.2em]",
            light ? "text-electric-blue" : "text-mountie-blue"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "section-title",
          light ? "text-white" : "text-deep-navy"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            light ? "text-cool-grey" : "text-mountie-blue/80"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export function PageHero({
  title,
  subtitle,
  eyebrow,
  children,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-deep-navy pb-16 pt-32 md:pb-24 md:pt-40">
      <div className="court-lines absolute inset-0 opacity-20" aria-hidden="true" />
      <div className="grain absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="container relative z-10">
        {eyebrow && (
          <p className="mb-4 font-display text-sm font-bold uppercase tracking-[0.25em] text-electric-blue">
            {eyebrow}
          </p>
        )}
        <h1 className="hero-title max-w-4xl text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl text-lg text-cool-grey md:text-xl">{subtitle}</p>
        )}
        {children}
      </div>
      <div className="angle-divider-bottom" aria-hidden="true" />
    </section>
  );
}

export function ContentSection({
  children,
  className,
  dark = false,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24",
        dark ? "bg-deep-navy text-white" : "bg-light-bg text-deep-navy",
        className
      )}
    >
      <div className="container">{children}</div>
    </section>
  );
}

export function MediaComingSoon({
  title = "Media Coming Soon",
  description = "Client-approved photos and videos will be added here.",
  className,
}: {
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-[240px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-mountie-blue/20 bg-white p-8 text-center",
        className
      )}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-mountie-blue/10">
        <svg viewBox="0 0 24 24" className="h-8 w-8 text-mountie-blue" fill="none" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="8.5" cy="10.5" r="1.5" fill="currentColor" />
          <path d="M21 16l-5-5-4 4-2-2-5 5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
      <h3 className="font-display text-lg font-bold uppercase text-deep-navy">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-mountie-blue/70">{description}</p>
    </div>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-cool-grey">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <a href={item.href} className="hover:text-electric-blue">
                {item.label}
              </a>
            ) : (
              <span className="text-white">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Accordion({
  items,
}: {
  items: { id: string; title: string; content: string; href?: string }[];
}) {
  return (
    <div className="divide-y divide-mountie-blue/10 rounded-lg border border-mountie-blue/10 bg-white">
      {items.map((item) => (
        <details key={item.id} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-display text-sm font-bold uppercase tracking-wide text-deep-navy transition-colors hover:text-electric-blue [&::-webkit-details-marker]:hidden">
            {item.title}
            <span className="text-electric-blue transition-transform group-open:rotate-45">+</span>
          </summary>
          <div className="px-6 pb-5 text-mountie-blue/80 leading-relaxed">
            <p>{item.content}</p>
            {item.href && (
              <a href={item.href} className="mt-3 inline-block font-semibold text-electric-blue hover:underline">
                Learn more
              </a>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
