import { PageHero, ContentSection, MediaComingSoon } from "@/components/ui/Section";
import { SelectProgramTabNav } from "@/components/layout/ProgramTabNav";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Select Player Awards",
  path: "/select-program/player-awards",
  description: "P-O Select Program player awards — 2026–27 season.",
});

export default function SelectPlayerAwardsPage() {
  return (
    <>
      <PageHero eyebrow="Select Program" title="League Player Awards" subtitle="2026–27 Season" />
      <ContentSection>
        <SelectProgramTabNav currentPath="/select-program/player-awards" />
        <MediaComingSoon description="Select program player award photos pending client upload." />
      </ContentSection>
    </>
  );
}
