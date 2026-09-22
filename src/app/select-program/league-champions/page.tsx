import { PageHero, ContentSection } from "@/components/ui/Section";
import { SelectProgramTabNav } from "@/components/layout/ProgramTabNav";
import { PublicFolderGallery } from "@/components/galleries/PublicFolderGallery";
import { selectTournaments } from "@/data/pdf-part2";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Select League Champions",
  path: "/select-program/league-champions",
  description: "P-O Select League championship teams.",
});

export default function SelectLeagueChampionsPage() {
  return (
    <>
      <PageHero eyebrow="Select Program" title="League Champions" />
      <ContentSection>
        <SelectProgramTabNav currentPath="/select-program/league-champions" />
        <div className="space-y-10">
          {selectTournaments.seasons.map((season) => (
            <PublicFolderGallery
              key={season.id}
              folderPath={season.mediaFolder}
              title={`${season.label} — Golden Ticket / Championships`}
            />
          ))}
        </div>
      </ContentSection>
    </>
  );
}
