import { PageHero, ContentSection } from "@/components/ui/Section";
import { SpecialEventsTabNav } from "@/components/layout/ProgramTabNav";
import { PublicFolderGallery } from "@/components/galleries/PublicFolderGallery";
import { specialEvents } from "@/data/pdf-part2";
import { createPageMetadata } from "@/lib/page-metadata";

const category = specialEvents.categories.find((c) => c.id === "banquet")!;

export const metadata = createPageMetadata({
  title: "End of Year Banquet",
  path: "/events/special-events/banquet",
  description: "End of year banquet photos by season.",
});

export default function BanquetPage() {
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
