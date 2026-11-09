import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { listPublishedNewsSlugs } from "@/lib/cms";

const staticRoutes = [
  "/",
  "/about",
  "/little-mounties-families-speak",
  "/services",
  "/programs",
  "/programs/camps-clinics",
  "/programs/youth-basketball-camp",
  "/programs/little-dribblers",
  "/programs/central-pa-lions",
  "/leagues/elementary",
  "/leagues/elementary/results",
  "/leagues/elementary/teams",
  "/programs/youth-basketball-camp/scholarship-day",
  "/programs/youth-basketball-camp/scholarship-winners",
  "/programs/youth-basketball-camp/5-on-5",
  "/programs/youth-basketball-camp/3-on-3",
  "/programs/youth-basketball-camp/camp-mvp",
  "/leagues/elementary/schedule",
  "/awards-records/league-player-awards",
  "/awards-records/team-championships",
  "/awards-records/league-all-stars",
  "/awards-records/record-book",
  "/events/special-events",
  "/events/special-events/banquet",
  "/events/special-events/youth-camp",
  "/events/special-events/camps-clinic",
  "/select-program",
  "/select-program/select-teams",
  "/select-program/game-results",
  "/select-program/league-champions",
  "/select-program/player-awards",
  "/select-program/all-stars",
  "/select-program/2027-28",
  "/select-program/season-recap",
  "/select-program/leagues",
  "/select-program/tournaments",
  "/select-program/team-photos",
  "/state-championship",
  "/pricing",
  "/booking",
  "/team",
  "/meet-the-mounties",
  "/awards-records",
  "/events",
  "/events/cash-bash",
  "/events/elks-hoop-shoot",
  "/sponsors",
  "/faq",
  "/news",
  "/shop",
  "/mountie-gear-for-sale",
  "/join",
  "/donate",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  const staticPages = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "/" ? 1 : 0.8,
  }));

  const newsSlugs = await listPublishedNewsSlugs();
  const newsPages = newsSlugs.map((slug) => ({
    url: `${baseUrl}/news/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...newsPages];
}
