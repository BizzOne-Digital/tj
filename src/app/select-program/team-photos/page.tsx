import { PageHero, ContentSection } from "@/components/ui/Section";
import { SelectProgramTabNav } from "@/components/layout/ProgramTabNav";
import { SelectTeamGalleries } from "@/components/galleries/PublicFolderGallery";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Select Team Photos",
  path: "/select-program/team-photos",
  description: "P-O Select team photos, schedules, and player photos by season.",
});

export default function SelectTeamPhotosPage() {
  return (
    <>
      <PageHero eyebrow="Select Program" title="The Select Teams" subtitle="Team photos, schedules, and player photos." />
      <ContentSection>
        <SelectProgramTabNav currentPath="/select-program/team-photos" />
        <SelectTeamGalleries />
      </ContentSection>
    </>
  );
}
