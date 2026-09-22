import { PageHero, ContentSection } from "@/components/ui/Section";
import { YouthCampTabNav } from "@/components/layout/ProgramTabNav";
import { PublicFolderGallery } from "@/components/galleries/PublicFolderGallery";
import { mediaFolders } from "@/config/media-folders";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "3-on-3 Winners",
  path: "/programs/youth-basketball-camp/3-on-3",
  description: "P-O Youth Basketball Camp 3-on-3 winners.",
});

export default function ThreeOnThreePage() {
  return (
    <>
      <PageHero eyebrow="Youth Camp" title="3-on-3 Winners" />
      <ContentSection>
        <YouthCampTabNav currentPath="/programs/youth-basketball-camp/3-on-3" />
        <PublicFolderGallery folderPath={mediaFolders.awardWinners.threeOnThree} title="3-on-3 Winners" />
      </ContentSection>
    </>
  );
}
