import { recordBookPdf } from "./pdf-part3";

export type AwardCategory = {
  id: string;
  title: string;
  description: string;
  entries: { label: string; value?: string; season?: string; note?: string }[];
};

export const awardCategories: AwardCategory[] = [
  {
    id: "league-player-awards",
    title: "League Player Awards",
    description: "Individual honors recognizing outstanding league performance.",
    entries: [{ label: "Awards pending client verification and media upload." }],
  },
  {
    id: "team-championships",
    title: "Team League Championships",
    description: "League championship teams by season.",
    entries: [{ label: "Championship teams pending client verification." }],
  },
  {
    id: "league-all-stars",
    title: "League All-Stars",
    description: "All-Star selections including East, West, and MVP honors.",
    entries: [{ label: "All-Star rosters pending client verification." }],
  },
  {
    id: "scholarship-winners",
    title: "Scholarship Winners",
    description: "Competition/Scholarship Day scholarship recipients.",
    entries: [{ label: "Scholarship winners pending client verification." }],
  },
  {
    id: "camp-mvps",
    title: "Camp MVPs",
    description: "Youth Basketball Camp MVP honorees by season.",
    entries: [{ label: "Camp MVP records pending client verification." }],
  },
  {
    id: "championship-teams",
    title: "Championship Teams",
    description: "State and league championship teams.",
    entries: [{ label: "Championship team records pending client verification." }],
  },
];

export const recordBookCategories = recordBookPdf.categories.map((cat) => ({
  id: cat.id,
  title: cat.title,
  unit: cat.scope === "career" ? "career" : cat.scope === "single-game" ? "game" : "season",
}));

export const recordBookNote = recordBookPdf.description;
