import Link from "next/link";
import { cn } from "@/lib/utils";
import { elementarySeasonOptions, type ElementarySeasonId } from "@/data/elementary-seasons";

export function ElementarySeasonNav({
  season,
  hrefForSeason,
}: {
  season: ElementarySeasonId;
  hrefForSeason: (seasonId: ElementarySeasonId) => string;
}) {
  return (
    <nav className="mb-6 flex flex-wrap gap-2" aria-label="Season">
      {elementarySeasonOptions.map((option) => {
        const active = option.id === season;
        return (
          <Link
            key={option.id}
            href={hrefForSeason(option.id)}
            className={cn(
              "rounded-full px-4 py-2 font-display text-sm font-bold uppercase tracking-wide transition-colors",
              active
                ? "bg-electric-blue text-white"
                : "bg-mountie-blue/10 text-mountie-blue/70 hover:bg-mountie-blue/15 hover:text-deep-navy",
            )}
            aria-current={active ? "page" : undefined}
          >
            {option.label}
          </Link>
        );
      })}
    </nav>
  );
}
