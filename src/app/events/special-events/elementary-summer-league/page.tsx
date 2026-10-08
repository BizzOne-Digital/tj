import { PageHero, ContentSection } from "@/components/ui/Section";
import { SpecialEventsTabNav } from "@/components/layout/ProgramTabNav";
import { PublicFolderGallery } from "@/components/galleries/PublicFolderGallery";
import { specialEvents } from "@/data/pdf-part2";
import { createPageMetadata } from "@/lib/page-metadata";

const category = specialEvents.categories.find((c) => c.id === "elementary-summer-league")!;

export const metadata = createPageMetadata({
  title: "Elementary Summer League",
  path: "/events/special-events/elementary-summer-league",
  description: "Elementary summer league photos by season.",
});

export default function ElementarySummerLeaguePage() {
  return (
    <>
      <PageHero eyebrow="Special Events" title={category.title} />
      <ContentSection>
        <SpecialEventsTabNav currentPath="/events/special-events/elementary-summer-league" />
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
