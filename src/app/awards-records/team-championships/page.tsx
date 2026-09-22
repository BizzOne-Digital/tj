import { PageHero, ContentSection } from "@/components/ui/Section";
import { AwardsTabNav } from "@/components/layout/ProgramTabNav";
import { PublicFolderGallery } from "@/components/galleries/PublicFolderGallery";
import { teamLeagueChampionships } from "@/data/pdf-part2";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Team League Championships",
  path: "/awards-records/team-championships",
  description: "P-O Elementary League team championship photos by season and grade.",
});

export default function TeamChampionshipsPage() {
  return (
    <>
      <PageHero eyebrow="Awards" title="Team League Championships" />
      <ContentSection>
        <AwardsTabNav currentPath="/awards-records/team-championships" />
        {teamLeagueChampionships.seasons.map((season) => (
          <div key={season.id} className="mb-12">
            <h2 className="mb-6 font-display text-2xl font-bold uppercase text-deep-navy">{season.label}</h2>
            <div className="space-y-10">
              {season.divisions.map((div) => (
                <div key={div.title}>
                  <h3 className="mb-4 font-display text-lg font-bold uppercase text-electric-blue">{div.title}</h3>
                  <PublicFolderGallery folderPath={div.mediaFolder} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </ContentSection>
    </>
  );
}
