import { publicMedia } from "@/config/public-media";
import type { ElementarySeasonId } from "@/data/elementary-seasons";

export type TeamRoster = {
  label: string;
  names: string;
};

export type TeamScheduleGame = {
  date: string;
  time: string;
  matchup: string;
};

export type ElementaryTeam = {
  id: string;
  name: string;
  season: ElementarySeasonId;
  division: "3rd-6th" | "1st-2nd" | "pre-k-k";
  coaches: string;
  roster: TeamRoster[];
  schedule: TeamScheduleGame[];
  scheduleNote?: string;
  mediaFolder?: string;
};

export const elementaryTeams: ElementaryTeam[] = [
  {
    id: "lee-industries",
    name: "Lee Industries",
    season: "2025-26",
    division: "3rd-6th",
    coaches: "Cuneo and Coble",
    mediaFolder: publicMedia.elementaryTeams.leeIndustries,
    roster: [
      { label: "Back row (L to R)", names: "Coach Caleb Cuneo, Santino Reinke, Coach Kelly Bowie, Cam Supenia, and Coach Nick Coble." },
      { label: "Middle row (L to R)", names: "Bronson Shaw, Andrew Rauch, Troy Warlow, and Toby Cuneo." },
      { label: "First row (L to R)", names: "Tristan Shoemaker, Zaylee Conklin, Henri Coble, Jake Wilkinson and Waylon Davis." },
    ],
    schedule: [
      { date: "Saturday, December 6, 2025", time: "4:00 p.m.", matchup: "Philipsburg Marble and Granite vs. Lee Industries" },
      { date: "Saturday, December 13, 2025", time: "6:00 p.m.", matchup: "Nittany Energy vs. Lee Industries" },
      { date: "Saturday, December 20, 2025", time: "6:00 p.m.", matchup: "Lee Industries vs. Under Pressure Pro Cleaners" },
      { date: "Saturday, January 3, 2026", time: "7:00 p.m.", matchup: "Philipsburg Marble and Granite vs. Lee Industries" },
      { date: "Saturday, January 17, 2026", time: "7:00 p.m.", matchup: "Lee Industries vs. Under Pressure Pro Cleaners" },
      { date: "Saturday, January 24, 2026", time: "7:00 p.m.", matchup: "Philipsburg Marble and Granite vs. Lee Industries" },
      { date: "Saturday, January 31, 2026", time: "6:00 p.m.", matchup: "Lee Industries vs. Nittany Energy" },
      { date: "Saturday, February 7, 2026", time: "6:00 p.m.", matchup: "Lee Industries vs. Under Pressure Pro Cleaners" },
      { date: "Saturday, February 14, 2026", time: "11:00 a.m.", matchup: "Philipsburg Marble and Granite vs. Lee Industries" },
      { date: "Saturday, February 21, 2026", time: "7:00 p.m.", matchup: "Lee Industries vs. Nittany Energy" },
      { date: "Saturday, February 28, 2026", time: "6:00 p.m.", matchup: "Lee Industries vs. Under Pressure Pro Cleaners" },
    ],
    scheduleNote: "Unless otherwise noted, all games are played at Philipsburg-Osceola Middle School, 200 Short Street, Philipsburg, PA 16866",
  },
  {
    id: "nittany-energy",
    name: "Nittany Energy",
    season: "2025-26",
    division: "3rd-6th",
    coaches: "Stodart and Potter",
    mediaFolder: publicMedia.elementaryTeams.nittanyEnergy,
    roster: [
      { label: "Back row (L to R)", names: "Kaiden Frank, Coach Craig Stodart, Coach Josh Potter, and Jace Potter." },
      { label: "Middle row (L to R)", names: "Abram Stodart, Colton Kelly, Gabriel Stodart, Leo Lanich, and Jameson Blake." },
      { label: "First row (L to R)", names: "Brodie Mann, Emerson Frank, Jace Corrigan and Joseph Crist." },
    ],
    schedule: [
      { date: "Saturday, December 6, 2025", time: "5:00 p.m.", matchup: "Nittany Energy vs. Under Pressure Pro Cleaners" },
      { date: "Saturday, December 13, 2025", time: "6:00 p.m.", matchup: "Nittany Energy vs. Lee Industries" },
      { date: "Saturday, December 20, 2025", time: "7:00 p.m.", matchup: "Philipsburg Marble and Granite vs. Nittany Energy" },
      { date: "Saturday, January 3, 2026", time: "6:00 p.m.", matchup: "Nittany Energy vs. Under Pressure Pro Cleaners" },
      { date: "Saturday, January 17, 2026", time: "6:00 p.m.", matchup: "Philipsburg Marble and Granite vs. Nittany Energy" },
      { date: "Saturday, January 24, 2026", time: "7:00 p.m.", matchup: "Nittany Energy vs. Under Pressure Pro Cleaners" },
      { date: "Saturday, January 31, 2026", time: "6:00 p.m.", matchup: "Lee Industries vs. Nittany Energy" },
      { date: "Saturday, February 7, 2026", time: "7:00 p.m.", matchup: "Philipsburg Marble and Granite vs. Nittany Energy" },
      { date: "Saturday, February 14, 2026", time: "10:00 a.m.", matchup: "Nittany Energy vs. Under Pressure Pro Cleaners" },
      { date: "Saturday, February 21, 2026", time: "7:00 p.m.", matchup: "Lee Industries vs. Nittany Energy" },
      { date: "Saturday, February 28, 2026", time: "7:00 p.m.", matchup: "Philipsburg Marble and Granite vs. Nittany Energy" },
    ],
    scheduleNote: "Unless otherwise noted, all games are played at Philipsburg-Osceola Middle School, 200 Short Street, Philipsburg, PA 16866",
  },
  {
    id: "marble-granite",
    name: "Philipsburg Marble and Granite",
    season: "2025-26",
    division: "3rd-6th",
    coaches: "Potter, S. Patterson, T. Patterson and Pletcher",
    mediaFolder: publicMedia.elementaryTeams.marbleGranite,
    roster: [
      { label: "Back row (L to R)", names: "Coach Jeremy Potter, Coach Sue Patterson, Coach Tammy Patterson and Coach Andrew Pletcher." },
      { label: "Middle row (L to R)", names: "Lincoln Packer, Keegan Richner, Bo Willis, Nolan Potter, Sebastian Christine and Nate Patterson." },
      { label: "First row (L to R)", names: "Zayden Kopchik, Jhett Thompson, Griffin Willis, Samai Pewu and Willow Pletcher." },
    ],
    schedule: [
      { date: "Saturday, December 6, 2025", time: "4:00 p.m.", matchup: "Philipsburg Marble and Granite vs. Lee Industries" },
      { date: "Saturday, December 13, 2025", time: "7:00 p.m.", matchup: "Philipsburg Marble and Granite vs. Under Pressure Pro Cleaners" },
      { date: "Saturday, December 20, 2025", time: "7:00 p.m.", matchup: "Philipsburg Marble and Granite vs. Nittany Energy" },
      { date: "Saturday, January 3, 2026", time: "6:00 p.m.", matchup: "Philipsburg Marble and Granite vs. Lee Industries" },
      { date: "Saturday, January 17, 2026", time: "6:00 p.m.", matchup: "Philipsburg Marble and Granite vs. Nittany Energy" },
      { date: "Saturday, January 24, 2026", time: "6:00 p.m.", matchup: "Philipsburg Marble and Granite vs. Lee Industries" },
      { date: "Saturday, January 31, 2026", time: "7:00 p.m.", matchup: "Philipsburg Marble and Granite vs. Under Pressure Pro Cleaners" },
      { date: "Saturday, February 7, 2026", time: "7:00 p.m.", matchup: "Philipsburg Marble and Granite vs. Nittany Energy" },
      { date: "Saturday, February 14, 2026", time: "11:00 a.m.", matchup: "Philipsburg Marble and Granite vs. Lee Industries" },
      { date: "Saturday, February 21, 2026", time: "6:00 p.m.", matchup: "Philipsburg Marble and Granite vs. Under Pressure Pro Cleaners" },
      { date: "Saturday, February 28, 2026", time: "7:00 p.m.", matchup: "Philipsburg Marble and Granite vs. Nittany Energy" },
    ],
    scheduleNote: "Unless otherwise noted, all games are played at Philipsburg-Osceola Middle School, 200 Short Street, Philipsburg, PA 16866",
  },
  {
    id: "under-pressure",
    name: "Under Pressure Pro Cleaners",
    season: "2025-26",
    division: "3rd-6th",
    coaches: "Kelly and Mills",
    mediaFolder: publicMedia.elementaryTeams.underPressure,
    roster: [
      { label: "Back row (L to R)", names: "Coach Shane Kelly, Kyler Jarrett, Israel Davis, Wyatt Olson and Coach Tim Mills." },
      { label: "Middle row (L to R)", names: "Xavier Isaacson, Joey Richards, Oliver Barnett and Austin Albright." },
      { label: "First row (L to R)", names: "Grayson Mills, Parker Supenia and Pedro Rosado-Guzman." },
    ],
    schedule: [
      { date: "Saturday, December 6, 2025", time: "5:00 p.m.", matchup: "Nittany Energy vs. Under Pressure Pro Cleaners" },
      { date: "Saturday, December 13, 2025", time: "7:00 p.m.", matchup: "Philipsburg Marble and Granite vs. Under Pressure Pro Cleaners" },
      { date: "Saturday, December 20, 2025", time: "6:00 p.m.", matchup: "Lee Industries vs. Under Pressure Pro Cleaners" },
      { date: "Saturday, January 3, 2026", time: "6:00 p.m.", matchup: "Nittany Energy vs. Under Pressure Pro Cleaners" },
      { date: "Saturday, January 17, 2026", time: "7:00 p.m.", matchup: "Lee Industries vs. Under Pressure Pro Cleaners" },
      { date: "Saturday, January 24, 2026", time: "7:00 p.m.", matchup: "Nittany Energy vs. Under Pressure Pro Cleaners" },
      { date: "Saturday, January 31, 2026", time: "7:00 p.m.", matchup: "Philipsburg Marble and Granite vs. Under Pressure Pro Cleaners" },
      { date: "Saturday, February 7, 2026", time: "6:00 p.m.", matchup: "Lee Industries vs. Under Pressure Pro Cleaners" },
      { date: "Saturday, February 14, 2026", time: "10:00 a.m.", matchup: "Nittany Energy vs. Under Pressure Pro Cleaners" },
      { date: "Saturday, February 21, 2026", time: "6:00 p.m.", matchup: "Philipsburg Marble and Granite vs. Under Pressure Pro Cleaners" },
      { date: "Saturday, February 28, 2026", time: "6:00 p.m.", matchup: "Lee Industries vs. Under Pressure Pro Cleaners" },
    ],
    scheduleNote: "Unless otherwise noted, all games are played at Philipsburg-Osceola Middle School, 200 Short Street, Philipsburg, PA 16866",
  },
  {
    id: "lions-1-2",
    name: "Central PA Lions",
    season: "2025-26",
    division: "1st-2nd",
    coaches: "Pletcher and Maines",
    mediaFolder: publicMedia.elementaryTeams.lions1st2nd,
    roster: [
      { label: "Back row (L to R)", names: "Coach Andrew Pletcher, Jeffery Gerber, Zaylee Conklin, Emerson Frank, Joah Maines, and Coach Samuel Maines." },
      { label: "Front row (L to R)", names: "Easton Pletcher, Zaiden Engermann, Amir Hankerson and Jesten Kenjora." },
    ],
    schedule: [],
    scheduleNote: "2025–2026 schedule coming soon. Games at Philipsburg-Osceola Middle School unless otherwise noted.",
  },
  {
    id: "glenn-hawbaker",
    name: "Glenn O. Hawbaker, Inc.",
    season: "2025-26",
    division: "1st-2nd",
    coaches: "Coach Stodart",
    mediaFolder: publicMedia.elementaryTeams.glennHawbaker,
    roster: [{ label: "Roster", names: "Francis Smith, Andrew Stodart, Samai Pewu, Theodore McCamley, Victor Campos-Hooven, Maverick Wilson, Isaiah Marko, Leanna Twigg, Jeffrey Raley" }],
    schedule: [],
    scheduleNote: "2025–2026 schedule coming soon.",
  },
  {
    id: "warhawks-1-2",
    name: "PA Warhawks",
    season: "2025-26",
    division: "1st-2nd",
    coaches: "Coach Fish",
    mediaFolder: publicMedia.elementaryTeams.warhawks1st2nd,
    roster: [{ label: "Roster", names: "Parker Supenia, David Fish, Peyton Richards, Cayden Sipes, Elaina Thomas, Simon Franek, Delilah Scoggins, Madilynn Walker" }],
    schedule: [],
    scheduleNote: "2025–2026 schedule coming soon.",
  },
  {
    id: "lions-pre-k",
    name: "Central PA Lions",
    season: "2025-26",
    division: "pre-k-k",
    coaches: "Pletcher and Rossi",
    mediaFolder: publicMedia.elementaryTeams.lionsPreK,
    roster: [{ label: "Left to Right", names: "Coach Pletcher, Easton Pletcher, Diana Hankerson, Paxton Hassinger, Kaden Breindel, Noah Rossi, Coach Rossi" }],
    schedule: [],
    scheduleNote: "2025–2026 schedule coming soon.",
  },
  {
    id: "warhawks-pre-k",
    name: "PA Warhawks",
    season: "2025-26",
    division: "pre-k-k",
    coaches: "Kennedy",
    mediaFolder: publicMedia.elementaryTeams.warhawksPreK,
    roster: [{ label: "Left to Right", names: "Coach Maximillian Kennedy, Shepherd Kennedy, Brantley Belinda, Hunter Corrigan, Cayden Hauk, Coach Dillion Hauk" }],
    schedule: [],
    scheduleNote: "2025–2026 schedule coming soon.",
  },
  {
    id: "moshannon-am-vets-2627",
    name: "Moshannon Valley Am Vets",
    season: "2026-27",
    division: "3rd-6th",
    coaches: "To be announced",
    roster: [],
    schedule: [],
    scheduleNote: "2026–27 roster, photos, and schedule will be posted as the season approaches.",
  },
  {
    id: "luzier-cleaning-2627",
    name: "Luzier Cleaning Service",
    season: "2026-27",
    division: "3rd-6th",
    coaches: "To be announced",
    roster: [],
    schedule: [],
    scheduleNote: "2026–27 roster, photos, and schedule will be posted as the season approaches.",
  },
  {
    id: "alexander-property-2627",
    name: "Alexander Property and Repair & Restoration",
    season: "2026-27",
    division: "3rd-6th",
    coaches: "To be announced",
    roster: [],
    schedule: [],
    scheduleNote: "2026–27 roster, photos, and schedule will be posted as the season approaches.",
  },
  {
    id: "lee-industries-2627",
    name: "Lee Industries",
    season: "2026-27",
    division: "3rd-6th",
    coaches: "To be announced",
    roster: [],
    schedule: [],
    scheduleNote: "2026–27 roster, photos, and schedule will be posted as the season approaches.",
  },
  {
    id: "nittany-minimart-2627",
    name: "Nittany Minimart",
    season: "2026-27",
    division: "1st-2nd",
    coaches: "To be announced",
    roster: [],
    schedule: [],
    scheduleNote: "2026–27 roster, photos, and schedule will be posted as the season approaches.",
  },
  {
    id: "glenn-hawbaker-2627",
    name: "Glenn O. Hawbaker",
    season: "2026-27",
    division: "1st-2nd",
    coaches: "To be announced",
    roster: [],
    schedule: [],
    scheduleNote: "2026–27 roster, photos, and schedule will be posted as the season approaches.",
  },
  {
    id: "warhawks-1-2-2627",
    name: "PA Warhawks",
    season: "2026-27",
    division: "1st-2nd",
    coaches: "To be announced",
    roster: [],
    schedule: [],
    scheduleNote: "2026–27 roster, photos, and schedule will be posted as the season approaches.",
  },
  {
    id: "morning-grind-2627",
    name: "Morning Grind, LLC",
    season: "2026-27",
    division: "pre-k-k",
    coaches: "To be announced",
    roster: [],
    schedule: [],
    scheduleNote: "2026–27 roster, photos, and schedule will be posted as the season approaches.",
  },
  {
    id: "manning-photography-2627",
    name: "Manning Photography",
    season: "2026-27",
    division: "pre-k-k",
    coaches: "To be announced",
    roster: [],
    schedule: [],
    scheduleNote: "2026–27 roster, photos, and schedule will be posted as the season approaches.",
  },
];

export function getTeamsByDivision(
  division: ElementaryTeam["division"],
  season: ElementarySeasonId = "2025-26",
) {
  return elementaryTeams.filter((t) => t.division === division && t.season === season);
}

export function getTeamById(id: string) {
  return elementaryTeams.find((t) => t.id === id);
}
