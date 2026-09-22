/** 3-on-3 fall league weekly news articles (also listed on /news). */
export const fall3On3NewsWeeks = [
  {
    week: 1,
    slug: "po-3-on-3-league-week-1-results",
    label: "Week #1",
    date: "September 5, 2025",
  },
  {
    week: 2,
    slug: "po-3-on-3-league-week-2-results",
    label: "Week #2",
    date: "September 12, 2025",
  },
  {
    week: 3,
    slug: "po-3-on-3-league-week-3-results",
    label: "Week #3",
    date: "September 19, 2025",
  },
] as const;

export const fall3On3NewsSlugs: Set<string> = new Set(fall3On3NewsWeeks.map((w) => w.slug));

export function isFall3On3NewsSlug(slug: string): boolean {
  return fall3On3NewsSlugs.has(slug);
}
