"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { Suspense } from "react";
import { Tabs } from "@/components/ui/Tabs";
import { TabNav, type TabNavItem } from "@/components/ui/TabNav";
import { DriveFolderGallery } from "@/components/galleries/DriveFolderGallery";
import { ElementarySeasonNav } from "@/components/sections/ElementarySeasonNav";
import { getTeamsByDivision, type ElementaryTeam } from "@/data/elementary-teams";
import { parseElementarySeasonId, type ElementarySeasonId } from "@/data/elementary-seasons";
import { ContentSection } from "@/components/ui/Section";
import { withQueryParams } from "@/lib/url-query";

function seasonScheduleLabel(season: ElementarySeasonId): string {
  return season === "2026-27" ? "2026–27 Schedule" : "2025–26 Schedule";
}

function TeamDetail({ team, images }: { team: ElementaryTeam; images: string[] }) {
  const showGallery = images.length > 0 && team.mediaFolder;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-bold uppercase text-electric-blue">Coaches: {team.coaches}</p>
        <h2 className="mt-2 font-display text-2xl font-bold uppercase text-deep-navy">{team.name}</h2>
      </div>

      {showGallery && (
        <DriveFolderGallery folderPath={team.mediaFolder!} images={images} columns={1} />
      )}

      <div>
        <h3 className="font-display text-lg font-bold uppercase text-deep-navy">Team Roster</h3>
        {team.roster.length > 0 ? (
          <div className="mt-4 space-y-3">
            {team.roster.map((row) => (
              <div key={row.label} className="rounded-lg bg-light-bg p-4">
                <p className="text-xs font-bold uppercase text-mountie-blue/60">{row.label}</p>
                <p className="mt-1 text-mountie-blue/80">{row.names}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-mountie-blue/70">Roster coming soon.</p>
        )}
      </div>

      <div>
        <h3 className="font-display text-lg font-bold uppercase text-deep-navy">
          {seasonScheduleLabel(team.season)}
        </h3>
        {team.schedule.length > 0 ? (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-mountie-blue/10 text-mountie-blue/60">
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Time</th>
                  <th className="px-4 py-2">Matchup</th>
                </tr>
              </thead>
              <tbody>
                {team.schedule.map((game, i) => (
                  <tr key={i} className="border-b border-mountie-blue/5">
                    <td className="px-4 py-3">{game.date}</td>
                    <td className="px-4 py-3">{game.time}</td>
                    <td className="px-4 py-3">{game.matchup}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-4 text-mountie-blue/70">Schedule coming soon.</p>
        )}
        {team.scheduleNote && <p className="mt-4 text-xs text-mountie-blue/60">{team.scheduleNote}</p>}
      </div>
    </div>
  );
}

function TeamsContent({
  teamImages,
  tabItems,
}: {
  teamImages: Record<string, string[]>;
  tabItems: TabNavItem[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const season = parseElementarySeasonId(searchParams.get("season"));
  const division = (searchParams.get("division") || "3rd-6th") as ElementaryTeam["division"];
  const teams = getTeamsByDivision(division, season);

  const tabItemsWithSeason = tabItems.map((item) => ({
    ...item,
    href: withQueryParams(item.href, { season }),
  }));

  const currentPath = withQueryParams(`${pathname}?division=${division}`, { season });

  const tabs = teams.map((team) => ({
    id: team.id,
    label: team.name,
    content: <TeamDetail team={team} images={teamImages[team.id] ?? []} />,
  }));

  return (
    <ContentSection>
      <ElementarySeasonNav
        season={season}
        hrefForSeason={(id) => withQueryParams(`${pathname}?division=${division}`, { season: id })}
      />
      <TabNav items={tabItemsWithSeason} currentPath={currentPath} />
      {teams.length > 0 ? (
        <Tabs tabs={tabs} defaultTab={teams[0]?.id} />
      ) : (
        <p className="text-mountie-blue/70">Teams for this division and season will be posted soon.</p>
      )}
    </ContentSection>
  );
}

export function ElementaryTeamsPage({
  teamImages,
  tabItems,
}: {
  teamImages: Record<string, string[]>;
  tabItems: TabNavItem[];
}) {
  return (
    <Suspense fallback={<div className="container py-16">Loading teams...</div>}>
      <TeamsContent teamImages={teamImages} tabItems={tabItems} />
    </Suspense>
  );
}
