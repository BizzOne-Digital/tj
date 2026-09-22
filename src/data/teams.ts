export type SeasonId =
  | "2020-21"
  | "2021-22"
  | "2022-23"
  | "2023-24"
  | "2024-25"
  | "2025-26";

export const seasons: { id: SeasonId; label: string }[] = [
  { id: "2020-21", label: "2020–21" },
  { id: "2021-22", label: "2021–22" },
  { id: "2022-23", label: "2022–23" },
  { id: "2023-24", label: "2023–24" },
  { id: "2024-25", label: "2024–25" },
  { id: "2025-26", label: "2025–26" },
];

export type TeamGroup = {
  id: string;
  name: string;
  division: string;
  coaches?: string[];
  roster?: { name?: string; number?: string }[];
  photo?: string;
  note?: string;
};

export type SeasonData = {
  id: SeasonId;
  label: string;
  coaches: { name: string; role?: string; photo?: string }[];
  teams: TeamGroup[];
  seniorSpotlight?: { title: string; content: string }[];
  mediaNote?: string;
};

export const seasonArchive: Record<SeasonId, SeasonData> = {
  "2020-21": {
    id: "2020-21",
    label: "2020–21",
    coaches: [],
    teams: [],
    mediaNote: "Team photos, rosters, and coach information pending client media upload from Google Drive.",
  },
  "2021-22": {
    id: "2021-22",
    label: "2021–22",
    coaches: [],
    teams: [],
    mediaNote: "Team photos, rosters, and coach information pending client media upload from Google Drive.",
  },
  "2022-23": {
    id: "2022-23",
    label: "2022–23",
    coaches: [],
    teams: [],
    mediaNote: "Team photos, rosters, and coach information pending client media upload from Google Drive.",
  },
  "2023-24": {
    id: "2023-24",
    label: "2023–24",
    coaches: [],
    teams: [],
    mediaNote: "Team photos, rosters, and coach information pending client media upload from Google Drive.",
  },
  "2024-25": {
    id: "2024-25",
    label: "2024–25",
    coaches: [],
    teams: [],
    mediaNote: "Team photos, rosters, and coach information pending client media upload from Google Drive.",
  },
  "2025-26": {
    id: "2025-26",
    label: "2025–26",
    coaches: [],
    teams: [
      {
        id: "3-4-select-25-26",
        name: "3–4 Select Team",
        division: "Select",
        note: "Team photo available on current website — pending optimized upload.",
        photo: "/images/teams/3-4-select-25-26.jpg",
      },
      {
        id: "5-6-select-25-26",
        name: "5–6 Select Team",
        division: "Select",
        note: "Team photo available on current website — pending optimized upload.",
        photo: "/images/teams/5-6-select-25-26.jpeg",
      },
      {
        id: "varsity-25-26",
        name: "P-O Varsity Team",
        division: "Varsity",
        note: "Team photo with coaches available on current website — pending optimized upload.",
        photo: "/images/teams/po-varsity-25-26.jpeg",
      },
    ],
    mediaNote: "Additional rosters and player photos pending client approval and Google Drive upload.",
  },
};

export const selectProgramRecord = {
  season: "2025–26",
  program: "P-O Select Program",
  record: "77–19",
  note: "Season record for the 2025–26 Select Program. Not presented as an all-time program record.",
};
