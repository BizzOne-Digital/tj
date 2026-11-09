import type { FamilyTestimonial } from "@/data/little-mounties-testimonials";

export function FamilyTestimonialCards({ items }: { items: FamilyTestimonial[] }) {
  return (
    <ul className="mx-auto flex max-w-3xl flex-col gap-6">
      {items.map((item) => (
        <li key={item.id}>
          <article className="rounded-lg border border-white/10 bg-black/25 p-6 shadow-lg backdrop-blur-sm md:p-8">
            <p className="text-base leading-relaxed text-cool-grey md:text-lg">&ldquo;{item.quote}&rdquo;</p>
            <p className="mt-5 font-display text-sm font-bold uppercase tracking-wide text-white">
              {item.attribution}
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}
