import { publicMedia } from "@/config/public-media";

const goldenTicket2024_25 = publicMedia.goldenTicket2024_25;

export const goldenTicketChampionshipVideoCandidates = [
  "/videos/golden-ticket-championship.mp4",
  `/${goldenTicket2024_25}/golden-ticket-championship.mp4`,
  `/${goldenTicket2024_25}/002F55D9-06F5-4BC1-90F5-54D288694274.mp4`,
  `/${goldenTicket2024_25}/002F55D9-06F5-4BC1-90F5-54D288694274.MOV`,
];

const awards = publicMedia.leaguePlayerAwards;
const championships = publicMedia.teamChampionships;
const allStars = publicMedia.leagueAllStars;
const special = publicMedia.specialEvents;
const golden = publicMedia.goldenTicket;
const select = publicMedia.selectTeams;

export const leaguePlayerAwards = {
  title: "League Player Awards",
  season: "2025–26 Season (First Year)",
  divisions: [
    {
      id: "1-2",
      title: "1st/2nd Grade",
      mediaFolder: `${awards}/2025-26 Season/1-2nd Grade`,
    },
    {
      id: "3-4",
      title: "3rd/4th Grade",
      mediaFolder: `${awards}/2025-26 Season/3-4th Grade`,
    },
    {
      id: "5-6",
      title: "5th/6th Grade",
      mediaFolder: `${awards}/2025-26 Season/5-6th Grade`,
    },
  ],
};

export const teamLeagueChampionships = {
  title: "Team League Championships",
  seasons: [
    {
      id: "2024-25",
      label: "2024–25 Season (First Year)",
      divisions: [
        {
          title: "1st/2nd Grade",
          mediaFolder: `${championships}/2024-25 Season (First Year)/1-2nd Grade`,
        },
        {
          title: "5th/6th Grade",
          mediaFolder: `${championships}/2024-25 Season (First Year)/5-6th Grade`,
        },
      ],
    },
    {
      id: "2025-26",
      label: "2025–26 Season",
      divisions: [
        {
          title: "1st/2nd Grade",
          mediaFolder: `${championships}/2025-26 Season/1-2nd Grade`,
        },
        {
          title: "5th/6th Grade",
          mediaFolder: `${championships}/2025-26 Season/5-6th Grade`,
        },
      ],
    },
  ],
};

export const leagueAllStars = {
  title: "League All-Stars",
  season: "2025–26 Season (First Year)",
  divisions: [
    {
      title: "3rd/4th Grade",
      mediaFolder: `${allStars}/2025-26 Season (First Year)/3-4th Grade`,
    },
    {
      title: "5th/6th Grade",
      mediaFolder: `${allStars}/2025-26 Season (First Year)/5-6th Grade`,
    },
  ],
};

export const specialEvents = {
  title: "Special Events",
  categories: [
    {
      id: "banquet",
      title: "End of the Year Banquet",
      seasons: [
        { label: "2020–21 Season (First Year)", folder: `${special}/End Of The Year Banquet/2020-21 Season (First Year)` },
        { label: "2021–22 Season", folder: `${special}/End Of The Year Banquet/2021-22 Season` },
        { label: "2022–23 Season", folder: `${special}/End Of The Year Banquet/2022-23 Season` },
        { label: "2023–24 Season", folder: `${special}/End Of The Year Banquet/2023-24 Season` },
        { label: "2025–26 Season", folder: `${special}/End Of The Year Banquet/2025-26 Season` },
      ],
    },
    {
      id: "youth-camp",
      title: "Youth P-O Basketball Camp",
      seasons: [
        { label: "2020–21 Season (First Year)", folder: `${special}/Youth PO Baskethall Camp/2020-21 Season (First Year)` },
        { label: "2022–23 Season", folder: `${special}/Youth PO Baskethall Camp/2022-23 Season` },
        { label: "2024–25 Season", folder: `${special}/Youth PO Baskethall Camp/2024-25 Season` },
        { label: "2025–26 Season", folder: `${special}/Youth PO Baskethall Camp/2025-26 Season` },
      ],
    },
    {
      id: "camps-clinic",
      title: "Camps / Clinic",
      seasons: [
        {
          label: "2025–26 Season — Juniata College",
          folder: `${special}/Camps-Clinic/2025-26 Season/Juniata College`,
        },
        {
          label: "2025–26 Season — USA Basketball Camp",
          folder: `${special}/Camps-Clinic/2025-26 Season/USA Basketball Camp`,
        },
      ],
    },
    {
      id: "elementary-summer-league",
      title: "Elementary Summer League",
      seasons: [
        {
          label: "2024–25 Season (First Year)",
          folder: `${special}/Elementary Summer League/2024-25 Season (First Year)`,
        },
        {
          label: "2025–26 Season",
          folder: `${special}/Elementary Summer League/2025-26 Season`,
        },
      ],
    },
  ],
};

