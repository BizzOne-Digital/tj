import { PageHero, ContentSection } from "@/components/ui/Section";
import { SpecialEventsTabNav } from "@/components/layout/ProgramTabNav";
import { PublicFolderGallery } from "@/components/galleries/PublicFolderGallery";
import { specialEvents } from "@/data/pdf-part2";
import { createPageMetadata } from "@/lib/page-metadata";

const category = specialEvents.categories.find((c) => c.id === "camps-clinic")!;

export const metadata = createPageMetadata({
  title: "Camps & Clinics Events",
  path: "/events/special-events/camps-clinic",
  description: "Juniata College and USA Basketball Camp clinic photos.",
});

export default function CampsClinicEventsPage() {
  return (
    <>
      <PageHero eyebrow="Special Events" title={category.title} />
      <ContentSection>
        <SpecialEventsTabNav currentPath="/events/special-events/camps-clinic" />
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
