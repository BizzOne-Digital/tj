import { PageHero } from "@/components/ui/Section";
import { ElementaryTeamsPage } from "@/components/sections/ElementaryTeamsTabs";
import { getElementaryTeamImages } from "@/lib/media";
import { getTabItems } from "@/lib/cms";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Elementary League Teams",
  description: "P-O Elementary League team rosters, schedules, and photos by grade division.",
  path: "/leagues/elementary/teams",
});

export default async function ElementaryTeamsRoute() {
  const teamImages = getElementaryTeamImages();
  const tabItems = await getTabItems("elementary");

  return (
    <>
      <PageHero eyebrow="Leagues" title="Elementary League Teams" subtitle="Rosters, schedules, and team photos." />
      <ElementaryTeamsPage teamImages={teamImages} tabItems={tabItems} />
    </>
  );
}
