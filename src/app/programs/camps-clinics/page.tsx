import { PageHero } from "@/components/ui/PageHero";
import { ContentSection } from "@/components/ui/Section";
import { CampsClinicGallery } from "@/components/galleries/PublicFolderGallery";
import { createPageMetadata } from "@/lib/page-metadata";
import { getSiteData } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: "Camps & Clinics",
  description: "Basketball camps and clinics — structured training and focused skill sessions.",
  path: "/programs/camps-clinics",
});

export default async function CampsClinicsPage() {
  const { campsClinicsPdf } = await getSiteData("pdf-part1");
  return (
    <>
      <PageHero eyebrow="Programs" title="Camps & Clinics" />
      <ContentSection>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-white p-8 shadow-sm">
            <h2 className="font-display text-2xl font-bold uppercase text-deep-navy">Camps</h2>
            <p className="mt-4 leading-relaxed text-mountie-blue/80">{campsClinicsPdf.camps}</p>
          </div>
          <div className="rounded-lg bg-white p-8 shadow-sm">
            <h2 className="font-display text-2xl font-bold uppercase text-deep-navy">Clinics</h2>
            <p className="mt-4 leading-relaxed text-mountie-blue/80">{campsClinicsPdf.clinics}</p>
          </div>
        </div>
        <div className="mt-12">
          <CampsClinicGallery />
        </div>
      </ContentSection>
    </>
  );
}