export const selectLeagueContent = `1ST ANNUAL 2026 P-O SELECT ELEMENTARY WINTER LEAGUE

Good morning coaches!

The 1st Annual P-O Elementary Boys Basketball Booster Club is excited to host our Select Elementary Winter League this upcoming season!

WE WILL TAKE THE FIRST 8 TEAMS TO SIGNUP TO PLAY

WHO CAN PLAY?
• School-based teams only (No AAU travel teams)
• Boys league — but coed & girls teams are welcome!
• Incoming 3rd–6th graders

LEAGUE DETAILS
5/6th Grade (Saturday Mornings – 9AM Start)
Nov. 21 | Dec. 5 | Dec. 19 | Jan. 2 | Jan. 16 | Jan. 23 (Championship)

3/4th Grade (Sunday Afternoons – 12PM Start)
Nov. 22 | Dec. 6 | Dec. 20 | Jan. 3 | Jan. 17 | Jan. 24 (Championship)

ALL-STAR DAY – FEB. 6th
• 3/4th Grade – 9AM
• 5/6th Grade – 10AM

Each team plays 2 games per day. Season runs Nov – Feb (every other weekend).

REGISTRATION
• $200 per team
• $150 for additional teams

STATE CHAMPIONSHIP INVITE LEAGUE
Champion & Runner-Up (both divisions) earn invites to State College, PA

LIVE STREAMING AVAILABLE (NFHS Network)
Fully stocked concession stand every week

LIMITED SPOTS AVAILABLE — ONLY 8 TEAMS PER DIVISION

Questions? Reach out anytime`;

export const selectTeamsContent = `This is a Travel Basketball program that will get your child ready for Jr High Basketball. Your child was picked by coaches because of his hard work during the offseason (Open gyms, Spring/Summer League). Congratulations again!

Practices will be mostly in the High School and mostly on the weekends. These practices will be skill driven and focused on learning the game. Players will be taught the same Offensives and Defenses that Jr High and Varsity will run. We found through the years most of these players are skillful enough to play right away on the Jr High Level.

Leagues and Tournaments:
We will play at the YMCA Philipsburg (Games are on every other Saturday for 6th Grade and every other Sunday for 4th Grade)

We will play at the JMC in Altoona games will be every Sunday 5th grade plays first 6th grade plays second. (5th grade and 6th Grade Teams will play back to back but also play in the earliest spot (1:50pm 5th Grade and 2:40pm 6th Grade). This will allow our 5th Graders to play up and down. This league will be for 4th/5th and 6th Graders.

Parents Commitment: This is a commitment to your children that will give them a head start to the next level within the program. We ask that you support your children, coaches and refs in a positive manner this season. We understand that these games can be a little frustrating at times but we ask that you stay calm and positive for our program. Parents that are kicked out will be asked to stay away from games for the remainder of the season. I agreed to this when we signed up. Thank you for your understanding!

Playing Time: We will do our best to get everyone into each game. Yes, some players will play more than others. Your Skillset and being game oriented will determine your playing time. Your attitude and effort will play a huge factor as well. There maybe times (Rarely) when we don't get everyone into game but we always try to make up for it with the next game.

Issues: I will be your point of contact with any issues you may have. Please give us at least 24 hours before you approach us coaches with game issues.`;

