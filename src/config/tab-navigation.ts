import type { TabNavItem } from "@/components/ui/TabNav";

export const youthCampTabNav: TabNavItem[] = [
  { label: "Summer Camp", href: "/programs/youth-basketball-camp" },
  { label: "Scholarship Day", href: "/programs/youth-basketball-camp/scholarship-day" },
  { label: "Scholarship Winners", href: "/programs/youth-basketball-camp/scholarship-winners" },
  { label: "5-on-5", href: "/programs/youth-basketball-camp/5-on-5" },
  { label: "3-on-3", href: "/programs/youth-basketball-camp/3-on-3" },
  { label: "Camp MVP", href: "/programs/youth-basketball-camp/camp-mvp" },
];

export const fall3On3TabNav: TabNavItem[] = [
  { label: "3-on-3 Fall League", href: "/leagues/3-on-3-fall" },
  { label: "League News", href: "/leagues/3-on-3-fall/news" },
  { label: "League Overview", href: "/leagues/elementary" },
  { label: "Schedule", href: "/leagues/elementary/schedule" },
  { label: "Game Results", href: "/leagues/elementary/results" },
  { label: "P-O Select Program", href: "/select-program" },
  { label: "Awards & Championships", href: "/awards-records" },
];

export const elementaryTabNav: TabNavItem[] = [
  { label: "3-on-3 Fall League", href: "/leagues/3-on-3-fall" },
  { label: "League Overview", href: "/leagues/elementary" },
  { label: "Schedule", href: "/leagues/elementary/schedule" },
  { label: "Game Results", href: "/leagues/elementary/results" },
  { label: "3rd–6th Teams", href: "/leagues/elementary/teams?season=2025-26&division=3rd-6th" },
  { label: "1st–2nd Teams", href: "/leagues/elementary/teams?season=2025-26&division=1st-2nd" },
  { label: "Pre-K/K Teams", href: "/leagues/elementary/teams?season=2025-26&division=pre-k-k" },
  { label: "Player Awards", href: "/awards-records/league-player-awards" },
  { label: "Championships", href: "/awards-records/team-championships" },
  { label: "All-Stars", href: "/awards-records/league-all-stars" },
];

export const awardsTabNav: TabNavItem[] = [
  { label: "Overview", href: "/awards-records" },
  { label: "League Player Awards", href: "/awards-records/league-player-awards" },
  { label: "Team Championships", href: "/awards-records/team-championships" },
  { label: "League All-Stars", href: "/awards-records/league-all-stars" },
  { label: "Record Book", href: "/awards-records/record-book" },
];

export const selectProgramTabNav: TabNavItem[] = [
  { label: "Select League", href: "/select-program" },
  { label: "Select Teams", href: "/select-program/select-teams" },
  { label: "2026–27 Season", href: "/select-program/2026-27" },
  { label: "Game Results", href: "/select-program/game-results" },
  { label: "League Champions", href: "/select-program/league-champions" },
  { label: "Player Awards", href: "/select-program/player-awards" },
  { label: "All-Stars", href: "/select-program/all-stars" },
  { label: "2027–28", href: "/select-program/2027-28" },
  { label: "Season Recap", href: "/select-program/season-recap" },
  { label: "Leagues", href: "/select-program/leagues" },
  { label: "Tournaments", href: "/select-program/tournaments" },
  { label: "Team Photos", href: "/select-program/team-photos" },
];

export const specialEventsTabNav: TabNavItem[] = [
  { label: "All Events", href: "/events" },
  { label: "Special Events", href: "/events/special-events" },
  { label: "End of Year Banquet", href: "/events/special-events/banquet" },
  { label: "Youth Basketball Camp", href: "/events/special-events/youth-camp" },
  { label: "Camps & Clinics", href: "/events/special-events/camps-clinic" },
  { label: "Elementary Summer League", href: "/events/special-events/elementary-summer-league" },
];

export const defaultTabGroups = [
  { slug: "youth-camp", name: "Youth Basketball Camp", tabs: youthCampTabNav },
  { slug: "fall-3-on-3", name: "3-on-3 Fall League", tabs: fall3On3TabNav },
  { slug: "elementary", name: "Elementary League", tabs: elementaryTabNav },
  { slug: "awards", name: "Awards & Records", tabs: awardsTabNav },
  { slug: "select-program", name: "Select Program", tabs: selectProgramTabNav },
  { slug: "special-events", name: "Special Events", tabs: specialEventsTabNav },
] as const;
