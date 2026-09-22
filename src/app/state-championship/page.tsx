import { PageHero, ContentSection } from "@/components/ui/Section";
import { PublicFolderGallery } from "@/components/galleries/PublicFolderGallery";
import { PublicVideo } from "@/components/galleries/PublicVideo";
import { stateChampionshipPdf } from "@/data/pdf-part1";
import { goldenTicketChampionshipVideoCandidates, stateChampionshipGrades } from "@/data/pdf-part2";
import { publicMedia } from "@/config/public-media";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { findFirstPublicVideoInFolder, resolvePublicVideoSrc } from "@/lib/media";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Elementary State Championship Program",
  description: "Pennsylvania Middle School Basketball Championship — state qualifier league information.",
  path: "/state-championship",
});

function resolveSeasonVideo(season: {
  video?: string;
  videoCandidates?: string[];
  mediaFolder: string;
}): string | null {
  if (season.videoCandidates?.length) {
    const resolved = resolvePublicVideoSrc(season.videoCandidates);
    if (resolved) return resolved;
  }
  if (season.video) {
    const resolved = resolvePublicVideoSrc([season.video]);
    if (resolved) return resolved;
  }
  return findFirstPublicVideoInFolder(season.mediaFolder);
}

export default function StateChampionshipPage() {
  const championshipVideo =
    resolvePublicVideoSrc(goldenTicketChampionshipVideoCandidates) ??
    findFirstPublicVideoInFolder(publicMedia.goldenTicket2024_25);

  return (
    <>
      <PageHero eyebrow="Championship" title="Elementary State Championship Program" subtitle={siteConfig.stateQualifier} />
      <ContentSection>
        <div className="prose prose-lg max-w-none whitespace-pre-line text-mountie-blue/80">
          {stateChampionshipPdf}
        </div>
        {stateChampionshipGrades.seasons.map((season) => {
          const seasonVideo = resolveSeasonVideo(season) ?? championshipVideo;
          const poster = season.images?.[0];

          return (
            <div key={season.id} className="mt-12">
              <h2 className="mb-4 font-display text-2xl font-bold uppercase text-deep-navy">{season.label}</h2>
              <div className="mb-6 flex flex-wrap gap-2">
                {season.grades.map((g) => (
                  <span key={g} className="rounded bg-mountie-blue/10 px-3 py-1 text-sm font-semibold">{g}</span>
                ))}
              </div>
              {seasonVideo ? (
                <PublicVideo
                  src={seasonVideo}
                  title="Golden Ticket Championship Video"
                  className="mb-8"
                  poster={poster}
                />
              ) : (
                <div className="mb-8 rounded-lg border border-mountie-blue/15 bg-light-bg px-4 py-6 text-sm text-mountie-blue/75">
                  Golden Ticket championship video will be posted here soon.
                </div>
              )}
              <PublicFolderGallery folderPath={season.mediaFolder} images={season.images} />
            </div>
          );
        })}
        <div className="mt-12">
          <PublicFolderGallery
            folderPath={publicMedia.stateChampionshipGame}
            title="State Championship Game Program"
          />
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/leagues/elementary">Elementary League</Button>
          <Button href="/contact" variant="ghost">Contact</Button>
        </div>
      </ContentSection>
    </>
  );
}
