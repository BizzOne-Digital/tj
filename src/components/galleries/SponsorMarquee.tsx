"use client";

import { resolveImageUrl } from "@/lib/uploads-shared";

type MarqueeSponsor = {
  id: string;
  name: string;
  logo: string;
};

type SponsorMarqueeProps = {
  sponsors: MarqueeSponsor[];
};

export function SponsorMarquee({ sponsors }: SponsorMarqueeProps) {
  if (sponsors.length === 0) return null;

  const items = sponsors.map((sponsor) => ({
    ...sponsor,
    logo: resolveImageUrl(sponsor.logo),
  }));

  return (
    <div className="relative overflow-hidden py-4" aria-label="Sponsor logos">
      <div className="marquee-track flex items-center gap-12">
        {[...items, ...items].map((sponsor, i) => (
          <div
            key={`${sponsor.id}-${i}`}
            className="flex shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white px-6 py-4"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className="block h-auto max-h-28 w-auto max-w-[200px] object-contain"
              style={{ height: "auto", maxHeight: "7rem" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
