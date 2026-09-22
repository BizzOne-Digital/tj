import type { ElementarySeasonId } from "@/data/elementary-seasons";

export type ScheduleWeek = {
  week: number | string;
  date: string;
  label?: string;
  games: string[];
};

export type ScheduleDivision = {
  id: string;
  title: string;
  teams: string[];
  weeks: ScheduleWeek[];
};

export type ElementarySchedule = {
  season: string;
  title: string;
  divisions: ScheduleDivision[];
};

export const elementarySchedule2025_26: ElementarySchedule = {
  season: "2025–26",
  title: "P-O Elementary Basketball League 2025–26 Season Schedule (11 Weeks) @ MS",
  divisions: [
    {
      id: "3rd-6th",
      title: "3rd/6th Grade League",
      teams: [
        "Philipsburg Marble and Granite",
        "Nittany Energy",
        "Under Pressure Pro Cleaners",
        "Lee Industries",
      ],
      weeks: [
        { week: 1, date: "Nov. 21st", games: ["#1 vs #4 6pm", "#2 vs #3 7pm"] },
        { week: 2, date: "Nov. 28th", games: ["#2 vs #4 6pm", "#1 vs #3 7pm"] },
        { week: 3, date: "Dec. 5th", games: ["#3 vs #4 6pm", "#2 vs #1 7pm"] },
        { week: 4, date: "Dec. 12th", games: ["#3 vs #2 6pm", "#1 vs #4 7pm"] },
        { week: 5, date: "Dec. 19th", games: ["#1 vs #2 6pm", "#4 vs #3 7pm"] },
        { week: 6, date: "Jan. 2nd", games: ["#1 vs #4 6pm", "#2 vs #3 7pm"] },
        { week: 7, date: "Jan. 9th", games: ["#2 vs #4 6pm", "#1 vs #3 7pm"] },
        { week: 8, date: "Jan. 16th", games: ["#2 vs #4 6pm", "#1 vs #3 7pm"] },
        { week: "Cash Bash", date: "Jan 23rd", games: ["Cash Bash Event 6pm"] },
        { week: 9, date: "Jan. 30th", games: ["#3 vs #4 6pm", "#2 vs #1 7pm"] },
        {
          week: 10,
          date: "Feb. 6th",
          label: "Playoffs (Think Pink Game)",
          games: ["#1 Seed vs #4 Seed 5pm", "#2 Seed vs #3 Seed 6pm", "Championship Game 8pm"],
        },
        {
          week: 11,
          date: "Feb. 13th",
          label: "All-Star Game",
          games: ["#1 East vs #2 West 9am 3/4th Game", "#1 East vs #2 West 10am 5/6th Game"],
        },
      ],
    },
    {
      id: "1st-2nd",
      title: "1st–2nd Grade League @ M.S.",
      teams: ["Central PA Lions AAU", "Glenn O. Hawbaker", "PA Warhawks"],
      weeks: [
        { week: 1, date: "Nov. 21st", games: ["#1 vs #3 4pm", "#2 vs #1 5pm"] },
        { week: 2, date: "Nov. 28th", games: ["#2 vs #3 4pm", "#1 vs #2 5pm"] },
        { week: 3, date: "Dec. 5th", games: ["#3 vs #1 4pm", "#2 vs #3 5pm"] },
        { week: 4, date: "Dec 12th", games: ["#2 vs #1 4pm", "#1 vs #3 5pm"] },
        { week: 5, date: "Dec. 19th", games: ["#3 vs #2 4pm", "#1 vs #3 5pm"] },
        { week: 6, date: "Jan. 2nd", games: ["#1 vs #3 4pm", "#2 vs #1 5pm"] },
        { week: 7, date: "Jan. 9th", games: ["#2 vs #3 4pm", "#1 vs #2 5pm"] },
        { week: 8, date: "Jan. 16th", games: ["#3 vs #1 4pm", "#2 vs #3 5pm"] },
        { week: "Cash Bash", date: "Jan 23rd", games: ["Cash Bash 6pm"] },
        { week: 9, date: "Jan. 30th", games: ["#2 vs #1 4pm", "#1 vs #3 5pm"] },
        {
          week: 10,
          date: "Feb. 6th",
          label: "Playoffs (Think Pink Game)",
          games: ["#1 Seed vs #4 Seed 5pm", "#2 Seed vs #3 Seed 6pm", "Championship Game 8pm"],
        },
        {
          week: 11,
          date: "Feb. 13th",
          label: "All-Star Game",
          games: ["#1 East vs #2 West 9am 3/4th Game", "#1 East vs #2 West 10am 5/6th Game"],
        },
      ],
    },
    {
      id: "pre-k-k",
      title: "Pre-K–K Grade League @ M.S.",
      teams: ["Central PA Lions AAU", "PA Warhawks"],
      weeks: buildPreKWeeks(),
    },
  ],
};

