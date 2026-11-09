import { PageHero } from "@/components/ui/PageHero";
import { ContentSection } from "@/components/ui/Section";
import { SelectProgramTabNav } from "@/components/layout/ProgramTabNav";
import { createPageMetadata } from "@/lib/page-metadata";
import { getSiteData } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: "P-O Select Program",
  description: "1st Annual 2026 P-O Select Elementary Winter League.",
  path: "/select-program",
});

export default async function SelectProgramPage() {
  const { selectLeagueContent } = await getSiteData("pdf-part2");
  const { selectLeaguePricing } = await getSiteData("pricing");
  const { selectProgramRecord } = await getSiteData("teams");
  return (
    <>
      <PageHero eyebrow="Select Program" title="P-O Select Program" subtitle="1st Annual 2026 P-O Select Elementary Winter League" />
      <ContentSection>
        <SelectProgramTabNav currentPath="/select-program" />
        <div className="mb-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-deep-navy p-6 text-center text-white">
            <p className="text-xs font-bold uppercase tracking-wider text-electric-blue">Per Team</p>
            <p className="mt-2 font-display text-3xl font-bold">{selectLeaguePricing.perTeam}</p>
          </div>
          <div className="rounded-lg bg-deep-navy p-6 text-center text-white">
            <p className="text-xs font-bold uppercase tracking-wider text-electric-blue">Additional Team</p>
            <p className="mt-2 font-display text-3xl font-bold">{selectLeaguePricing.additionalTeam}</p>
          </div>
          <div className="rounded-lg border-2 border-electric-blue/30 bg-white p-6 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-electric-blue">{selectProgramRecord.season}</p>
            <p className="mt-2 font-display text-3xl font-bold text-deep-navy">{selectProgramRecord.record}</p>
            <p className="mt-1 text-xs text-mountie-blue/60">{selectProgramRecord.note}</p>
          </div>
        </div>
        <div className="prose prose-lg max-w-none whitespace-pre-line text-mountie-blue/80">
          {selectLeagueContent}
        </div>
      </ContentSection>
    </>
  );
}
