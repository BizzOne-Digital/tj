import { PageHero, ContentSection } from "@/components/ui/Section";
import { YouthCampTabNav } from "@/components/layout/ProgramTabNav";
import { PublicFolderGallery } from "@/components/galleries/PublicFolderGallery";
import { youthCampContent } from "@/data/pdf-part1";
import { mediaFolders } from "@/config/media-folders";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Competition/Scholarship Day",
  description: "Competition and Scholarship Day recap from P-O Youth Basketball Camp.",
  path: "/programs/youth-basketball-camp/scholarship-day",
});

export default function ScholarshipDayPage() {
  const { scholarshipDay } = youthCampContent;

  return (
    <>
      <PageHero eyebrow="Youth Camp" title="Competition/Scholarship Day" />
      <ContentSection>
        <YouthCampTabNav currentPath="/programs/youth-basketball-camp/scholarship-day" />
        <h2 className="font-display text-2xl font-bold uppercase text-deep-navy">{scholarshipDay.title}</h2>
        <div className="prose prose-lg mt-6 max-w-none whitespace-pre-line text-mountie-blue/80">
          {scholarshipDay.content}
        </div>
        <div className="mt-10 space-y-8">
          <PublicFolderGallery folderPath={mediaFolders.scholarshipDay.poster} title="Big Dreams Start Here" />
          <PublicFolderGallery folderPath={mediaFolders.youthCamp.campers} title="PO Campers" />
        </div>
      </ContentSection>
    </>
  );
}
