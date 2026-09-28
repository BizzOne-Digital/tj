export type Program = {
  id: string;
  title: string;
  description: string;
  href: string;
  grades?: string;
  image?: string;
  featured?: boolean;
};

export const programs: Program[] = [
  {
    id: "elementary",
    title: "P-O Elementary League",
    description:
      "Community-based elementary basketball for Pre-K through 6th grade with development-focused instruction and league play.",
    href: "/leagues/elementary",
    grades: "Pre-K – 6th Grade",
    featured: true,
  },
  {
    id: "camps",
    title: "Camps & Clinics",
    description:
      "Structured training programs and focused skill sessions designed to improve fundamentals, strategy, and teamwork.",
    href: "/programs/camps-clinics",
    featured: true,
  },
  {
    id: "little-dribblers",
    title: "Little Dribblers",
    description:
      "Five Saturday development sessions for grades K–2 focused on fundamentals in a fun, introductory environment.",
    href: "/programs/little-dribblers",
    grades: "K – 2nd Grade",
    featured: true,
  },
  {
    id: "select",
    title: "P-O Select Program",
    description:
      "Competitive select teams with league play, tournaments, and advanced development for dedicated players.",
    href: "/select-program",
    featured: true,
  },
  {
    id: "lions",
    title: "Central PA Lions AAU",
    description:
      "AAU travel basketball academy serving boys and girls grades K–12 with tournament competition across the region.",
    href: "/programs/central-pa-lions",
    grades: "K – 12th Grade",
    featured: true,
  },
  {
    id: "training",
    title: "One-on-One & Small-Group Training",
    description:
      "Personalized skill development with Coach Anderson — 60 minutes, twice weekly at the MS Gym.",
    href: "/services",
    featured: true,
  },
];

export const trainingService = {
  title: "One-on-One / Small-Group Training",
  duration: "60 minutes",
  price: "$65 per player",
  frequency: "Twice a week",
  location: "MS Gym",
  description:
    "Focused skill development sessions tailored to each athlete's goals. Sessions emphasize fundamentals, game IQ, and confidence on the court.",
  cta: { label: "Request Training", href: "/booking" },
};

export const campsClinicsContent = {
  overview:
    "Camps are structured training programs designed to improve skills, strategy, and teamwork. Little Mounties normally hosts a one-week summer camp. Clinics are shorter focused sessions for specific basketball skills and techniques.",
  campNote:
    "Camp dates and registration are updated seasonally. Past camp information is archived by season. Contact the program for the latest summer camp schedule.",
  clinicNote:
    "Clinics cover targeted skills including shooting, ball handling, defense, and game situations. Check back for upcoming clinic announcements.",
};

export const youthCampContent = {
  overview:
    "The P-O Youth Basketball Camp is a week-long summer experience featuring skills and drills, games and tournaments, awards, team challenges, themed days, and Competition/Scholarship Day.",
  features: [
    "Skills and drills",
    "Games and tournaments",
    "Awards and team challenges",
    "Themed days",
    "Competition/Scholarship Day",
    "5-on-5, 3-on-3, and MVP recognitions",
  ],
  currentSeason: {
    year: null as string | null,
    status: "Dates and registration to be announced. Past camp seasons are archived below.",
    registrationOpen: false,
  },
  archives: [
    {
      season: "2025",
      note: "June 2025 camp season — archive content and galleries pending client media upload.",
    },
  ],
};

export const littleDribblersContent = {
  grades: "K – 2nd Grade",
  sessions: "Five Saturday development sessions",
  focus: "Fundamentals-based instruction in a fun, introductory setting",
  cost: "Free participation where applicable",
  location: "Philipsburg-Osceola Middle School Gym",
  season2026: {
    status: "2026 season information pending client verification.",
    registrationNote:
      "Registration details will be posted when confirmed. Contact mountiesyouthbasketball@gmail.com with questions.",
  },
  season2027: {
    status: "2027 information coming soon.",
  },
  disclaimer:
    "Program dates, locations, and registration links are updated seasonally. Always confirm current details before registering.",
};

export const centralPaLionsContent = {
  about:
    "Central PA Lions is the AAU travel basketball academy affiliated with Mounties Youth Basketball, serving dedicated players across Central Pennsylvania.",
  history:
    "The Academy began in 2011 with a mission to develop skilled, competitive basketball players through high-level training and tournament experience.",
  mission:
    "Develop character, discipline, and basketball excellence in a team-first culture.",
  vision:
    "Build Central Pennsylvania's premier youth basketball development pathway from introductory play through elite AAU competition.",
  culture:
    "Hard work, accountability, and support for teammates on and off the court.",
  programs: "Boys and girls programs, grades K–12",
  tryouts: "Tryout details announced seasonally — visit the Central PA Lions website for current information.",
  practice: "Regular practice attendance and preparation are expected of all travel-team athletes.",
  tournaments: "Teams compete in regional and national AAU tournaments throughout the season.",
  externalUrl: "https://www.centralpalions.com/about",
};
