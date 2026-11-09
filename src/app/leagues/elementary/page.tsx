import { PageHero } from "@/components/ui/PageHero";
import { ContentSection, Accordion } from "@/components/ui/Section";
import { ElementaryTabNav } from "@/components/layout/ProgramTabNav";
import { ElementaryActionGallery } from "@/components/galleries/PublicFolderGallery";
import { PublicVideo } from "@/components/galleries/PublicVideo";
import { publicMedia } from "@/config/public-media";
import { createPageMetadata } from "@/lib/page-metadata";
import { getSiteData } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: "P-O Elementary League",
  description: "P-O Elementary Basketball League — 2026-27 season information, registration, and programs.",
  path: "/leagues/elementary",
});

export default async function ElementaryLeaguePage() {
  const { elementaryLeaguePdf } = await getSiteData("pdf-part1");
  return (
    <>
      <PageHero eyebrow="Leagues" title="P-O Elementary League" subtitle={elementaryLeaguePdf.welcome} />
      <ContentSection>
        <ElementaryTabNav currentPath="/leagues/elementary" />
        <PublicVideo
          src={publicMedia.elementaryActionVideo}
          title="P-O Elementary League Video"
          className="mb-10"
        />
        <Accordion
          items={elementaryLeaguePdf.sections.map((s) => ({
            id: s.id,
            title: s.title,
            content: s.content,
          }))}
        />
        <div className="mt-12">
          <ElementaryActionGallery />
        </div>
      </ContentSection>
    </>
  );
}
