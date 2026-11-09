import { PageHero } from "@/components/ui/PageHero";
import { ContentSection } from "@/components/ui/Section";
import { SpecialEventsTabNav } from "@/components/layout/ProgramTabNav";
import { PublicFolderGallery } from "@/components/galleries/PublicFolderGallery";
import { createPageMetadata } from "@/lib/page-metadata";
import { getSiteData } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: "End of Year Banquet",
  path: "/events/special-events/banquet",
  description: "End of year banquet photos by season.",
});

export default async function BanquetPage() {
  const { specialEvents } = await getSiteData("pdf-part2");
  const category = specialEvents.categories.find((c) => c.id === "banquet")!;
  return (
    <>
      <PageHero eyebrow="Special Events" title={category.title} />
      <ContentSection>
        <SpecialEventsTabNav currentPath="/events/special-events/banquet" />
        <div className="space-y-10">
          {category.seasons.map((season) => (
            <div key={season.label}>
              <h2 className="mb-4 font-display text-xl font-bold uppercase text-deep-navy">{season.label}</h2>
              <PublicFolderGallery folderPath={season.folder} />
            </div>
          ))}
        </div>
      </ContentSection>
    </>
  );
}
