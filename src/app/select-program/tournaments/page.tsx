import { PageHero, ContentSection } from "@/components/ui/Section";
import { SelectProgramTabNav } from "@/components/layout/ProgramTabNav";
import { PublicFolderGallery } from "@/components/galleries/PublicFolderGallery";
import { selectTournaments } from "@/data/pdf-part2";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Select Tournaments",
  path: "/select-program/tournaments",
  description: "P-O Select Program tournament results and golden ticket teams.",
});

export default function SelectTournamentsPage() {
  return (
    <>
      <PageHero eyebrow="Select Program" title="Tournaments" />
      <ContentSection>
        <SelectProgramTabNav currentPath="/select-program/tournaments" />
        {selectTournaments.seasons.map((season) => (
          <div key={season.id} className="mb-12">
            <h2 className="mb-4 font-display text-xl font-bold uppercase text-deep-navy">{season.label}</h2>
            {"events" in season && season.events && (
              <ul className="mb-6 space-y-1 text-mountie-blue/80">
                {season.events.map((e) => <li key={e}>{e}</li>)}
              </ul>
            )}
            <PublicFolderGallery folderPath={season.mediaFolder} title="Golden Ticket / Championship Photos" />
          </div>
        ))}
      </ContentSection>
    </>
  );
}
