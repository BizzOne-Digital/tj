import { publicMedia } from "./public-media";

/**
 * Media folder paths — mapped to actual Google Drive download in public/.
 * See public-media.ts for raw paths.
 */

export const mediaFolders = {
  home: {
    video: "public/videos/hero-basketball.mp4",
    note: "Hero video from old site — awaiting client",
  },
  about: {
    path: publicMedia.about,
    tab: "About",
    route: "/about",
  },
  campsClinics: {
    path: `${publicMedia.specialEvents}/Camps-Clinic`,
    tab: "Camps & Clinics",
    route: "/programs/camps-clinics",
  },
  youthCamp: {
    campers: publicMedia.scholarshipDay.campers,
    tab: "P-O Youth Basketball Camp",
    route: "/programs/youth-basketball-camp",
  },
  scholarshipDay: {
    poster: publicMedia.scholarshipDay.poster,
    tab: "Competition/Scholarship Day",
    route: "/programs/youth-basketball-camp/scholarship-day",
  },
  awardWinners: {
    scholarship: publicMedia.scholarshipDay.scholarship,
    fiveOnFive: publicMedia.scholarshipDay.fiveOnFive,
    threeOnThree: publicMedia.scholarshipDay.threeOnThree,
    campMvp: publicMedia.scholarshipDay.campMvp,
    tab: "Award Winners",
    route: "/programs/youth-basketball-camp",
  },
  littleDribblers: {
    path: publicMedia.littleDribblers,
    tab: "Little Dribblers",
    route: "/programs/little-dribblers",
  },
  centralPaLions: {
    path: publicMedia.centralPaLions,
    tab: "Central PA Lions AAU",
    route: "/programs/central-pa-lions",
  },
  elementaryLeague: {
    actionShots: publicMedia.elementaryAction,
    tab: "P-O Elementary League",
    route: "/leagues/elementary",
  },
  elementaryTeams: {
    base: publicMedia.elementaryTeams.base,
    teams: publicMedia.elementaryTeams,
    tab: "Elementary Teams",
    route: "/leagues/elementary/teams",
  },
  stateChampionship: {
    path: publicMedia.elementaryStateChampionship,
    tab: "Elementary State Championship Program",
    route: "/state-championship",
  },
  sponsors: {
    path: "sponsors",
    tab: "P-O Sponsorship Program",
    route: "/sponsors",
  },
  staffTeamsBoosters: {
    path: null,
    tab: "Staff, Teams and Boosters",
    route: "/team",
    note: "Copy from old site",
  },
  elksHoopShoot: {
    base: publicMedia.elksHoopShoot,
    tab: "Elks Hoop Shoot",
    route: "/events/elks-hoop-shoot",
  },
  meetTheMounties: {
    base: publicMedia.meetTheMounties,
    tab: "Meet the Mounties",
    route: "/meet-the-mounties",
  },
  recordBook: {
    path: null,
    tab: "Record Book",
    route: "/awards-records/record-book",
    note: "Statistics pending client verification",
  },
} as const;

export const IMAGE_BASE = "";

export function getMediaPath(folderPath: string): string {
  return `/${folderPath}`;
}