export const selectSeasonRecap2025_26 = {
  season: "2025–26",
  offensiveFocus: "Circle, UNC, UCLA DDK",
  programRecord: "77–19",
  goldenTickets: ["6th Grade", "5th Grade", "4th Grade"],
  leagues: [
    { name: "Tyrone Armory – Coach Miller League", results: ["4th Grade (Tyrone): 10–2 – 2nd Place", "6th Grade (Klussman): 10–2 – 2nd Place"] },
    { name: "YMCA P-O", results: ["4th Grade: 14–0 – Championship", "6th Grade: 14–1 – Runner-Up"] },
    { name: "JMC", results: ["5th Grade (Cambria Heights): 12–1 – Championship", "6th Grade: 10–4 – 4th Place", "3rd & Under: No Team"] },
  ],
  tournaments: [
    "State Championship Games (6th Grade): 1–3",
    "State Championship Games (4th Grade): 0–4",
    "Susquehanna University Tournament: CANCELLED",
    "March Mania – Lewisburg, PA — 6th Grade: 3–1 Champions, 4th Grade: 3–1 Champions",
  ],
  growth: "Program Growth: From 0–24 to 77–19",
};

export const selectLeaguesBySeason = [
  { season: "2022–23", leagues: ["Philipsburg YMCA"] },
  { season: "2023–24", leagues: ["Philipsburg YMCA"] },
  { season: "2024–25", leagues: ["JMC Altoona", "Philipsburg YMCA"] },
  { season: "2025–26", leagues: ["JMC Altoona", "Philipsburg YMCA", "Tyrone Armory Tyrone PA"] },
  { season: "2026–27", leagues: ["East Hills in Johnstown PA", "Tyrone Armory Tyrone PA", "Philipsburg YMCA PA", "PO Select League PA"] },
];

export const selectTournaments = {
  seasons: [
    {
      id: "2025-26",
      label: "2025–26 Season",
      events: ["State Championship Games State College, PA", "Lewisburg YMCA PA"],
      mediaFolder: `${golden}/2025-26 Season`,
    },
    {
      id: "2024-25",
      label: "2024–25 Season",
      mediaFolder: `${golden}/2024-25 Season`,
    },
  ],
};

export const selectTeamPhotos = {
  seasons: [
    {
      id: "2024-25",
      label: "2024–25 Season",
      folders: {
        team: `${select}/2024-25 Team/Team Pictures`,
        schedule: `${select}/2024-25 Team/Roster`,
        players: `${select}/2024-25 Team/Player Pictures`,
      },
    },
    {
      id: "2025-26",
      label: "2025–26 Season",
      folders: {
        team: `${select}/2025-26 Team/Team Pictures`,
        schedule: `${select}/2025-26 Team/Roster`,
        players: `${select}/2025-26 Team/Players Pictures`,
      },
    },
  ],
};

export const selectGameResultsWeeks = Array.from({ length: 6 }, (_, i) => ({
  week: i + 1,
  label: `Week #${i + 1}`,
}));

export type StateChampionshipSeason = {
  id: string;
  label: string;
  grades: string[];
  mediaFolder: string;
  /** When set, only these images are shown (skips folder scan). */
  images?: string[];
  /** Resolved at runtime — see goldenTicketChampionshipVideoCandidates */
  video?: string;
  /** Preferred video paths checked in order (first existing file wins). */
  videoCandidates?: string[];
};

export const stateChampionshipGrades: { seasons: StateChampionshipSeason[] } = {
  seasons: [
    {
      id: "2024-25",
      label: "2024–25 (First Year)",
      grades: ["1st/2nd Grade", "3rd/4th Grade", "5th/6th Grade"],
      mediaFolder: publicMedia.goldenTicket2024_25,
      images: [`/${publicMedia.goldenTicket2024_25}/little-mounties-golden-ticket.jpg`],
      videoCandidates: goldenTicketChampionshipVideoCandidates,
    },
    {
      id: "2025-26",
      label: "2025–26",
      grades: ["1st/2nd Grade", "3rd/4th Grade", "5th/6th Grade"],
      mediaFolder: publicMedia.goldenTicket2025_26,
      images: [`/${publicMedia.goldenTicket2025_26}/IMG_3150.png`],
    },
  ],
};