export const elementarySchedule2026_27: ElementarySchedule = {
  season: "2026–27",
  title: "P-O Elementary Basketball League 2026–27 Season Schedule (11 Weeks) @ MS",
  divisions: [
    {
      id: "3rd-6th",
      title: "3rd/6th Grade League",
      teams: [
        "Moshannon Valley Am Vets",
        "Luzier Cleaning Service",
        "Alexander Property and Repair & Restoration",
        "Lee Industries",
      ],
      weeks: [
        { week: 1, date: "Nov. 21st", games: ["#1 vs #4 6pm", "#2 vs #3 7pm"] },
        { week: 2, date: "Nov. 28th", games: ["#2 vs #4 6pm", "#1 vs #3 7pm"] },
        { week: 3, date: "Dec. 5th", games: ["#3 vs #4 6pm", "#2 vs #1 7pm"] },
        { week: 4, date: "Dec. 12th", games: ["#3 vs #2 6pm", "#1 vs #4 7pm"] },
        { week: 5, date: "Dec. 19th", games: ["#1 vs #2 6pm", "#4 vs #3 7pm"] },
        { week: 6, date: "Jan. 2nd", games: ["#1 vs #4 6pm", "#2 vs #3 7pm"] },
        { week: 7, date: "Jan. 9th", games: ["#2 vs #4 6pm", "#1 vs #3 7pm"] },
        { week: 8, date: "Jan. 16th", games: ["#1 vs #4 6pm", "#2 vs #3 7pm"] },
        { week: "Cash Bash", date: "Jan 23rd", games: ["Cash Bash Event 6pm"] },
        { week: 9, date: "Jan. 30th", games: ["#3 vs #4 6pm", "#2 vs #1 7pm"] },
        {
          week: 10,
          date: "Feb. 6th",
          label: "Playoffs (Think Pink Game)",
          games: ["#1 Seed vs #4 Seed 5pm", "#2 Seed vs #3 Seed 6pm", "Championship Game 8pm"],
        },
        {
          week: 11,
          date: "Feb. 13th",
          label: "All-Star Game",
          games: ["#1 East vs #2 West 9am 3/4th Game", "#1 East vs #2 West 10am 5/6th Game"],
        },
      ],
    },
    {
      id: "1st-2nd",
      title: "K-2nd Grade League @ M.S.",
      teams: ["Nittany Minimart", "Glenn O. Hawbaker", "PA Warhawks"],
      weeks: [
        { week: 1, date: "Nov. 21st", games: ["#1 vs #3 4pm", "#2 vs #1 5pm"] },
        { week: 2, date: "Nov. 28th", games: ["#2 vs #3 4pm", "#1 vs #2 5pm"] },
        { week: 3, date: "Dec. 5th", games: ["#3 vs #1 4pm", "#2 vs #3 5pm"] },
        { week: 4, date: "Dec 12th", games: ["#2 vs #1 4pm", "#1 vs #3 5pm"] },
        { week: 5, date: "Dec. 19th", games: ["#3 vs #2 4pm", "#1 vs #3 5pm"] },
        { week: 6, date: "Jan. 2nd", games: ["#1 vs #3 4pm", "#2 vs #1 5pm"] },
        { week: 7, date: "Jan. 9th", games: ["#2 vs #3 4pm", "#1 vs #2 5pm"] },
        { week: 8, date: "Jan. 16th", games: ["#3 vs #1 4pm", "#2 vs #3 5pm"] },
        { week: "Cash Bash", date: "Jan 23rd", games: ["Cash Bash 6pm"] },
        { week: 9, date: "Jan. 30th", games: ["#2 vs #1 4pm", "#1 vs #3 5pm"] },
        {
          week: 10,
          date: "Feb. 6th",
          label: "Playoffs (Think Pink Game)",
          games: ["#1 Seed vs #4 Seed 5pm", "#2 Seed vs #3 Seed 6pm", "Championship Game 8pm"],
        },
        {
          week: 11,
          date: "Feb. 13th",
          label: "All-Star Game",
          games: ["#1 East vs #2 West 9am 3/4th Game", "#1 East vs #2 West 10am 5/6th Game"],
        },
      ],
    },
    {
      id: "pre-k-k",
      title: "Pre-K Grade League @ M.S.",
      teams: ["Morning Grind, LLC", "Manning Photography"],
      weeks: buildPreKWeeks(),
    },
  ],
};

function buildPreKWeeks(): ScheduleWeek[] {
  const dates = [
    "Nov. 21st",
    "Nov. 28th",
    "Dec. 5th",
    "Dec 12th",
    "Dec. 19th",
    "Jan. 2nd",
    "Jan. 9th",
    "Jan. 16th",
    "Jan. 30th",
    "Feb. 6th",
    "Feb 13th",
  ];
  const weeks: ScheduleWeek[] = [];
  let dateIndex = 0;
  for (let i = 1; i <= 11; i++) {
    if (i === 9) {
      weeks.push({ week: "Cash Bash", date: "Jan 23rd", games: ["Cash Bash 6pm"] });
      continue;
    }
    weeks.push({ week: i, date: dates[dateIndex] ?? "TBD", games: ["#2 vs #1 3pm"] });
    dateIndex += 1;
  }
  return weeks;
}

export function getElementarySchedule(seasonId: ElementarySeasonId): ElementarySchedule {
  return seasonId === "2026-27" ? elementarySchedule2026_27 : elementarySchedule2025_26;
}

export type GameResultsWeek = {
  week: number;
  label: string;
  scores: { game: string; score?: string }[];
  playersOfTheGame: string[];
};

function emptyResultsWeeks(): GameResultsWeek[] {
  return Array.from({ length: 11 }, (_, i) => ({
    week: i + 1,
    label: `Week #${i + 1}`,
    scores: [],
    playersOfTheGame: [],
  }));
}

const gameResultsBySeason: Record<ElementarySeasonId, GameResultsWeek[]> = {
  "2025-26": emptyResultsWeeks(),
  "2026-27": emptyResultsWeeks(),
};

export function getGameResultsWeeks(seasonId: ElementarySeasonId): GameResultsWeek[] {
  return gameResultsBySeason[seasonId];
}

/** @deprecated Use getGameResultsWeeks */
export const gameResultsWeeks = gameResultsBySeason["2026-27"];
