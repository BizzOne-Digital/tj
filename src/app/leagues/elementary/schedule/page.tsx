import { PageHero, ContentSection } from "@/components/ui/Section";
import { ElementaryTabNav } from "@/components/layout/ProgramTabNav";
import { ElementarySeasonNav } from "@/components/sections/ElementarySeasonNav";
import { ElementaryScheduleSections } from "@/components/sections/ElementaryScheduleSections";
import { getElementarySchedule } from "@/data/elementary-schedule";
import { parseElementarySeasonId } from "@/data/elementary-seasons";
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
  const schedule = getElementarySchedule(seasonId);

  return (
    <>
      <PageHero eyebrow="Leagues" title="Elementary League Schedule" subtitle={schedule.title} />
      <ContentSection>
        <ElementaryTabNav currentPath="/leagues/elementary/schedule" />
        <ElementarySeasonNav
          season={seasonId}
          hrefForSeason={(id) => `/leagues/elementary/schedule?season=${id}`}
        />
        <ElementaryScheduleSections schedule={schedule} />
      </ContentSection>
    </>
  );
}
