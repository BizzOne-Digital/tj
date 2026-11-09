/**
 * Registry of every editable content module on the public site.
 *
 * Each module is a file in src/data (or src/config) whose exported constants hold the
 * text, schedules, prices, results and image paths shown on public pages. The admin
 * portal edits these per export and stores the edited value in MongoDB; public pages read
 * the merged result through getSiteData() (see src/lib/site-data.ts).
 *
 * Lists that already have their own editor (news, programs, staff, sponsors, FAQs,
 * announcements, gear) are excluded from the generic editor via `skipExports`.
 */
import * as siteSettings from "@/config/site";
import * as links from "@/config/links";
import * as homeContent from "@/data/home-content";
import * as schedules from "@/data/schedules";
import * as elementarySchedule from "@/data/elementary-schedule";
import * as elementarySeasons from "@/data/elementary-seasons";
import * as elementaryTeams from "@/data/elementary-teams";
import * as teams from "@/data/teams";
import * as awards from "@/data/awards";
import * as events from "@/data/events";
import * as leagues from "@/data/leagues";
import * as fall3On3League from "@/data/fall-3-on-3-league";
import * as testimonials from "@/data/little-mounties-testimonials";
import * as pricing from "@/data/pricing";
import * as sponsorship from "@/data/sponsorship";
import * as pdfPart1 from "@/data/pdf-part1";
import * as pdfPart2 from "@/data/pdf-part2";
import * as pdfPart3 from "@/data/pdf-part3";
import * as programs from "@/data/programs";
import * as sponsors from "@/data/sponsors";
import * as staff from "@/data/staff";

export const SITE_DATA_MODULES = {
  "site-settings": siteSettings,
  links,
  "home-content": homeContent,
  schedules,
  "elementary-schedule": elementarySchedule,
  "elementary-seasons": elementarySeasons,
  "elementary-teams": elementaryTeams,
  teams,
  awards,
  events,
  leagues,
  "fall-3-on-3-league": fall3On3League,
  testimonials,
  pricing,
  sponsorship,
  "pdf-part1": pdfPart1,
  "pdf-part2": pdfPart2,
  "pdf-part3": pdfPart3,
  programs,
  sponsors,
  staff,
} as const;

export type SiteDataKey = keyof typeof SITE_DATA_MODULES;
export type SiteDataModules = typeof SITE_DATA_MODULES;

export type SiteDataModuleMeta = {
  key: SiteDataKey;
  label: string;
  group: string;
  description: string;
  /** Public pages that use this content (shown in the admin so editors know what changes). */
  pages: string[];
  /** Exports handled by another admin screen or not meant to be edited as JSON. */
  skipExports?: string[];
};

