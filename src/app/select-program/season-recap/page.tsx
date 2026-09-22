import { PageHero, ContentSection } from "@/components/ui/Section";
import { SelectProgramTabNav } from "@/components/layout/ProgramTabNav";
import { selectSeasonRecap2025_26 } from "@/data/pdf-part2";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Select Season Recap",
  path: "/select-program/season-recap",
  description: "P-O Select Program season recaps and program records.",
});

export default function SelectSeasonRecapPage() {
  const recap = selectSeasonRecap2025_26;

  return (
    <>
      <PageHero eyebrow="Select Program" title="Season Recap" />
      <ContentSection>
        <SelectProgramTabNav currentPath="/select-program/season-recap" />
        <div className="mb-12 rounded-lg bg-deep-navy p-8 text-white">
          <h2 className="font-display text-2xl font-bold uppercase">{recap.season} Season Recap</h2>
          <p className="mt-2 text-cool-grey">Offensive Focus: {recap.offensiveFocus}</p>
          <p className="mt-6 font-display text-6xl font-bold text-electric-blue">{recap.programRecord}</p>
          <p className="mt-2 text-sm text-cool-grey">Program record for the {recap.season} Select Program</p>
        </div>

        <div className="mb-10">
          <h3 className="font-display text-xl font-bold uppercase text-deep-navy">State Championship Golden Tickets</h3>
          <ul className="mt-4 flex flex-wrap gap-3">
            {recap.goldenTickets.map((t) => (
              <li key={t} className="rounded bg-electric-blue/10 px-4 py-2 font-semibold text-deep-navy">{t}</li>
            ))}
          </ul>
        </div>

        {recap.leagues.map((league) => (
          <div key={league.name} className="mb-8 rounded-lg bg-white p-6 shadow-sm">
            <h3 className="font-display font-bold uppercase text-deep-navy">{league.name}</h3>
            <ul className="mt-3 space-y-1 text-mountie-blue/80">
              {league.results.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </div>
        ))}

        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
          <h3 className="font-display font-bold uppercase text-deep-navy">Tournaments</h3>
          <ul className="mt-3 space-y-1 text-mountie-blue/80">
            {recap.tournaments.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>

        <p className="font-display text-lg font-bold uppercase text-electric-blue">{recap.growth}</p>

        <div className="mt-12 rounded-lg border-2 border-dashed border-mountie-blue/20 p-6">
          <h3 className="font-display text-xl font-bold uppercase text-deep-navy">2026–27 Season Recap</h3>
          <p className="mt-2 text-mountie-blue/70">Information coming soon.</p>
        </div>
      </ContentSection>
    </>
  );
}
