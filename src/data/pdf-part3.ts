import { publicMedia } from "@/config/public-media";

const elksBase = publicMedia.elksHoopShoot;

export const elksHoopShootPdf = {
  title: "Philipsburg Elks Hoop Shoot",
  date: "Saturday, January 3, 2026",
  time: "Contest begins at 10:00 AM; gym opens at 9:00 AM",
  location: "Philipsburg-Osceola High School gym",
  description:
    "The Philipsburg Elks local Hoop Shoot contest is an incredible opportunity for boys and girls aged 8 to 13 to participate, compete, set goals, and have fun. You don't have to play basketball to compete and succeed at the Hoop Shoot.",
  director: "Daniel Nelson, contest director",
  website: "https://www.elks.org/hoopshoot",
  spreadTheWord: "Spread the word.",
  mediaBase: elksBase,
  posterImage: `${elksBase}/Picture/E34EC85F-838A-4A46-B7E0-18266888EC97.JPG`,
  seasons: [
    {
      id: "2022-23",
      label: "2022–23 Season",
      mediaFolder: `${elksBase}/2022-23 Season`,
    },
    {
      id: "2023-24",
      label: "2023–24 Season",
      mediaFolder: `${elksBase}/2023-24 Season`,
    },
    {
      id: "2024-25",
      label: "2024–25 Season",
      mediaFolder: `${elksBase}/2024-25 Season`,
    },
    {
      id: "2025-26",
      label: "2025–26 Season",
      mediaFolder: `${elksBase}/2025-26 Season`,
    },
  ],
};

export type MeetMediaSection = {
  id: string;
  title: string;
  mediaFolder: string;
  subtitle?: string;
};

export type MeetTeamGroup = {
  id: string;
  division: string;
  teams: MeetMediaSection[];
};

export type MeetSeason = {
  id: string;
  label: string;
  shared: MeetMediaSection[];
  seniorSpotlight?: MeetMediaSection;
  divisions: MeetTeamGroup[];
};

const meetBase = "MEET THE MOUNTIES Folder";

