import { PageHero } from "@/components/ui/PageHero";
import { ContentSection } from "@/components/ui/Section";
import { ElementaryTabNav } from "@/components/layout/ProgramTabNav";
import { ElementarySeasonNav } from "@/components/sections/ElementarySeasonNav";
import { ElementaryScheduleSections } from "@/components/sections/ElementaryScheduleSections";
import { parseElementarySeasonId } from "@/data/elementary-seasons";
import { getSiteData } from "@/lib/site-data";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Elementary League Schedule",
  description: "P-O Elementary Basketball League schedule by season.",
  path: "/leagues/elementary/schedule",
});

type Props = { searchParams: Promise<{ season?: string }> };

export default async function ElementarySchedulePage({ searchParams }: Props) {
  const { season: seasonParam } = await searchParams;
  const seasonId = parseElementarySeasonId(seasonParam);
  const { elementarySchedule2025_26, elementarySchedule2026_27 } = await getSiteData("elementary-schedule");
  const { elementarySeasonOptions } = await getSiteData("elementary-seasons");
  const schedule = seasonId === "2026-27" ? elementarySchedule2026_27 : elementarySchedule2025_26;

  return (
    <>
      <PageHero eyebrow="Leagues" title="Elementary League Schedule" subtitle={schedule.title} />
      <ContentSection>
        <ElementaryTabNav currentPath="/leagues/elementary/schedule" />
        <ElementarySeasonNav
          season={seasonId}
          options={elementarySeasonOptions}
          hrefForSeason={(id) => `/leagues/elementary/schedule?season=${id}`}
        />
        <ElementaryScheduleSections schedule={schedule} />
      </ContentSection>
    </>
  );
}
