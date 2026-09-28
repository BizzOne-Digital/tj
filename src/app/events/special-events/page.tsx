import { PageHero, ContentSection } from "@/components/ui/Section";
import { SpecialEventsTabNav } from "@/components/layout/ProgramTabNav";
import { specialEvents } from "@/data/pdf-part2";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Special Events",
  path: "/events/special-events",
  description: "End of year banquets, youth camps, clinics, and special program events.",
});

export default function SpecialEventsPage() {
  return (
    <>
      <PageHero eyebrow="Events" title="Special Events" />
      <ContentSection>
        <SpecialEventsTabNav currentPath="/events/special-events" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {specialEvents.categories.map((cat) => (
            <a
              key={cat.id}
              href={`/events/special-events/${cat.id}`}
              className="rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h2 className="font-display text-lg font-bold uppercase text-deep-navy">{cat.title}</h2>
              <p className="mt-2 text-sm text-mountie-blue/70">{cat.seasons.length} season archives</p>
            </a>
          ))}
        </div>
      </ContentSection>
    </>
  );
}