export const meetTheMountiesPdf = {
  title: "Meet the Mounties",
  description: "Season archives with coaches, rosters, senior spotlight, and team photos.",
  coachesFolder: `${meetBase}/ Coaches Folder/ Pictures`,
  rosterFolder: `${meetBase}/ Roster Folder/ Pictures`,
  seasons: [
    {
      id: "2020-21",
      label: "2020–21 Season",
      shared: [
        { id: "coaches", title: "Coaches", mediaFolder: `${meetBase}/ Coaches Folder/ Pictures` },
        { id: "roster", title: "Roster", mediaFolder: `${meetBase}/ Roster Folder/ Pictures` },
      ],
      seniorSpotlight: {
        id: "senior-spotlight",
        title: "Senior Spotlight",
        mediaFolder: `${meetBase}/ 2020-21 Folder/ Senior Spotlight Folder/ Pictures`,
      },
      divisions: [
        {
          id: "k-2",
          division: "K/2nd Grade Team",
          teams: [
            {
              id: "k-2-team",
              title: "K/2nd Grade Team",
              mediaFolder: `${meetBase}/ 2020-21 Folder/ K/2nd Grade Team Folder/ Pictures`,
            },
          ],
        },
        {
          id: "3-4",
          division: "3/4th Grade Team",
          teams: [
            {
              id: "3-4-team",
              title: "3/4th Grade Team",
              mediaFolder: `${meetBase}/ 2020-21 Folder/ 3/4th Grade Team/ Pictures`,
            },
          ],
        },
        {
          id: "5-6",
          division: "5/6th Grade Team",
          teams: [
            {
              id: "5-6-team",
              title: "5/6th Grade Team",
              mediaFolder: `${meetBase}/ 2020-21 Folder/ 5/6th Grade Team/ Pictures`,
            },
          ],
        },
      ],
    },
    {
      id: "2021-22",
      label: "2021–22 Season",
      shared: [
        { id: "coaches", title: "Coaches", mediaFolder: `${meetBase}/ Coaches Folder/ Pictures` },
        { id: "roster", title: "Roster", mediaFolder: `${meetBase}/ Roster Folder/ Pictures` },
      ],
      seniorSpotlight: {
        id: "senior-spotlight",
        title: "Senior Spotlight",
        mediaFolder: `${meetBase}/ 2021-22 Folder/ Senior Spotlight Folder/ Pictures`,
      },
      divisions: [
        {
          id: "k-2",
          division: "K/2nd Grade Team",
          teams: [
            {
              id: "k-2-team",
              title: "K/2nd Grade Team",
              mediaFolder: `${meetBase}/ 2021-22 Folder/ K/2nd Grade Team Folder/ Pictures`,
            },
          ],
        },
        {
          id: "3-4",
          division: "3/4th Grade Team",
          teams: [
            {
              id: "3-4-team",
              title: "3/4th Grade Team",
              mediaFolder: `${meetBase}/ 2021-22 Folder/ 3/4th Grade Team/ Pictures`,
            },
          ],
        },
        {
          id: "5-6",
          division: "5/6th Grade Team",
          teams: [
            {
              id: "5-6-team",
              title: "5/6th Grade Team",
              mediaFolder: `${meetBase}/ 2021-22 Folder/ 5/6th Grade Team/ Pictures`,
            },
          ],
        },
      ],
    },
    {
      id: "2022-23",
      label: "2022–23 Season",
      shared: [
        { id: "coaches", title: "Coaches", mediaFolder: `${meetBase}/ Coaches Folder/ Pictures` },
        { id: "roster", title: "Roster", mediaFolder: `${meetBase}/ Roster Folder/ Pictures` },
      ],
      seniorSpotlight: {
        id: "senior-spotlight",
        title: "Senior Spotlight",
        mediaFolder: `${meetBase}/ 2022-23 Folder/ Senior Spotlight Folder/ Pictures`,
      },
      divisions: [
        {
          id: "k-2",
          division: "K/2nd Grade Team",
          teams: [
            {
              id: "glenn-o-hawbaker-team",
              title: "Glenn O. Hawbaker — Team Picture",
              mediaFolder: `${meetBase}/ 2022-23 Folder/ K/2nd Grade Team/ Glenn O. Hawbaker/ Team Pictures`,
            },
            {
              id: "glenn-o-hawbaker-players",
              title: "Glenn O. Hawbaker — Players Pictures",
              mediaFolder: `${meetBase}/ 2022-23 Folder/ K/2nd Grade Team/ Glenn O. Hawbaker / Team Pictures`,
            },
            {
              id: "glenn-o-hawbaker-roster",
              title: "Glenn O. Hawbaker — Roster",
              mediaFolder: `${meetBase}/ 2022-23 Folder/ K/2nd Grade Team Folder/ Pictures`,
            },
            {
              id: "dental-partners-team",
              title: "Philipsburg Dental Partners — Team Picture",
              mediaFolder: `${meetBase}/ 2022-23 Folder/ K/2nd Grade Team/Philipsburg Dental Partners/ Team Pictures`,
            },
            {
              id: "dental-partners-players",
              title: "Philipsburg Dental Partners — Players Pictures",
              mediaFolder: `${meetBase}/ 2022-23 Folder/ K/2nd Grade Team/Philipsburg Dental Partners/ Players Pictures`,
            },
            {
              id: "dental-partners-roster",
              title: "Philipsburg Dental Partners — Roster",
              mediaFolder: `${meetBase}/ 2022-23 Folder/ K/2nd Grade Team Folder/ Roster/ Pictures`,
            },
          ],
        },
        {
          id: "3-6",
          division: "3/6th Grade Team",
          teams: [
            {
              id: "central-pa-lions-team",
              title: "Central PA Lions — Team Picture",
              mediaFolder: `${meetBase}/ 2022-23 Folder/ 3/6th Grade Team/ Central PA Lions/ Team Pictures`,
            },
            {
              id: "central-pa-lions-players",
              title: "Central PA Lions — Players Pictures",
              mediaFolder: `${meetBase}/ 2022-23 Folder/ 3/6th Grade Team/ Central PA Lions/ Team Pictures`,
            },
            {
              id: "lee-industries-team",
              title: "Lee Industries — Team Picture",
              mediaFolder: `${meetBase}/ 2022-23 Folder/ 3/6th Grade Team/ Lee Industries/ Team Pictures`,
            },
            {
              id: "lee-industries-players",
              title: "Lee Industries — Players Pictures",
              mediaFolder: `${meetBase}/ 2022-23 Folder/ 3/6th Grade Team/ Lee Industries/ Team Pictures`,
            },
            {
              id: "pa-warhawks-team",
              title: "PA Warhawks AAU Program — Team Picture",
              mediaFolder: `${meetBase}/ 2022-23 Folder/ 3/6th Grade Team/ PA Warhawks AAU Program / Team Pictures`,
            },
            {
              id: "pa-warhawks-players",
              title: "PA Warhawks AAU Program — Players Pictures",
              mediaFolder: `${meetBase}/ 2022-23 Folder/ 3/6th Grade Team/ PA Warhawks AAU Program / Team Pictures`,
            },
            {
              id: "marble-granite-team",
              title: "Philipsburg Marble and Granted — Team Picture",
              mediaFolder: `${meetBase}/ 2022-23 Folder/ 3/6th Grade Team/ Philipsburg Marble and Granted / Team Pictures`,
            },
            {
              id: "marble-granite-players",
              title: "Philipsburg Marble and Granted — Players Pictures",
              mediaFolder: `${meetBase}/ 2022-23 Folder/ 3/6th Grade Team/Philipsburg Marble and Granted / Players Pictures`,
            },
          ],
        },
      ],
    },
    {
      id: "2023-24",
      label: "2023–24 Season",
      shared: [
        { id: "coaches", title: "Coaches", mediaFolder: `${meetBase}/ Coaches Folder/ Pictures` },
        { id: "roster", title: "Roster", mediaFolder: `${meetBase}/ Roster Folder/ Pictures` },
      ],
      seniorSpotlight: {
        id: "senior-spotlight",
        title: "Senior Spotlight",
        mediaFolder: `${meetBase}/ 2023-24 Folder/ Senior Spotlight Folder/ Pictures`,
      },
      divisions: [
        {
          id: "k-2",
          division: "K/2nd Grade Team",
          teams: [
            {
              id: "central-pa-lions-team",
              title: "Central PA Lions — Team Picture",
              mediaFolder: `${meetBase}/ 2023-24 Folder/ K/2nd Grade Team/ Central PA Lions/ Team Pictures`,
            },
            {
              id: "central-pa-lions-players",
              title: "Central PA Lions — Players Pictures",
              mediaFolder: `${meetBase}/ 2023-24 Folder/ K/2nd Grade Team/ Central PA Lions/ Players Pictures`,
            },
            {
              id: "central-pa-lions-roster",
              title: "Central PA Lions — Roster",
              mediaFolder: `${meetBase}/ 2023-24 Folder/ K/2nd Grade Team Folder/ Roster Folder/ Pictures`,
            },
            {
              id: "central-pa-lions-coach",
              title: "Central PA Lions — Coach",
              mediaFolder: `${meetBase}/ 2023-24 Folder/ K/2nd Grade Team/ Central PA Lions/ Coach/ Pictures`,
            },
            {
              id: "marble-granite-team",
              title: "Philipsburg Marble and Granted — Team Picture",
              mediaFolder: `${meetBase}/ 2023-24 Folder/ K/2nd Grade Team/Philipsburg Marble and Granted / Team Pictures`,
            },
            {
              id: "marble-granite-players",
              title: "Philipsburg Marble and Granted — Players Pictures",
              mediaFolder: `${meetBase}/ 2023-24 Folder/ K/2nd Grade Team/Philipsburg Marble and Granted/ Players Pictures`,
            },
            {
              id: "marble-granite-roster",
              title: "Philipsburg Marble and Granted — Roster",
              mediaFolder: `${meetBase}/ 2023-24 Folder/ K/2nd Grade Team Folder/ Roster Pictures`,
            },
          ],
        },
        {
          id: "3-6",
          division: "3/6th Grade Team",
          teams: [
            {
              id: "nittany-energy-team",
              title: "Nittany Energy — Team Picture",
              mediaFolder: `${meetBase}/ 2023-24 Folder/ 3/6th Grade Team/ Nittany Energy / Team Pictures`,
            },
            {
              id: "nittany-energy-players",
              title: "Nittany Energy — Players Pictures",
              mediaFolder: `${meetBase}/ 2023-24 Folder/ 3/6th Grade Team/Nittany Energy / Team Pictures`,
            },
            {
              id: "nittany-energy-roster",
              title: "Nittany Energy — Roster",
              mediaFolder: `${meetBase}/ 2023-24 Folder/ 3/6th Grade Team/ Nittany Energy / Roster`,
            },
            {
              id: "lee-industries-team",
              title: "Lee Industries — Team Picture",
              mediaFolder: `${meetBase}/ 2023-24 Folder/ 3/6th Grade Team/ Lee Industries/ Team Pictures`,
            },
            {
              id: "lee-industries-players",
              title: "Lee Industries — Players Pictures",
              mediaFolder: `${meetBase}/ 2023-24 Folder/ 3/6th Grade Team/ Lee Industries/ Team Pictures`,
            },
            {
              id: "lee-industries-roster",
              title: "Lee Industries — Roster",
              mediaFolder: `${meetBase}/ 2023-24 Folder/ 3/6th Grade Team/ Lee Industries/ Roster/ Pictures`,
            },
            {
              id: "lee-industries-coach",
              title: "Lee Industries — Coach",
              mediaFolder: `${meetBase}/ 2023-24 Folder/ 3/6th Grade Team/Lee Industries/ Coach/ Pictures`,
            },
            {
              id: "under-pressure-team",
              title: "Under Pressure Pro Cleaners — Team Picture",
              mediaFolder: `${meetBase}/ 2023-24 Folder/ 3/6th Grade Team/ Under Pressure Pro Cleaners / Team Pictures`,
            },
            {
              id: "under-pressure-players",
              title: "Under Pressure Pro Cleaners — Players Pictures",
              mediaFolder: `${meetBase}/ 2023-24 Folder/ 3/6th Grade Team/Under Pressure Pro Cleaners / Team Pictures`,
            },
            {
              id: "under-pressure-roster",
              title: "Under Pressure Pro Cleaners — Roster",
              mediaFolder: `${meetBase}/ 2023-24 Folder/ 3/6th Grade Team/Under Pressure Pro Cleaners / Roster/ Pictures`,
            },
            {
              id: "under-pressure-coach",
              title: "Under Pressure Pro Cleaners — Coach",
              mediaFolder: `${meetBase}/ 2023-24 Folder/ 3/6th Grade Team/Under Pressure Pro Cleaners/ Coach/ Pictures`,
            },
            {
              id: "marble-granite-team",
              title: "Philipsburg Marble and Granted — Team Picture",
              mediaFolder: `${meetBase}/ 2023-24 Folder/ 3/6th Grade Team/ Philipsburg Marble and Granted / Team Pictures`,
            },
            {
              id: "marble-granite-players",
              title: "Philipsburg Marble and Granted — Players Pictures",
              mediaFolder: `${meetBase}/ 2023-24 Folder/ 3/6th Grade Team/Philipsburg Marble and Granted / Players Pictures`,
            },
            {
              id: "marble-granite-roster",
              title: "Philipsburg Marble and Granted — Roster",
              mediaFolder: `${meetBase}/ 2023-24 Folder/ 3/6th Grade Team/Philipsburg Marble and Granted / Roster/ Pictures`,
            },
            {
              id: "marble-granite-coach",
              title: "Philipsburg Marble and Granted — Coach",
              mediaFolder: `${meetBase}/ 2023-24 Folder/ 3/6th Grade Team/Philipsburg Marble and Granted / Coach/ Pictures`,
            },
          ],
        },
      ],
    },
    {
      id: "2024-25",
      label: "2024–25 Season",
      shared: [
        { id: "coaches", title: "Coaches", mediaFolder: `${meetBase}/ Coaches Folder/ Pictures` },
      ],
      seniorSpotlight: {
        id: "senior-spotlight",
        title: "Senior Spotlight",
        mediaFolder: `${meetBase}/ 2024-25 Folder/ Senior Spotlight Folder/ Pictures`,
      },
      divisions: [
        {
          id: "k-2",
          division: "K/2nd Grade Team",
          teams: [
            {
              id: "glenn-o-hawbaker-team",
              title: "Glenn O. Hawbaker — Team Picture",
              mediaFolder: `${meetBase}/ 2024-25 Folder/ K/2nd Grade Team/ GLENN O. HAWBAKER/ Team Pictures`,
            },
            {
              id: "glenn-o-hawbaker-players",
              title: "Glenn O. Hawbaker — Players Pictures",
              mediaFolder: `${meetBase}/ 2024-25 Folder/ K/2nd Grade Team/ GLENN O. HAWBAKER/ Players Pictures`,
            },
            {
              id: "glenn-o-hawbaker-roster",
              title: "Glenn O. Hawbaker — Roster",
              mediaFolder: `${meetBase}/ GLENN O. HAWBAKER /Roster Folder/ Pictures`,
            },
            {
              id: "central-pa-lions-team",
              title: "Central PA Lions — Team Picture",
              mediaFolder: `${meetBase}/ 2024-25 Folder/ K/2nd Grade Team/ Central PA Lions/ Team Pictures`,
            },
            {
              id: "central-pa-lions-players",
              title: "Central PA Lions — Players Pictures",
              mediaFolder: `${meetBase}/ 2024-25 Folder/ K/2nd Grade Team/ Central PA Lions/ Players Pictures`,
            },
            {
              id: "central-pa-lions-roster",
              title: "Central PA Lions — Roster",
              mediaFolder: `${meetBase}/ 2024-25 Folder/ K/2nd Grade Team Folder/ Roster Folder/ Pictures`,
            },
            {
              id: "central-pa-lions-coach",
              title: "Central PA Lions — Coach",
              mediaFolder: `${meetBase}/ 2024-25 Folder/ K/2nd Grade Team/ Central PA Lions/ Coach/ Pictures`,
            },
            {
              id: "pa-warhawks-team",
              title: "PA Warhawks — Team Picture",
              mediaFolder: `${meetBase}/ 2024-25 Folder/ K/2nd Grade Team/PA WARHAWKS / Team Pictures`,
            },
            {
              id: "pa-warhawks-players",
              title: "PA Warhawks — Players Pictures",
              mediaFolder: `${meetBase}/ 2024-25 Folder/ K/2nd Grade Team/PA WARHAWKS/ Players Pictures`,
            },
            {
              id: "pa-warhawks-roster",
              title: "PA Warhawks — Roster",
              mediaFolder: `${meetBase}/ 2024-25 Folder/ K/2nd Grade Team Folder/ PA WARHAWKS /Roster Pictures`,
            },
            {
              id: "pa-warhawks-coach",
              title: "PA Warhawks — Coach",
              mediaFolder: `${meetBase}/ 2024-25 Folder/ K/2nd Grade Team/ PA WARHAWKS/ Coach/ Pictures`,
            },
          ],
        },
        {
          id: "3-6",
          division: "3/6th Grade Team",
          teams: [
            {
              id: "nittany-energy-team",
              title: "Nittany Energy — Team Picture",
              mediaFolder: `${meetBase}/ 2024-25 Folder/ 3/6th Grade Team/ Nittany Energy / Team Pictures`,
            },
            {
              id: "nittany-energy-players",
              title: "Nittany Energy — Players Pictures",
              mediaFolder: `${meetBase}/ 2024-25 Folder/ 3/6th Grade Team/Nittany Energy / Team Pictures`,
            },
            {
              id: "nittany-energy-roster",
              title: "Nittany Energy — Roster",
              mediaFolder: `${meetBase}/ 2024-25 Folder/ 3/6th Grade Team/ Nittany Energy / Roster`,
            },
            {
              id: "nittany-energy-coach",
              title: "Nittany Energy — Coach",
              mediaFolder: `${meetBase}/ 2024-25 Folder/ 3/6th Grade Team/Nittany Energy/ Coach/ Pictures`,
            },
            {
              id: "lee-industries-team",
              title: "Lee Industries — Team Picture",
              mediaFolder: `${meetBase}/ 2024-25 Folder/ 3/6th Grade Team/ Lee Industries/ Team Pictures`,
            },
            {
              id: "lee-industries-players",
              title: "Lee Industries — Players Pictures",
              mediaFolder: `${meetBase}/ 2024-25 Folder/ 3/6th Grade Team/ Lee Industries/ Team Pictures`,
            },
            {
              id: "lee-industries-roster",
              title: "Lee Industries — Roster",
              mediaFolder: `${meetBase}/ 2024-25 Folder/ 3/6th Grade Team/ Lee Industries/ Roster/ Pictures`,
            },
            {
              id: "lee-industries-coach",
              title: "Lee Industries — Coach",
              mediaFolder: `${meetBase}/ 2024-25 Folder/ 3/6th Grade Team/Lee Industries/ Coach/ Pictures`,
            },
            {
              id: "under-pressure-team",
              title: "Under Pressure Pro Cleaners — Team Picture",
              mediaFolder: `${meetBase}/ 2024-25 Folder/ 3/6th Grade Team/ Under Pressure Pro Cleaners / Team Pictures`,
            },
            {
              id: "under-pressure-players",
              title: "Under Pressure Pro Cleaners — Players Pictures",
              mediaFolder: `${meetBase}/ 2024-25 Folder/ 3/6th Grade Team/Under Pressure Pro Cleaners / Team Pictures`,
            },
            {
              id: "under-pressure-roster",
              title: "Under Pressure Pro Cleaners — Roster",
              mediaFolder: `${meetBase}/ 2024-25 Folder/ 3/6th Grade Team/Under Pressure Pro Cleaners / Roster/ Pictures`,
            },
            {
              id: "under-pressure-coach",
              title: "Under Pressure Pro Cleaners — Coach",
              mediaFolder: `${meetBase}/ 2024-25 Folder/ 3/6th Grade Team/Under Pressure Pro Cleaners/ Coach/ Pictures`,
            },
            {
              id: "marble-granite-team",
              title: "Philipsburg Marble and Granted — Team Picture",
              mediaFolder: `${meetBase}/ 2024-25 Folder/ 3/6th Grade Team/ Philipsburg Marble and Granted / Team Pictures`,
            },
            {
              id: "marble-granite-players",
              title: "Philipsburg Marble and Granted — Players Pictures",
              mediaFolder: `${meetBase}/ 2024-25 Folder/ 3/6th Grade Team/Philipsburg Marble and Granted / Players Pictures`,
            },
            {
              id: "marble-granite-roster",
              title: "Philipsburg Marble and Granted — Roster",
              mediaFolder: `${meetBase}/ 2024-25 Folder/ 3/6th Grade Team/Philipsburg Marble and Granted / Roster/ Pictures`,
            },
            {
              id: "marble-granite-coach",
              title: "Philipsburg Marble and Granted — Coach",
              mediaFolder: `${meetBase}/ 2024-25 Folder/ 3/6th Grade Team/Philipsburg Marble and Granted / Coach/ Pictures`,
            },
          ],
        },
      ],
    },
    {
      id: "2025-26",
      label: "2025–26 Season",
      shared: [
        { id: "coaches", title: "Coaches", mediaFolder: `${meetBase}/ Coaches Folder/ Pictures` },
      ],
      seniorSpotlight: {
        id: "senior-spotlight",
        title: "Senior Spotlight",
        mediaFolder: `${meetBase}/ 2025-26 Folder/ Senior Spotlight Folder/ Pictures`,
      },
      divisions: [
        {
          id: "pre-k-k",
          division: "Pre-K/K Grade Team",
          teams: [
            {
              id: "central-pa-lions-team",
              title: "Central PA Lions — Team Picture",
              mediaFolder: `${meetBase}/ 2025-26 Folder/Pre-K/K Grade Team/ Central PA Lions/ Team Pictures`,
            },
            {
              id: "central-pa-lions-players",
              title: "Central PA Lions — Players Pictures",
              mediaFolder: `${meetBase}/ 2025-26 Folder/Pre-K/K Grade Team/ Central PA Lions/ Players Pictures`,
            },
            {
              id: "central-pa-lions-roster",
              title: "Central PA Lions — Roster",
              mediaFolder: `${meetBase}/ 2025-26 Folder/Pre-K/K Grade Team Folder/ Roster Folder/ Pictures`,
            },
            {
              id: "central-pa-lions-coach",
              title: "Central PA Lions — Coach",
              mediaFolder: `${meetBase}/ 2025-26 Folder/Pre-K/K Grade Team/ Central PA Lions/ Coach/ Pictures`,
            },
            {
              id: "pa-warhawks-team",
              title: "PA Warhawks — Team Picture",
              mediaFolder: `${meetBase}/ 2025-26 Folder/Pre-K/K Grade Team/PA WARHAWKS / Team Pictures`,
            },
            {
              id: "pa-warhawks-players",
              title: "PA Warhawks — Players Pictures",
              mediaFolder: `${meetBase}/ 2025-26 Folder/Pre-K/K Grade Team/PA WARHAWKS/ Players Pictures`,
            },
            {
              id: "pa-warhawks-roster",
              title: "PA Warhawks — Roster",
              mediaFolder: `${meetBase}/ 2025-26 Folder/Pre-K/K Grade Team Folder/ PA WARHAWKS /Roster Pictures`,
            },
            {
              id: "pa-warhawks-coach",
              title: "PA Warhawks — Coach",
              mediaFolder: `${meetBase}/ 2025-26 Folder/Pre-K/K Grade Team/ PA WARHAWKS/ Coach/ Pictures`,
            },
          ],
        },
        {
          id: "k-2",
          division: "K/2nd Grade Team",
          teams: [
            {
              id: "glenn-o-hawbaker-team",
              title: "Glenn O. Hawbaker — Team Picture",
              mediaFolder: `${meetBase}/ 2025-26 Folder/ K/2nd Grade Team/ GLENN O. HAWBAKER/ Team Pictures`,
            },
            {
              id: "glenn-o-hawbaker-players",
              title: "Glenn O. Hawbaker — Players Pictures",
              mediaFolder: `${meetBase}/ 2025-26 Folder/ K/2nd Grade Team/ GLENN O. HAWBAKER/ Players Pictures`,
            },
            {
              id: "glenn-o-hawbaker-roster",
              title: "Glenn O. Hawbaker — Roster",
              mediaFolder: `${meetBase}/ GLENN O. HAWBAKER /Roster Folder/ Pictures`,
            },
            {
              id: "central-pa-lions-team",
              title: "Central PA Lions — Team Picture",
              mediaFolder: `${meetBase}/ 2025-26 Folder/ K/2nd Grade Team/ Central PA Lions/ Team Pictures`,
            },
            {
              id: "central-pa-lions-players",
              title: "Central PA Lions — Players Pictures",
              mediaFolder: `${meetBase}/ 2025-26 Folder/ K/2nd Grade Team/ Central PA Lions/ Players Pictures`,
            },
            {
              id: "central-pa-lions-roster",
              title: "Central PA Lions — Roster",
              mediaFolder: `${meetBase}/ 2025-26 Folder/ K/2nd Grade Team Folder/ Roster Folder/ Pictures`,
            },
            {
              id: "central-pa-lions-coach",
              title: "Central PA Lions — Coach",
              mediaFolder: `${meetBase}/ 2025-26 Folder/ K/2nd Grade Team/ Central PA Lions/ Coach/ Pictures`,
            },
            {
              id: "pa-warhawks-team",
              title: "PA Warhawks — Team Picture",
              mediaFolder: `${meetBase}/ 2025-26 Folder/ K/2nd Grade Team/PA WARHAWKS / Team Pictures`,
            },
            {
              id: "pa-warhawks-players",
              title: "PA Warhawks — Players Pictures",
              mediaFolder: `${meetBase}/ 2025-26 Folder/ K/2nd Grade Team/PA WARHAWKS/ Players Pictures`,
            },
            {
              id: "pa-warhawks-roster",
              title: "PA Warhawks — Roster",
              mediaFolder: `${meetBase}/ 2025-26 Folder/ K/2nd Grade Team Folder/ PA WARHAWKS /Roster Pictures`,
            },
            {
              id: "pa-warhawks-coach",
              title: "PA Warhawks — Coach",
              mediaFolder: `${meetBase}/ 2025-26 Folder/ K/2nd Grade Team/ PA WARHAWKS/ Coach/ Pictures`,
            },
          ],
        },
        {
          id: "3-6",
          division: "3/6th Grade Team",
          teams: [
            {
              id: "nittany-energy-team",
              title: "Nittany Energy — Team Picture",
              mediaFolder: `${meetBase}/ 2025-26 Folder/ 3/6th Grade Team/ Nittany Energy / Team Pictures`,
            },
            {
              id: "nittany-energy-players",
              title: "Nittany Energy — Players Pictures",
              mediaFolder: `${meetBase}/ 2025-26 Folder/ 3/6th Grade Team/Nittany Energy / Team Pictures`,
            },
            {
              id: "nittany-energy-roster",
              title: "Nittany Energy — Roster",
              mediaFolder: `${meetBase}/ 2025-26 Folder/ 3/6th Grade Team/ Nittany Energy / Roster`,
            },
            {
              id: "nittany-energy-coach",
              title: "Nittany Energy — Coach",
              mediaFolder: `${meetBase}/ 2025-26 Folder/ 3/6th Grade Team/Nittany Energy/ Coach/ Pictures`,
            },
            {
              id: "lee-industries-team",
              title: "Lee Industries — Team Picture",
              mediaFolder: `${meetBase}/ 2025-26 Folder/ 3/6th Grade Team/ Lee Industries/ Team Pictures`,
            },
            {
              id: "lee-industries-players",
              title: "Lee Industries — Players Pictures",
              mediaFolder: `${meetBase}/ 2025-26 Folder/ 3/6th Grade Team/ Lee Industries/ Team Pictures`,
            },
            {
              id: "lee-industries-roster",
              title: "Lee Industries — Roster",
              mediaFolder: `${meetBase}/ 2025-26 Folder/ 3/6th Grade Team/ Lee Industries/ Roster/ Pictures`,
            },
            {
              id: "lee-industries-coach",
              title: "Lee Industries — Coach",
              mediaFolder: `${meetBase}/ 2025-26 Folder/ 3/6th Grade Team/Lee Industries/ Coach/ Pictures`,
            },
            {
              id: "under-pressure-team",
              title: "Under Pressure Pro Cleaners — Team Picture",
              mediaFolder: `${meetBase}/ 2025-26 Folder/ 3/6th Grade Team/ Under Pressure Pro Cleaners / Team Pictures`,
            },
            {
              id: "under-pressure-players",
              title: "Under Pressure Pro Cleaners — Players Pictures",
              mediaFolder: `${meetBase}/ 2025-26 Folder/ 3/6th Grade Team/Under Pressure Pro Cleaners / Team Pictures`,
            },
            {
              id: "under-pressure-roster",
              title: "Under Pressure Pro Cleaners — Roster",
              mediaFolder: `${meetBase}/ 2025-26 Folder/ 3/6th Grade Team/Under Pressure Pro Cleaners / Roster/ Pictures`,
            },
            {
              id: "under-pressure-coach",
              title: "Under Pressure Pro Cleaners — Coach",
              mediaFolder: `${meetBase}/ 2025-26 Folder/ 3/6th Grade Team/Under Pressure Pro Cleaners/ Coach/ Pictures`,
            },
            {
              id: "marble-granite-team",
              title: "Philipsburg Marble and Granted — Team Picture",
              mediaFolder: `${meetBase}/ 2025-26 Folder/ 3/6th Grade Team/ Philipsburg Marble and Granted / Team Pictures`,
            },
            {
              id: "marble-granite-players",
              title: "Philipsburg Marble and Granted — Players Pictures",
              mediaFolder: `${meetBase}/ 2025-26 Folder/ 3/6th Grade Team/Philipsburg Marble and Granted / Players Pictures`,
            },
            {
              id: "marble-granite-roster",
              title: "Philipsburg Marble and Granted — Roster",
              mediaFolder: `${meetBase}/ 2025-26 Folder/ 3/6th Grade Team/Philipsburg Marble and Granted / Roster/ Pictures`,
            },
            {
              id: "marble-granite-coach",
              title: "Philipsburg Marble and Granted — Coach",
              mediaFolder: `${meetBase}/ 2025-26 Folder/ 3/6th Grade Team/Philipsburg Marble and Granted / Coach/ Pictures`,
            },
          ],
        },
      ],
    },
  ] satisfies MeetSeason[],
};

