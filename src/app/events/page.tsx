import Link from "next/link";
import { PageHero, ContentSection } from "@/components/ui/Section";
import { events } from "@/data/events";
import { IconArrowRight } from "@/components/icons";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Events",
  description: "P-O Cash Bash, league championships, camps, clinics, and special events.",
  path: "/events",
});

export default function EventsPage() {
  return (
    <>
      <PageHero eyebrow="Events" title="Program Events" subtitle="Fundraisers, championships, camps, and community events." />
      <ContentSection>
        <div className="mb-8">
          <Link href="/events/special-events" className="inline-flex items-center gap-2 rounded-lg bg-deep-navy px-6 py-4 font-display font-bold uppercase text-white hover:bg-mountie-blue">
            Special Events <IconArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {events.map((event) => (
            <div key={event.id} className="rounded-lg bg-white p-8 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-electric-blue">{event.status}</p>
              <h2 className="mt-2 font-display text-xl font-bold uppercase text-deep-navy">{event.title}</h2>
              <p className="mt-3 text-mountie-blue/80">{event.description}</p>
              {event.href && (
                <Link href={event.href} className="mt-4 inline-flex items-center gap-1 font-semibold text-electric-blue hover:underline">
                  View Event <IconArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </ContentSection>
    </>
  );
}
