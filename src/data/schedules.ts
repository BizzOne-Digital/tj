export type ScheduleGame = {
  id: string;
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  location: string;
  division?: string;
  status?: "scheduled" | "completed" | "cancelled";
  homeScore?: number;
  awayScore?: number;
};

export const venue = "Philipsburg-Osceola Middle School — 200 Short Street, Philipsburg, PA 16866";

export const upcomingGames: ScheduleGame[] = [
  {
    id: "placeholder-1",
    date: "TBA",
    time: "TBA",
    homeTeam: "Schedule updating",
    awayTeam: "Check league page",
    location: venue,
    division: "Elementary League",
    status: "scheduled",
  },
];

export const scheduleNote =
  "Weekly schedules, game results, and team assignments are updated throughout the season on the Elementary League and Select Program pages.";
