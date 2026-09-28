export type EventItem = {
  id: string;
  title: string;
  slug?: string;
  description: string;
  season?: string;
  href?: string;
  gallery?: string[];
  status?: "upcoming" | "annual" | "archived";
};

export const events: EventItem[] = [
  {
    id: "cash-bash",
    title: "P-O Cash Bash",
    slug: "cash-bash",
    description:
      "Annual fundraising event supporting Mounties Youth Basketball programs and league operations.",
    href: "/events/cash-bash",
    status: "annual",
  },
  {
    id: "league-championships",
    title: "League Championships",
    description: "End-of-season league championship games and celebrations.",
    status: "annual",
  },
  {
    id: "scholarship-day",
    title: "Competition/Scholarship Day",
    description:
      "Camp culminating event featuring competition, scholarships, and player recognition.",
    status: "annual",
  },
  {
    id: "banquets",
    title: "End-of-Year Banquets",
    description: "Season celebration events honoring players, coaches, and families.",
    status: "annual",
  },
  {
    id: "youth-camps",
    title: "Youth Basketball Camps",
    description: "Summer camp events with skills, games, and team challenges.",
    href: "/programs/youth-basketball-camp",
    status: "annual",
  },
  {
    id: "juniata-clinics",
    title: "Juniata College Clinics",
    description: "Basketball clinics in partnership with Juniata College.",
    status: "annual",
  },
  {
    id: "usa-basketball-camp",
    title: "USA Basketball Camp",
    description: "USA Basketball-affiliated camp experiences for youth players.",
    status: "annual",
  },
  {
    id: "special-events",
    title: "Special Events",
    description: "Community and program events throughout the season.",
    status: "annual",
  },
  {
    id: "elks-hoop-shoot",
    title: "Philipsburg Elks Hoop Shoot",
    slug: "elks-hoop-shoot",
    description:
      "Free throw competition hosted by the Philipsburg Elks for young athletes.",
    href: "/events/elks-hoop-shoot",
    status: "annual",
  },
];

export const cashBashContent = {
  title: "P-O Cash Bash",
  description:
    "The P-O Cash Bash is a key fundraising event for Mounties Youth Basketball. Funds support league operations, equipment, and program development.",
  requirements:
    "League families may have Cash Bash participation requirements. See the Elementary League page for parent volunteer and fundraising details.",
  galleryNote: "Event photos organized by season — pending client media upload.",
};

export const elksHoopShootContent = {
  title: "Philipsburg Elks Hoop Shoot",
  description:
    "The Philipsburg Elks local Hoop Shoot contest is a free throw competition for boys and girls aged 8 to 13.",
  details:
    "Saturday, January 3, 2026 at Philipsburg-Osceola High School gym. Contest begins at 10:00 AM; gym opens at 9:00 AM. Questions: Daniel Nelson, contest director. Website: https://www.elks.org/hoopshoot",
  galleryNote:
    "Copy Drive folder: The Philipsburg Elks local Hoop Shoot contest Folder → public/images/",
};
