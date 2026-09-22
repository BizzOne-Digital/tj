"use client";

import { Tabs } from "@/components/ui/Tabs";
import type { GameResultsWeek } from "@/data/elementary-schedule";

function WeekResults({ week }: { week: GameResultsWeek }) {
  return (
    <div className="rounded-lg border border-mountie-blue/10 bg-white p-6">
      {week.scores.length === 0 && week.playersOfTheGame.length === 0 ? (
        <p className="text-sm text-mountie-blue/60">Scores and players of the week pending update.</p>
      ) : (
        <>
          {week.scores.length > 0 && (
            <ul className="space-y-2 text-sm text-mountie-blue/80">
              {week.scores.map((s, i) => (
                <li key={i}>
                  {s.game}
                  {s.score ? ` — ${s.score}` : ""}
                </li>
              ))}
            </ul>
          )}
          {week.playersOfTheGame.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-bold uppercase text-electric-blue">Players of the Game</p>
              <ul className="mt-2 text-sm">
                {week.playersOfTheGame.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export function ElementaryResultsTabs({ weeks }: { weeks: GameResultsWeek[] }) {
  const tabs = weeks.map((week) => ({
    id: `week-${week.week}`,
    label: week.label,
    content: <WeekResults week={week} />,
  }));

  return <Tabs tabs={tabs} defaultTab={tabs[0]?.id} />;
}
