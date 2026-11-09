import { PageHero } from "@/components/ui/PageHero";
import { ContentSection } from "@/components/ui/Section";
import { SelectProgramTabNav } from "@/components/layout/ProgramTabNav";
import { PublicFolderGallery } from "@/components/galleries/PublicFolderGallery";
import { createPageMetadata } from "@/lib/page-metadata";
import { getSiteData } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: "Select League Champions",
  path: "/select-program/league-champions",
  description: "P-O Select League championship teams.",
});

export default async function SelectLeagueChampionsPage() {
  const { selectTournaments } = await getSiteData("pdf-part2");
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
