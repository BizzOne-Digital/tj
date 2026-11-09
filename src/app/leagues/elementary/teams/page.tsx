import { PageHero } from "@/components/ui/PageHero";
import { ElementaryTeamsPage } from "@/components/sections/ElementaryTeamsTabs";
import { getElementaryTeamImages } from "@/lib/media";
import { getTabItems } from "@/lib/cms";
import { getSiteData } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Elementary League Teams",
  description: "P-O Elementary League team rosters, schedules, and photos by grade division.",
  path: "/leagues/elementary/teams",
});

export default async function ElementaryTeamsRoute() {
  const teamImages = getElementaryTeamImages();
  const tabItems = await getTabItems("elementary");
  const { elementaryTeams } = await getSiteData("elementary-teams");
  const { elementarySeasonOptions } = await getSiteData("elementary-seasons");

  return (
    <>
      <PageHero eyebrow="Leagues" title="Elementary League Teams" subtitle="Rosters, schedules, and team photos." />
      <ElementaryTeamsPage teamImages={teamImages} tabItems={tabItems}
        allTeams={elementaryTeams}
        seasonOptions={elementarySeasonOptions}
      />
    </>
  );
}
