import type { ElementarySchedule } from "@/data/elementary-schedule";

export function ElementaryScheduleSections({ schedule }: { schedule: ElementarySchedule }) {
  return (
    <div className="space-y-10">
      {schedule.divisions.map((division) => (
        <div key={division.id} className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="font-display text-xl font-bold uppercase text-deep-navy">{division.title}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {division.teams.map((team, i) => (
              <span
                key={team}
                className="rounded bg-mountie-blue/10 px-3 py-1 text-sm font-semibold text-deep-navy"
              >
                {i + 1}. {team}
              </span>
            ))}
          </div>
          <div className="mt-6 space-y-3">
            {division.weeks.map((week, i) => (
              <div key={i} className="border-b border-mountie-blue/10 pb-3 last:border-0">
                <p className="font-display font-bold text-electric-blue">
                  {week.label ? week.label : typeof week.week === "number" ? `Week #${week.week}` : week.week} —{" "}
                  {week.date}
                </p>
                <ul className="mt-1 space-y-1 text-sm text-mountie-blue/80">
                  {week.games.map((g) => (
                    <li key={g}>{g}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