export const recordBookPdf = {
  title: "Record Book",
  subtitle: "All-Time Leaders",
  description:
    "Program record book entries are published only when supplied and approved by the program. Player names and statistics are not fabricated.",
  categories: [
    {
      id: "most-points-game",
      title: "Most Points — Single Game",
      scope: "single-game" as const,
      mediaFolder: null,
    },
    {
      id: "blocked-shots-game",
      title: "Blocked Shots — Single Game",
      scope: "single-game" as const,
      mediaFolder: null,
    },
    {
      id: "three-pointers-game",
      title: "Three-Pointers Made — Single Game",
      scope: "single-game" as const,
      mediaFolder: null,
    },
    {
      id: "steals-season",
      title: "Steals — Single Season",
      scope: "single-season" as const,
      mediaFolder: null,
    },
    {
      id: "ft-pct-season",
      title: "Free Throw % — Single Season",
      scope: "single-season" as const,
      mediaFolder: null,
    },
    {
      id: "three-pct-season",
      title: "Three-Point % — Single Season",
      scope: "single-season" as const,
      mediaFolder: null,
    },
    {
      id: "assists-season",
      title: "Assists — Single Season",
      scope: "single-season" as const,
      mediaFolder: null,
    },
    {
      id: "ppg-season",
      title: "Points Per Game — Single Season",
      scope: "single-season" as const,
      mediaFolder: null,
    },
    {
      id: "three-pointers-season",
      title: "Three-Pointers Made — Single Season",
      scope: "single-season" as const,
      mediaFolder: null,
    },
    {
      id: "career-threes",
      title: "Career Three-Pointers",
      scope: "career" as const,
      mediaFolder: null,
    },
    {
      id: "career-rebounds",
      title: "Career Rebounds",
      scope: "career" as const,
      mediaFolder: null,
    },
    {
      id: "career-assists",
      title: "Career Assists",
      scope: "career" as const,
      mediaFolder: null,
    },
    {
      id: "career-points",
      title: "Career Points",
      scope: "career" as const,
      mediaFolder: null,
    },
  ],
};
