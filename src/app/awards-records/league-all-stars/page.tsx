import { PageHero } from "@/components/ui/PageHero";
import { ContentSection } from "@/components/ui/Section";
import { AwardsTabNav } from "@/components/layout/ProgramTabNav";
import { PublicFolderGallery } from "@/components/galleries/PublicFolderGallery";
import { createPageMetadata } from "@/lib/page-metadata";
import { getSiteData } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: "League All-Stars",
  path: "/awards-records/league-all-stars",
  description: "P-O Elementary League all-star selections by grade division.",
});

export default async function LeagueAllStarsPage() {
  const { leagueAllStars } = await getSiteData("pdf-part2");
  return (
    <>
      <PageHero eyebrow="Awards" title="League All-Stars" subtitle={leagueAllStars.season} />
      <ContentSection>
        <AwardsTabNav currentPath="/awards-records/league-all-stars" />
        <div className="space-y-10">
          {leagueAllStars.divisions.map((div) => (
            <div key={div.title}>
              <h2 className="mb-4 font-display text-xl font-bold uppercase text-deep-navy">{div.title}</h2>
              <PublicFolderGallery folderPath={div.mediaFolder} />
            </div>
          ))}
        </div>
      </ContentSection>
    </>
  );
}
