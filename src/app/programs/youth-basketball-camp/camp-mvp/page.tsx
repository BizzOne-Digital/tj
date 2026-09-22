import { PageHero, ContentSection } from "@/components/ui/Section";
import { YouthCampTabNav } from "@/components/layout/ProgramTabNav";
import { PublicFolderGallery } from "@/components/galleries/PublicFolderGallery";
import { mediaFolders } from "@/config/media-folders";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Camp MVP",
  path: "/programs/youth-basketball-camp/camp-mvp",
  description: "P-O Youth Basketball Camp MVP honorees.",
});

export default function CampMvpPage() {
  return (
    <>
      <PageHero eyebrow="Youth Camp" title="Camp MVP" />
      <ContentSection>
        <YouthCampTabNav currentPath="/programs/youth-basketball-camp/camp-mvp" />
        <PublicFolderGallery folderPath={mediaFolders.awardWinners.campMvp} title="Camp MVP" />
      </ContentSection>
    </>
  );
}
