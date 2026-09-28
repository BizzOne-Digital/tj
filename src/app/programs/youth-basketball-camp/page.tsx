import { PageHero, ContentSection } from "@/components/ui/Section";
import { YouthCampTabNav } from "@/components/layout/ProgramTabNav";
import { PublicFolderGallery } from "@/components/galleries/PublicFolderGallery";
import { youthCampContent } from "@/data/pdf-part1";
import { mediaFolders } from "@/config/media-folders";
import { publicMedia } from "@/config/public-media";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "P-O Youth Basketball Camp",
  description: "PO Summer Basketball Camp — skills, drills, games, awards, and Scholarship Day.",
  path: "/programs/youth-basketball-camp",
});

export default function YouthCampPage() {
  const archive = youthCampContent.archive2025;

  return (
    <>
      <PageHero eyebrow="Programs" title="P-O Youth Basketball Camp" />
      <ContentSection>
        <YouthCampTabNav currentPath="/programs/youth-basketball-camp" />

        <div className="mb-10 rounded-lg border-2 border-electric-blue/30 bg-white p-6">
          <h2 className="font-display text-2xl font-bold uppercase text-deep-navy">
            {youthCampContent.season2027.title}
          </h2>
          <p className="mt-2 font-display text-xl text-electric-blue">{youthCampContent.season2027.dates}</p>
          <p className="mt-4 text-mountie-blue/80">{youthCampContent.season2027.status}</p>
        </div>

        <PublicFolderGallery folderPath={mediaFolders.youthCamp.campers} title="PO Campers" />
        <div className="mt-10">
          <PublicFolderGallery
            folderPath={`${publicMedia.specialEvents}/Youth PO Baskethall Camp/2025-26 Season`}
            title="2025–26 Camp Photos"
          />
        </div>
        <div className="mt-10">
          <PublicFolderGallery folderPath={mediaFolders.scholarshipDay.poster} title="Scholarship Day Poster" />
        </div>

        <div className="mt-12 rounded-lg bg-mountie-blue/5 p-6">
          <h3 className="font-display text-lg font-bold uppercase text-deep-navy">{archive.title}</h3>
          <p className="mt-2 text-sm text-mountie-blue/60">{archive.note}</p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div><dt className="text-xs font-bold uppercase text-mountie-blue/60">Dates</dt><dd>{archive.dates}</dd></div>
            <div><dt className="text-xs font-bold uppercase text-mountie-blue/60">Location</dt><dd>{archive.location}</dd></div>
            <div><dt className="text-xs font-bold uppercase text-mountie-blue/60">Eligibility</dt><dd>{archive.eligibility}</dd></div>
          </dl>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {archive.features.map((f) => (
              <li key={f} className="text-sm text-mountie-blue/80">{f}</li>
            ))}
          </ul>
          <div className="mt-6">
            <h4 className="font-bold text-deep-navy">Themed Days</h4>
            <ul className="mt-2 space-y-1 text-sm text-mountie-blue/80">
              {archive.themedDays.map((d) => <li key={d}>{d}</li>)}
            </ul>
          </div>
          <p className="mt-6 text-sm text-mountie-blue/60">{archive.registrationNote}</p>
        </div>
      </ContentSection>
    </>
  );
}
