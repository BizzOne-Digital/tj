/**
 * Actual paths inside public/ from the Google Drive download.
 * Folder names include the Drive zip export suffix — do not rename.
 */

const scholarshipBase =
  "Scholarship Day-20260831T131455Z-1-001/Competition-Scholarship Day";
const elementaryTeamsBase =
  "Elementary Team Pictures -20260831T131439Z-1-001/Elementary Team Pictures";
/** Drive folder uses U+2028 (line separator) between PHILIPSBURG and MARBLE — not ? or space */
const marbleGraniteFolder = `${elementaryTeamsBase}/PHILIPSBURG\u2028MARBLE AND GRANITE`;

export const publicMedia = {
  about: "About Tab -20260831T131427Z-1-001/About Tab",
  littleDribblers: "LITTLE DRIBBLERS TAB-20260831T131443Z-1-001/LITTLE DRIBBLERS TAB",
  scholarshipDay: {
    campers: `${scholarshipBase}/PO Campers picture`,
    poster: `${scholarshipBase}/BIG DREAMS START HERE POSTER`,
    scholarship: `${scholarshipBase}/AWARD WINNERS FOLDER/Scholarship Winners`,
    fiveOnFive: `${scholarshipBase}/AWARD WINNERS FOLDER/5-ON-5 Folder`,
    threeOnThree: `${scholarshipBase}/AWARD WINNERS FOLDER/3-ON-3 Folder`,
    campMvp: `${scholarshipBase}/AWARD WINNERS FOLDER/CAMP MVP`,
  },
  elementaryAction:
    "P-O Elementary Leagues Folder-20260831T131419Z-1-001/P-O Elementary Leagues Folder/Action Pictures",
  elementaryActionVideo:
    "P-O Elementary Leagues Folder-20260831T131419Z-1-001/P-O Elementary Leagues Folder/Action Pictures/Video/AQNbhR8m7EkgkyxyYIfpffk29Synm5GDvzHJeCTYxjU7j9suEr9fzxJ5qHL3isF7BvK6-9_TLvbsNQ7MUbTxvrBZcDvAmmxth2bsmWZHZg.mp4",
  elementaryTeams: {
    base: elementaryTeamsBase,
    leeIndustries: `${elementaryTeamsBase}/Lee Industries`,
    nittanyEnergy: `${elementaryTeamsBase}/Nittany Energy`,
    marbleGranite: marbleGraniteFolder,
    underPressure: `${elementaryTeamsBase}/UNDER PRESSURE PRO CLEANERS`,
    lions1st2nd: `${elementaryTeamsBase}/1st-2nd Teams/CENTRAL PA LIONS`,
    glennHawbaker: `${elementaryTeamsBase}/1st-2nd Teams/Glenn O. Hawbaker, Inc`,
    warhawks1st2nd: `${elementaryTeamsBase}/1st-2nd Teams/PA Warhawks`,
    lionsPreK: `${elementaryTeamsBase}/Pre-K-Kindergarten Teams/Central PA Lions`,
    warhawksPreK: `${elementaryTeamsBase}/Pre-K-Kindergarten Teams/PA Warhawks`,
  },
  meetTheMounties: "MEET THE MOUNTIES -20260831T131434Z-1-001/MEET THE MOUNTIES",
  elksHoopShoot:
    "The Philipsburg Elks local Hoop Shoot contest-20260831T131432Z-1-001/The Philipsburg Elks local Hoop Shoot contest",
  leaguePlayerAwards: "League Player Awards -20260831T131453Z-1-001/League Player Awards",
  teamChampionships: "Team League Championships -20260831T131441Z-1-001/Team League Championships",
  leagueAllStars: "League All-stars  -20260831T131500Z-1-001/League All-stars",
  specialEvents: "Special Events -20260831T131458Z-1-001/Special Events",
  elementarySummerLeague:
    "Special Events -20260831T131458Z-1-001/Special Events/Elementary Summer League",
  stateChampionshipGame:
    "State Championship Game Program-20260831T131450Z-1-001/State Championship Game Program",
  elementaryStateChampionship:
    "Elementary State Championship Program -20260831T131447Z-1-001/Elementary State Championship Program",
  goldenTicket:
    "Golden Ticket Winning Teams-20260831T131503Z-1-001/Championships-Golden Ticket Winning Teams",
  goldenTicket2024_25:
    "Golden Ticket Winning Teams-20260831T131503Z-1-001/Championships-Golden Ticket Winning Teams/2024-25 Season",
  goldenTicket2025_26:
    "Golden Ticket Winning Teams-20260831T131503Z-1-001/Championships-Golden Ticket Winning Teams/2025-26 Season",
  selectTeams: "The Select Teams -20260831T131418Z-1-001/The Select Teams",
  /** Drop Week 1 photos into public/images/leagues/3-on-3-week-1/ */
  fall3on3Week1: "images/leagues/3-on-3-week-1",
  fall3on3Week2: "images/leagues/3-on-3-week-2",
  fall3on3Week3: "images/leagues/3-on-3-week-3",
  gearForSale: "images/gear-for-sale",
  centralPaLions: "Central PA Lions AAU",
  /** Hero video from old site — awaiting client */
  heroVideo: null,
  sponsors: "sponsors",
} as const;
