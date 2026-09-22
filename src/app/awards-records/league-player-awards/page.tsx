import { PageHero, ContentSection } from "@/components/ui/Section";
import { AwardsTabNav } from "@/components/layout/ProgramTabNav";
import { PublicFolderGallery } from "@/components/galleries/PublicFolderGallery";
import { leaguePlayerAwards } from "@/data/pdf-part2";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "League Player Awards",
  path: "/awards-records/league-player-awards",
  description: "P-O Elementary League player awards by grade division.",
});

export default function LeaguePlayerAwardsPage() {
  return (
    <>
      <PageHero eyebrow="Awards" title="League Player Awards" subtitle={leaguePlayerAwards.season} />
      <ContentSection>
        <AwardsTabNav currentPath="/awards-records/league-player-awards" />
        <div className="space-y-10">
          {leaguePlayerAwards.divisions.map((div) => (
            <div key={div.id}>
              <h2 className="mb-4 font-display text-xl font-bold uppercase text-deep-navy">{div.title}</h2>
              <PublicFolderGallery folderPath={div.mediaFolder} />
            </div>
          ))}
        </div>
      </ContentSection>
    </>
  );
}
