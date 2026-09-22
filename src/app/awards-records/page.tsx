import { PageHero, ContentSection, SectionHeading } from "@/components/ui/Section";
import { AwardsTabNav } from "@/components/layout/ProgramTabNav";
import { recordBookCategories, recordBookNote } from "@/data/awards";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Awards & Record Book",
  description: "League awards, championships, all-stars, and program record book.",
  path: "/awards-records",
});

export default function AwardsRecordsPage() {
  return (
    <>
      <PageHero eyebrow="Achievements" title="Awards & Record Book" subtitle="Honoring excellence on and off the court." />
      <ContentSection>
        <AwardsTabNav currentPath="/awards-records" />
        <SectionHeading
          title="Program Honors"
          description="League player awards, team championships, and all-star selections by season."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <a href="/awards-records/league-player-awards" className="rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <h3 className="font-display font-bold uppercase text-deep-navy">League Player Awards</h3>
            <p className="mt-2 text-sm text-mountie-blue/70">2025–26 Season</p>
          </a>
          <a href="/awards-records/team-championships" className="rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <h3 className="font-display font-bold uppercase text-deep-navy">Team Championships</h3>
            <p className="mt-2 text-sm text-mountie-blue/70">2024–25 & 2025–26</p>
          </a>
          <a href="/awards-records/league-all-stars" className="rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <h3 className="font-display font-bold uppercase text-deep-navy">League All-Stars</h3>
            <p className="mt-2 text-sm text-mountie-blue/70">2025–26 Season</p>
          </a>
          <a href="/awards-records/record-book" className="rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <h3 className="font-display font-bold uppercase text-deep-navy">Record Book</h3>
            <p className="mt-2 text-sm text-mountie-blue/70">All-Time Leaders</p>
          </a>
        </div>
      </ContentSection>
      <ContentSection dark>
        <SectionHeading title="Record Book" description={recordBookNote} light />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recordBookCategories.map((cat) => (
            <div key={cat.id} className="rounded-lg border border-white/10 bg-white/5 p-6">
              <h3 className="font-display text-sm font-bold uppercase text-white">{cat.title}</h3>
              <p className="mt-2 text-xs text-cool-grey">Pending verified data</p>
            </div>
          ))}
        </div>
      </ContentSection>
    </>
  );
}
