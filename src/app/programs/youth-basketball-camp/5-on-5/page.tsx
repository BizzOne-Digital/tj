import { PageHero, ContentSection } from "@/components/ui/Section";
import { YouthCampTabNav } from "@/components/layout/ProgramTabNav";
import { PublicFolderGallery } from "@/components/galleries/PublicFolderGallery";
import { mediaFolders } from "@/config/media-folders";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "5-on-5 Winners",
  path: "/programs/youth-basketball-camp/5-on-5",
  description: "P-O Youth Basketball Camp 5-on-5 winners.",
});

export default function FiveOnFivePage() {
  return (
    <>
      <PageHero eyebrow="Youth Camp" title="5-on-5 Winners" />
      <ContentSection>
        <YouthCampTabNav currentPath="/programs/youth-basketball-camp/5-on-5" />
        <PublicFolderGallery folderPath={mediaFolders.awardWinners.fiveOnFive} title="5-on-5 Winners" />
      </ContentSection>
    </>
  );
}
