"use client";

import { useState } from "react";
import { ContentSection, MediaComingSoon } from "@/components/ui/Section";
import { seasons, seasonArchive, type SeasonId } from "@/data/teams";

export function SeasonArchive() {
  const [activeSeason, setActiveSeason] = useState<SeasonId>("2025-26");
  const season = seasonArchive[activeSeason];

  return (
    <ContentSection>
      <div className="mb-8 flex flex-wrap gap-2">
        {seasons.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSeason(s.id)}
            className={`rounded-sm px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors ${
              activeSeason === s.id
                ? "bg-electric-blue text-white"
                : "bg-white text-deep-navy hover:bg-mountie-blue/10"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {season.mediaNote && (
        <p className="mb-8 rounded-lg bg-mountie-blue/10 p-4 text-sm text-mountie-blue/80">{season.mediaNote}</p>
      )}

      {season.coaches.length > 0 && (
        <div className="mb-10">
          <h2 className="font-display text-2xl font-bold uppercase text-deep-navy">Coaches</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {season.coaches.map((coach) => (
              <div key={coach.name} className="rounded-lg bg-white p-6 shadow-sm">
                <p className="font-bold text-deep-navy">{coach.name}</p>
                {coach.role && <p className="text-sm text-electric-blue">{coach.role}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {season.teams.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {season.teams.map((team) => (
            <div key={team.id} className="rounded-lg bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase text-electric-blue">{team.division}</p>
              <h3 className="mt-1 font-display text-lg font-bold uppercase text-deep-navy">{team.name}</h3>
              {team.note && <p className="mt-2 text-sm text-mountie-blue/70">{team.note}</p>}
            </div>
          ))}
        </div>
      ) : (
        <MediaComingSoon description="Team photos, rosters, and player photos pending client upload and approval." />
      )}
    </ContentSection>
  );
}