export const SITE_DATA_META: SiteDataModuleMeta[] = [
  {
    key: "site-settings",
    label: "Site Settings",
    group: "Global",
    description: "Site name, motto, quote, contact details, address, social links.",
    pages: ["Every page (header, footer, contact blocks)", "/", "/about", "/contact"],
  },
  {
    key: "links",
    label: "External Links",
    group: "Global",
    description: "Gear store, registration, maps and partner links.",
    pages: ["/", "/programs", "/mountie-gear-for-sale"],
  },
  {
    key: "home-content",
    label: "Home Page Headings and Text",
    group: "Page Content",
    description: "Hero title, section headings and call-to-action text on the home page.",
    pages: ["/"],
  },
  {
    key: "schedules",
    label: "Home Page Schedule Board",
    group: "Schedules",
    description: "Upcoming games table shown on the home page.",
    pages: ["/"],
  },
  {
    key: "elementary-schedule",
    label: "Elementary League Schedules and Results",
    group: "Schedules",
    description: "Weekly schedules by season and division, and game results.",
    pages: ["/leagues/elementary/schedule", "/leagues/elementary/results"],
  },
  {
    key: "elementary-seasons",
    label: "Elementary Season List",
    group: "Schedules",
    description: "Seasons shown in the season switcher.",
    pages: ["/leagues/elementary/schedule", "/leagues/elementary/teams"],
  },
  {
    key: "elementary-teams",
    label: "Elementary Teams and Coaches",
    group: "Teams and Coaches",
    description: "Team rosters, coaches and team photos for the elementary league.",
    pages: ["/leagues/elementary/teams"],
  },
  {
    key: "teams",
    label: "Select Program Teams and Season Archive",
    group: "Teams and Coaches",
    description: "Season archive, team groups, coaches and the select program record.",
    pages: ["/", "/select-program", "/meet-the-mounties"],
  },
  {
    key: "staff",
    label: "Staff Quote",
    group: "Teams and Coaches",
    description: "Quote on the team page. Staff profiles are under Staff in the sidebar.",
    pages: ["/team"],
    skipExports: ["staffMembers"],
  },
  {
    key: "awards",
    label: "Awards and Record Book",
    group: "Awards and Results",
    description: "Award categories and record book summary.",
    pages: ["/awards-records", "/awards-records/record-book"],
  },
  {
    key: "events",
    label: "Events, Cash Bash and Hoop Shoot",
    group: "Events",
    description: "Event list and detailed content for Cash Bash and Elks Hoop Shoot.",
    pages: ["/events", "/events/cash-bash"],
  },
  {
    key: "leagues",
    label: "League and State Championship Content",
    group: "Leagues",
    description: "Elementary league sections, select program sections, state championship.",
    pages: ["/leagues/elementary", "/select-program", "/state-championship"],
  },
  {
    key: "fall-3-on-3-league",
    label: "3-on-3 Fall League",
    group: "Leagues",
    description: "Dates, location, divisions, pricing and schedule for the 3-on-3 fall league.",
    pages: ["/", "/leagues/3-on-3-fall"],
  },
  {
    key: "testimonials",
    label: "Family Testimonials",
    group: "Community",
    description: "Quotes from Little Mounties families.",
    pages: ["/little-mounties-families-speak", "/testimonials"],
  },
  {
    key: "pricing",
    label: "Pricing",
    group: "Programs",
    description: "Training, select league and elementary program fees.",
    pages: ["/pricing", "/select-program"],
  },
  {
    key: "sponsorship",
    label: "Team Sponsorship Letter and Tiers",
    group: "Community",
    description: "Sponsorship letter text, tiers and amounts.",
    pages: ["/sponsors"],
  },
  {
    key: "sponsors",
    label: "Sponsors Note",
    group: "Community",
    description: "Note on the sponsors page. Sponsor logos are under Sponsors in the sidebar.",
    pages: ["/sponsors"],
    skipExports: ["sponsors"],
  },
  {
    key: "programs",
    label: "Program Detail Content",
    group: "Programs",
    description: "Training service, camps, little dribblers and Central PA Lions content.",
    pages: ["/services", "/booking", "/programs/*"],
    skipExports: ["programs"],
  },
  {
    key: "pdf-part1",
    label: "Page Content: About, Camps, Little Dribblers, Lions, State Championship",
    group: "Page Content",
    description: "Long-form text for the About page, youth camp pages, Little Dribblers and more.",
    pages: [
      "/about",
      "/programs/youth-basketball-camp/*",
      "/programs/camps-clinics",
      "/programs/little-dribblers",
      "/programs/central-pa-lions",
      "/leagues/elementary",
      "/state-championship",
    ],
  },
  {
    key: "pdf-part2",
    label: "Page Content: Select Program, Awards, Special Events",
    group: "Page Content",
    description: "Select program text, team photos, champions, all-stars, special events.",
    pages: ["/select-program/*", "/awards-records/*", "/events/special-events/*"],
  },
  {
    key: "pdf-part3",
    label: "Page Content: Hoop Shoot, Meet the Mounties, Record Book",
    group: "Page Content",
    description: "Elks Hoop Shoot, Meet the Mounties archive and record book data.",
    pages: ["/events/elks-hoop-shoot", "/meet-the-mounties", "/awards-records/record-book"],
  },
];

export function isSiteDataKey(value: string): value is SiteDataKey {
  return Object.prototype.hasOwnProperty.call(SITE_DATA_MODULES, value);
}
