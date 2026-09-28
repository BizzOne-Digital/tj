import { PageHero, ContentSection } from "@/components/ui/Section";
import { SelectProgramTabNav } from "@/components/layout/ProgramTabNav";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "2026–27 Select Season",
  path: "/select-program/2026-27",
  description: "P-O Select Program 2026–27 season information.",
});

export default function Select2026_27Page() {
  return (
    <>
      <PageHero eyebrow="Select Program" title="2026–27 Season" />
      <ContentSection>
        <SelectProgramTabNav currentPath="/select-program/2026-27" />
        <p className="text-mountie-blue/80">2026–27 season schedules, results, and team information will be updated throughout the season.</p>
      </ContentSection>
    </>
  );
}
