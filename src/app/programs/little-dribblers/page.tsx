import Link from "next/link";
import { PageHero, ContentSection } from "@/components/ui/Section";
import { LittleDribblersGallery } from "@/components/galleries/PublicFolderGallery";
import { littleDribblersPdf } from "@/data/pdf-part1";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Little Dribblers",
  description: "Grades K–2 fundamentals program — five Saturday sessions at Philipsburg-Osceola Middle School.",
  path: "/programs/little-dribblers",
});

export default function LittleDribblersPage() {
  const s2026 = littleDribblersPdf.season2026;

  return (
    <>
      <PageHero eyebrow="Programs" title="Little Dribblers" />
      <ContentSection>
        <div className="mb-8 rounded-lg border-2 border-dashed border-mountie-blue/20 p-6">
          <h2 className="font-display text-xl font-bold uppercase text-deep-navy">2027 Season</h2>
          <p className="mt-2 text-mountie-blue/80">{littleDribblersPdf.season2027}</p>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-sm">
          <h2 className="font-display text-2xl font-bold uppercase text-deep-navy">2026 Season</h2>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div><dt className="text-xs font-bold uppercase text-mountie-blue/60">Dates</dt><dd className="font-semibold">{s2026.dates}</dd></div>
            <div><dt className="text-xs font-bold uppercase text-mountie-blue/60">Time</dt><dd className="font-semibold">{s2026.time}</dd></div>
            <div className="sm:col-span-2"><dt className="text-xs font-bold uppercase text-mountie-blue/60">Location</dt><dd>{s2026.location}</dd></div>
          </dl>
          <p className="mt-6 leading-relaxed text-mountie-blue/80">{s2026.description}</p>
          <p className="mt-4 text-sm font-semibold text-deep-navy">{s2026.disclaimer}</p>
          <Link href={s2026.registrationLink} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block font-semibold text-electric-blue hover:underline">
            Complete registration paperwork
          </Link>
        </div>

        <div className="mt-10">
          <LittleDribblersGallery />
        </div>
      </ContentSection>
    </>
  );
}
