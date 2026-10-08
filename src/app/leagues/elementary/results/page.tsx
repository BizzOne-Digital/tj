import { PageHero, ContentSection } from "@/components/ui/Section";
import { ElementaryTabNav } from "@/components/layout/ProgramTabNav";
import { ElementarySeasonNav } from "@/components/sections/ElementarySeasonNav";
import { ElementaryResultsTabs } from "@/components/sections/ElementaryResultsTabs";
import { getGameResultsWeeks } from "@/data/elementary-schedule";
import { parseElementarySeasonId } from "@/data/elementary-seasons";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Elementary League Game Results",
  description: "Weekly game scores and players of the week for the P-O Elementary Basketball League.",
  path: "/leagues/elementary/results",
});

type Props = { searchParams: Promise<{ season?: string }> };

export default async function ElementaryResultsPage({ searchParams }: Props) {
  const { season: seasonParam } = await searchParams;
  const seasonId = parseElementarySeasonId(seasonParam, "2026-27");
  const weeks = getGameResultsWeeks(seasonId);

  return (
    <>
      <PageHero eyebrow="Leagues" title="Game Results" subtitle="Weekly scores and players of the week." />
      <ContentSection>
        <ElementaryTabNav currentPath="/leagues/elementary/results" />
        <ElementarySeasonNav
          season={seasonId}
          hrefForSeason={(id) => `/leagues/elementary/results?season=${id}`}
        />
        <p className="mb-8 text-mountie-blue/80">
          Select a week below. Scores and players of the game will be updated after each week of play.
        </p>
        <ElementaryResultsTabs weeks={weeks} />
      </ContentSection>
    </>
  );
}
