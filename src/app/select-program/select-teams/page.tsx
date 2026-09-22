import { PageHero, ContentSection } from "@/components/ui/Section";
import { SelectProgramTabNav } from "@/components/layout/ProgramTabNav";
import { SelectTeamGalleries } from "@/components/galleries/PublicFolderGallery";
import { selectTeamsContent } from "@/data/pdf-part2";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Select Teams",
  path: "/select-program/select-teams",
  description: "P-O Select travel basketball teams — commitment, playing time, and expectations.",
});

export default function SelectTeamsPage() {
  return (
    <>
      <PageHero eyebrow="Select Program" title="Select Teams" />
      <ContentSection>
        <SelectProgramTabNav currentPath="/select-program/select-teams" />
        <div className="prose prose-lg max-w-none whitespace-pre-line text-mountie-blue/80">
          {selectTeamsContent}
        </div>
        <div className="mt-12">
          <SelectTeamGalleries />
        </div>
      </ContentSection>
    </>
  );
}
