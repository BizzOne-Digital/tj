import { PageHero, ContentSection } from "@/components/ui/Section";
import { SelectProgramTabNav } from "@/components/layout/ProgramTabNav";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "2027–28 Select Season",
  path: "/select-program/2027-28",
  description: "P-O Select Program 2027–28 season placeholders.",
});

export default function Select2027_28Page() {
  return (
    <>
      <PageHero eyebrow="Select Program" title="2027–28 Season" />
      <ContentSection>
        <SelectProgramTabNav currentPath="/select-program/2027-28" />
        <div className="grid gap-6 md:grid-cols-3">
          {["East Team", "West Team", "All-Star MVP"].map((title) => (
            <div key={title} className="rounded-lg border-2 border-dashed border-mountie-blue/20 p-6 text-center">
              <h2 className="font-display font-bold uppercase text-deep-navy">{title}</h2>
              <p className="mt-2 text-sm text-mountie-blue/60">Information coming soon.</p>
            </div>
          ))}
        </div>
      </ContentSection>
    </>
  );
}
