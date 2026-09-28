import { PageHero, ContentSection } from "@/components/ui/Section";
import { SelectProgramTabNav } from "@/components/layout/ProgramTabNav";
import { selectGameResultsWeeks } from "@/data/pdf-part2";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Select Game Results",
  path: "/select-program/game-results",
  description: "Weekly select league game scores and players of the week.",
});

export default function SelectGameResultsPage() {
  return (
    <>
      <PageHero eyebrow="Select Program" title="Game Results" subtitle="Weekly scores and players of the week." />
      <ContentSection>
        <SelectProgramTabNav currentPath="/select-program/game-results" />
        <div className="space-y-4">
          {selectGameResultsWeeks.map((week) => (
            <details key={week.week} className="group rounded-lg border border-mountie-blue/10 bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-4 font-display font-bold uppercase text-deep-navy [&::-webkit-details-marker]:hidden">
                {week.label}
                <span className="text-electric-blue group-open:rotate-45">+</span>
              </summary>
              <div className="border-t border-mountie-blue/10 px-6 py-4 text-sm text-mountie-blue/60">
                Scores and players of the week pending update.
              </div>
            </details>
          ))}
        </div>
      </ContentSection>
    </>
  );
}
