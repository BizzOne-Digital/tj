import { PageHero, ContentSection } from "@/components/ui/Section";
import { YouthCampTabNav } from "@/components/layout/ProgramTabNav";
import {
  PublicFolderGallery,
  ScholarshipWinnersGallery,
} from "@/components/galleries/PublicFolderGallery";
import { mediaFolders } from "@/config/media-folders";
import { scholarshipWinnersPdf } from "@/data/pdf-part1";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Scholarship Winners",
  path: "/programs/youth-basketball-camp/scholarship-winners",
  description: "P-O Youth Basketball Camp scholarship winners.",
});

export default function ScholarshipWinnersPage() {
  return (
    <>
      <PageHero eyebrow="Youth Camp" title="Scholarship Winners" />
      <ContentSection>
        <YouthCampTabNav currentPath="/programs/youth-basketball-camp/scholarship-winners" />
        <p className="max-w-3xl text-lg leading-relaxed text-mountie-blue/80">{scholarshipWinnersPdf.intro}</p>
        <div className="mt-10 space-y-10">
          <PublicFolderGallery
            folderPath={mediaFolders.scholarshipDay.poster}
            title="Big Dreams Start Here — Scholarship Day"
          />
          <ScholarshipWinnersGallery />
        </div>
      </ContentSection>
    </>
  );
}
