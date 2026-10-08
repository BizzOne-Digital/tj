import { PageHero, ContentSection, SectionHeading } from "@/components/ui/Section";
import { PublicFolderGallery } from "@/components/galleries/PublicFolderGallery";
import { teamPhotoGalleryDefaults } from "@/components/galleries/DriveFolderGallery";
import { elksHoopShootPdf } from "@/data/pdf-part3";
import { encodePublicAssetPath } from "@/lib/utils";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Philipsburg Elks Hoop Shoot",
  description:
    "Free throw competition for boys and girls ages 8–13 hosted by the Philipsburg Elks at P-O High School.",
  path: "/events/elks-hoop-shoot",
});

export default function ElksHoopShootPage() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title={elksHoopShootPdf.title}
        subtitle="An incredible opportunity for boys and girls aged 8 to 13 to compete, set goals, and have fun."
      />
      <ContentSection>
        <div className="mx-auto mb-10 max-w-2xl overflow-hidden rounded-lg bg-white p-2 shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={encodePublicAssetPath(`/${elksHoopShootPdf.posterImage}`)}
            alt="Elks National Hoop Shoot free throw contest flyer"
            className="block h-auto w-full rounded-md"
            loading="eager"
          />
        </div>
        <div className="max-w-3xl space-y-4 text-lg text-mountie-blue/80">
          <p>
            The Philipsburg Elks local Hoop Shoot contest is set for <strong>{elksHoopShootPdf.date}</strong> at the{" "}
            <strong>{elksHoopShootPdf.location}</strong>.
          </p>
          <p>
            {elksHoopShootPdf.time}. {elksHoopShootPdf.description}
          </p>
          <p>{elksHoopShootPdf.spreadTheWord}</p>
          <p>
            Questions can be directed to <strong>{elksHoopShootPdf.director}</strong>.
          </p>
          <p>
            Website:{" "}
            <a
              href={elksHoopShootPdf.website}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-electric-blue hover:underline"
            >
              {elksHoopShootPdf.website}
            </a>
          </p>
        </div>
      </ContentSection>
      <ContentSection dark>
        <SectionHeading title="Event Photos" description="Photos organized by season from Google Drive." light />
        <div className="mt-10 space-y-12">
          {elksHoopShootPdf.seasons.map((season) => (
            <PublicFolderGallery
              key={season.id}
              folderPath={season.mediaFolder}
              title={season.label}
              titleLight
              variant={teamPhotoGalleryDefaults.variant}
              columns={teamPhotoGalleryDefaults.columns}
              imageFit={teamPhotoGalleryDefaults.imageFit}
            />
          ))}
        </div>
      </ContentSection>
    </>
  );
}
