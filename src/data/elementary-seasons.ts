export type ElementarySeasonId = "2025-26" | "2026-27";

export const elementarySeasonOptions: { id: ElementarySeasonId; label: string }[] = [
  { id: "2025-26", label: "2025–26 Season" },
  { id: "2026-27", label: "2026–27 Season" },
];

export function parseElementarySeasonId(
  value: string | undefined | null,
  defaultSeason: ElementarySeasonId = "2025-26",
): ElementarySeasonId {
  if (value === "2026-27") return "2026-27";
  if (value === "2025-26") return "2025-26";
  return defaultSeason;
}
