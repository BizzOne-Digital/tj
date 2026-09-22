import { upcomingGames } from "@/data/schedules";
import { IconCalendar } from "@/components/icons";

export function ScheduleBoard() {
  return (
    <div className="overflow-hidden rounded-lg border border-mountie-blue/20 bg-deep-navy">
      <div className="flex items-center justify-between border-b border-white/10 bg-mountie-blue px-6 py-4">
        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
          Upcoming Schedule
        </h3>
        <div className="flex items-center gap-2 text-electric-blue">
          <IconCalendar className="w-4 h-4" />
          <span className="font-display text-xs font-bold uppercase">Scoreboard</span>
        </div>
      </div>
      <div className="hidden md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-cool-grey">
              <th className="px-6 py-3 font-semibold">Date</th>
              <th className="px-6 py-3 font-semibold">Time</th>
              <th className="px-6 py-3 font-semibold">Matchup</th>
              <th className="px-6 py-3 font-semibold">Location</th>
            </tr>
          </thead>
          <tbody>
            {upcomingGames.map((game) => (
              <tr key={game.id} className="border-b border-white/5 text-white transition-colors hover:bg-white/5">
                <td className="px-6 py-4 font-display font-bold">{game.date}</td>
                <td className="px-6 py-4">{game.time}</td>
                <td className="px-6 py-4">
                  <span className="font-semibold">{game.homeTeam}</span>
                  <span className="mx-2 text-cool-grey">vs</span>
                  <span className="font-semibold">{game.awayTeam}</span>
                </td>
                <td className="px-6 py-4 text-cool-grey">{game.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="divide-y divide-white/10 md:hidden">
        {upcomingGames.map((game) => (
          <div key={game.id} className="p-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-display text-sm font-bold text-electric-blue">{game.date}</span>
              <span className="text-sm text-cool-grey">{game.time}</span>
            </div>
            <p className="font-semibold text-white">
              {game.homeTeam} <span className="text-cool-grey">vs</span> {game.awayTeam}
            </p>
            <p className="mt-1 text-xs text-cool-grey">{game.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
