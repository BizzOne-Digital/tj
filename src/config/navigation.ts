export type NavItem = {
  label: string;
  href?: string;
  children?: NavItem[];
};

export const mainNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Little Mounties Families Speak", href: "/little-mounties-families-speak" },
  {
    label: "Programs",
    children: [
      { label: "Training Services", href: "/services" },
      { label: "All Programs", href: "/programs" },
      { label: "Camps & Clinics", href: "/programs/camps-clinics" },
      { label: "P-O Youth Basketball Camp", href: "/programs/youth-basketball-camp" },
      { label: "Little Dribblers", href: "/programs/little-dribblers" },
      { label: "Central PA Lions AAU", href: "/programs/central-pa-lions" },
      { label: "State Championship Program", href: "/state-championship" },
    ],
  },
  {
    label: "Leagues",
    children: [
      { label: "3-on-3 Fall League", href: "/leagues/3-on-3-fall" },
      { label: "P-O Elementary League", href: "/leagues/elementary" },
      { label: "Elementary League Schedule", href: "/leagues/elementary/schedule" },
      { label: "P-O Select Program", href: "/select-program" },
      { label: "Awards & Championships", href: "/awards-records" },
    ],
  },
  {
    label: "Teams",
    children: [
      { label: "Our Team", href: "/team" },
      { label: "Meet the Mounties", href: "/meet-the-mounties" },
      { label: "Staff & Boosters", href: "/team#staff" },
      { label: "Awards & Record Book", href: "/awards-records" },
    ],
  },
  {
    label: "News",
    children: [
      { label: "Latest Updates (Home)", href: "/#news" },
      { label: "All News & Articles", href: "/news" },
      { label: "3-on-3 League News", href: "/leagues/3-on-3-fall/news" },
    ],
  },
  {
    label: "Events",
    children: [
      { label: "All Events", href: "/events" },
      { label: "Special Events", href: "/events/special-events" },
      { label: "P-O Cash Bash", href: "/events/cash-bash" },
      { label: "Elks Hoop Shoot", href: "/events/elks-hoop-shoot" },
    ],
  },
  {
    label: "More",
    children: [
      { label: "Sponsors", href: "/sponsors" },
      { label: "FAQ", href: "/faq" },
      { label: "Pricing", href: "/pricing" },
      { label: "Gear Store (Game One)", href: "/shop" },
      { label: "Gear Store Sale", href: "/mountie-gear-for-sale" },
      { label: "Join", href: "/join" },
      { label: "Donate", href: "/donate" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const ctaNavigation = {
  label: "Register / Book Training",
  href: "/booking",
};
