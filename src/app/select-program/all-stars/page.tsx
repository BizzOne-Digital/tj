import { PageHero, ContentSection } from "@/components/ui/Section";
import { SelectProgramTabNav } from "@/components/layout/ProgramTabNav";
import { MediaComingSoon } from "@/components/ui/Section";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Select All-Star Teams",
  path: "/select-program/all-stars",
  description: "P-O Select League all-star teams — East, West, and MVP.",
});

export default function SelectAllStarsPage() {
  return (
    <>
      <PageHero eyebrow="Select Program" title="League All-Star Teams" subtitle="2026–27 Season" />
      <ContentSection>
        <SelectProgramTabNav currentPath="/select-program/all-stars" />
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="font-display font-bold uppercase text-deep-navy">East Team</h2>
            <MediaComingSoon className="mt-4 min-h-[160px]" />
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="font-display font-bold uppercase text-deep-navy">West Team</h2>
            <MediaComingSoon className="mt-4 min-h-[160px]" />
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="font-display font-bold uppercase text-deep-navy">All-Star MVP</h2>
            <MediaComingSoon className="mt-4 min-h-[160px]" />
          </div>
        </div>
      </ContentSection>
    </>
  );
}
