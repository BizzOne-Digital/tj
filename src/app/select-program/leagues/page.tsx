import { PageHero, ContentSection } from "@/components/ui/Section";
import { SelectProgramTabNav } from "@/components/layout/ProgramTabNav";
import { selectLeaguesBySeason } from "@/data/pdf-part2";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Select Leagues",
  path: "/select-program/leagues",
  description: "P-O Select Program league participation by season.",
});

export default function SelectLeaguesPage() {
  return (
    <>
      <PageHero eyebrow="Select Program" title="Leagues" />
      <ContentSection>
        <SelectProgramTabNav currentPath="/select-program/leagues" />
        <div className="space-y-6">
          {selectLeaguesBySeason.map((season) => (
            <div key={season.season} className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="font-display text-xl font-bold uppercase text-deep-navy">{season.season}</h2>
              <ul className="mt-3 space-y-1 text-mountie-blue/80">
                {season.leagues.map((l) => <li key={l}>{l}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </ContentSection>
    </>
  );
}
